import status from "http-status";

import AppError from "../../errorHelper/AppError";
import { IRequestUser } from "../auth/auth.interface";
import {
  IAddSalePaymentPayload,
  ICancelSalePayload,
  ICreateSalePayload,
} from "./sale.interface";
import { prisma } from "../../lib/prisma";
import {
  InventoryTransactionType,
  Prisma,
  SalePaymentStatus,
  SaleStatus,
} from "../../../generated/prisma/client";
import {
  saleFilterableFields,
  saleSearchableFields,
  saleSortableFields,
} from "./sale.constant";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { IQueryParams } from "../../interfaces/query.interface";

const generateInvoiceNo = async (organizationId: string) => {
  const count = await prisma.sale.count({
    where: {
      organizationId,
    },
  });

  const nextNumber = count + 1;
  return `INV-${nextNumber.toString().padStart(6, "0")}`;
};

const validateSaleReferences = async (
  organizationId: string,
  shopId: string,
  storageId: string,
) => {
  const [shop, storage] = await Promise.all([
    prisma.shop.findFirst({
      where: {
        id: shopId,
        organizationId,
        isDeleted: false,
      },
    }),
    prisma.storage.findFirst({
      where: {
        id: storageId,
        organizationId,
        isDeleted: false,
      },
    }),
  ]);

  if (!shop) {
    throw new AppError(status.NOT_FOUND, "Shop not found");
  }

  if (!storage) {
    throw new AppError(status.NOT_FOUND, "Storage not found");
  }

  if (storage.shopId !== shopId) {
    throw new AppError(
      status.BAD_REQUEST,
      "Selected storage does not belong to the selected shop",
    );
  }

  return { shop, storage };
};

const createSale = async (user: IRequestUser, payload: ICreateSalePayload) => {
  const {
    shopId,
    storageId,
    paymentMethod,
    discount = 0,
    note,
    paidAmount = 0,
    items,
  } = payload;

  if (!user.organizationId) {
    throw new AppError(status.BAD_REQUEST, "Organization context is missing");
  }

  await validateSaleReferences(user.organizationId, shopId, storageId);

  const invoiceNo = await generateInvoiceNo(user.organizationId);

  const productIds = items.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
      organizationId: user.organizationId,
      isDeleted: false,
    },
  });

  if (products.length !== productIds.length) {
    throw new AppError(
      status.NOT_FOUND,
      "One or more selected products were not found",
    );
  }

  const productMap = new Map(products.map((product) => [product.id, product]));

  const inventoryRows = await prisma.inventory.findMany({
    where: {
      organizationId: user.organizationId,
      shopId,
      storageId,
      productId: {
        in: productIds,
      },
    },
  });

  const inventoryMap = new Map(
    inventoryRows.map((inventory) => [inventory.productId, inventory]),
  );

  let subtotal = 0;

  const preparedItems = items.map((item) => {
    const product = productMap.get(item.productId);
    const inventory = inventoryMap.get(item.productId);

    if (!product) {
      throw new AppError(status.NOT_FOUND, "Product not found");
    }

    if (!inventory) {
      throw new AppError(
        status.BAD_REQUEST,
        `No inventory found for product: ${product.name}`,
      );
    }

    if (inventory.quantity < item.quantity) {
      throw new AppError(
        status.BAD_REQUEST,
        `Insufficient stock for product: ${product.name}`,
      );
    }

    const unitPrice = Number(product.price);
    const totalPrice = unitPrice * item.quantity;
    subtotal += totalPrice;

    return {
      productId: item.productId,
      quantity: item.quantity,
      unitPrice,
      totalPrice,
    };
  });

  const total = subtotal - discount;

  if (total < 0) {
    throw new AppError(status.BAD_REQUEST, "Discount cannot exceed subtotal");
  }

  if (paidAmount < 0) {
    throw new AppError(status.BAD_REQUEST, "Paid amount cannot be negative");
  }

  if (paidAmount > total) {
    throw new AppError(
      status.BAD_REQUEST,
      "Paid amount cannot exceed total amount",
    );
  }

  const dueAmount = total - paidAmount;

  let paymentStatus: SalePaymentStatus = SalePaymentStatus.PAID;

  if (paidAmount === 0) {
    paymentStatus = SalePaymentStatus.UNPAID;
  } else if (dueAmount > 0) {
    paymentStatus = SalePaymentStatus.PARTIAL;
  }

  const sale = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const createdSale = await tx.sale.create({
        data: {
          organizationId: user.organizationId!,
          shopId,
          createdById: user.userId,
          invoiceNo,
          subtotal: new Prisma.Decimal(subtotal),
          discount: new Prisma.Decimal(discount),
          total: new Prisma.Decimal(total),
          paymentMethod,
          paymentStatus,
          paidAmount: new Prisma.Decimal(paidAmount),
          dueAmount: new Prisma.Decimal(dueAmount),
          note,
        },
      });

      for (const item of preparedItems) {
        await tx.saleItem.create({
          data: {
            saleId: createdSale.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: new Prisma.Decimal(item.unitPrice),
            totalPrice: new Prisma.Decimal(item.totalPrice),
          },
        });

        const inventory = inventoryMap.get(item.productId);

        if (!inventory) {
          throw new AppError(status.BAD_REQUEST, "Inventory not found");
        }

        await tx.inventory.update({
          where: {
            id: inventory.id,
          },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });

        await tx.inventoryTransaction.create({
          data: {
            organizationId: user.organizationId!,
            shopId,
            storageId,
            productId: item.productId,
            createdById: user.userId,
            type: InventoryTransactionType.SALE,
            quantity: item.quantity,
            note: `Sale invoice: ${invoiceNo}`,
            saleId: createdSale.id,
          },
        });
      }

      if (paidAmount > 0) {
        await tx.salePayment.create({
          data: {
            saleId: createdSale.id,
            receivedById: user.userId,
            amount: new Prisma.Decimal(paidAmount),
            paymentMethod,
            note: "Initial payment collected during sale creation",
          },
        });
      }

      return createdSale;
    },
  );

  const saleWithDetails = await prisma.sale.findUnique({
    where: {
      id: sale.id,
    },
    include: {
      shop: true,
      createdBy: true,
      items: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
      payments: {
        include: {
          receivedBy: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return saleWithDetails;
};

const addSalePayment = async (
  user: IRequestUser,
  saleId: string,
  payload: IAddSalePaymentPayload,
) => {
  const { amount, paymentMethod, note } = payload;

  if (!user.organizationId) {
    throw new AppError(status.BAD_REQUEST, "Organization context is missing");
  }

  const sale = await prisma.sale.findFirst({
    where: {
      id: saleId,
      organizationId: user.organizationId,
    },
  });

  if (!sale) {
    throw new AppError(status.NOT_FOUND, "Sale not found");
  }

  const currentDue = Number(sale.dueAmount);

  if (currentDue <= 0) {
    throw new AppError(status.BAD_REQUEST, "This sale has no due amount");
  }

  if (amount > currentDue) {
    throw new AppError(
      status.BAD_REQUEST,
      "Payment amount cannot exceed due amount",
    );
  }

  if (sale.status === SaleStatus.CANCELLED) {
    throw new AppError(
      status.BAD_REQUEST,
      "Cannot collect payment for a cancelled sale",
    );
  }

  const updatedPaidAmount = Number(sale.paidAmount) + amount;
  const updatedDueAmount = Number(sale.total) - updatedPaidAmount;

  const updatedPaymentStatus =
    updatedDueAmount <= 0
      ? SalePaymentStatus.PAID
      : updatedPaidAmount > 0
        ? SalePaymentStatus.PARTIAL
        : SalePaymentStatus.UNPAID;

  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      await tx.salePayment.create({
        data: {
          saleId: sale.id,
          receivedById: user.userId,
          amount: new Prisma.Decimal(amount),
          paymentMethod,
          note,
        },
      });

      const updatedSale = await tx.sale.update({
        where: {
          id: sale.id,
        },
        data: {
          paidAmount: new Prisma.Decimal(updatedPaidAmount),
          dueAmount: new Prisma.Decimal(updatedDueAmount),
          paymentStatus: updatedPaymentStatus,
        },
        include: {
          shop: true,
          createdBy: true,
          items: {
            include: {
              product: true,
            },
          },
          payments: {
            include: {
              receivedBy: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });

      return updatedSale;
    },
  );

  return result;
};

const getSalePayments = async (user: IRequestUser, saleId: string) => {
  if (!user.organizationId) {
    throw new AppError(status.BAD_REQUEST, "Organization context is missing");
  }

  const sale = await prisma.sale.findFirst({
    where: {
      id: saleId,
      organizationId: user.organizationId,
    },
    select: {
      id: true,
      invoiceNo: true,
      total: true,
      paidAmount: true,
      dueAmount: true,
      paymentStatus: true,
    },
  });

  if (!sale) {
    throw new AppError(status.NOT_FOUND, "Sale not found");
  }

  const payments = await prisma.salePayment.findMany({
    where: {
      saleId,
    },
    include: {
      receivedBy: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    sale,
    payments,
  };
};

const getAllSales = async (user: IRequestUser, query: IQueryParams) => {
  if (!user.organizationId) {
    throw new AppError(status.BAD_REQUEST, "Organization context is missing");
  }

  const queryBuilder = new QueryBuilder(prisma.sale, query, {
    searchableFields: saleSearchableFields,
    filterableFields: saleFilterableFields,
    sortableFields: saleSortableFields,
    defaultSortBy: "createdAt",
    defaultSortOrder: "desc",
    defaultLimit: 10,
    maxLimit: 100,
  });

  const result = await queryBuilder
    .search()
    .filter()
    .sort()
    .paginate()
    .include({
      shop: true,
      createdBy: true,
      items: {
        include: {
          product: true,
        },
      },
      payments: true,
    })
    .where({
      organizationId: user.organizationId,
    })
    .execute();

  return result;
};

const getSingleSale = async (user: IRequestUser, saleId: string) => {
  if (!user.organizationId) {
    throw new AppError(status.BAD_REQUEST, "Organization context is missing");
  }

  const sale = await prisma.sale.findFirst({
    where: {
      id: saleId,
      organizationId: user.organizationId,
    },
    include: {
      shop: true,
      createdBy: true,
      items: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
      payments: {
        include: {
          receivedBy: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!sale) {
    throw new AppError(status.NOT_FOUND, "Sale not found");
  }

  return sale;
};

const cancelSale = async (
  user: IRequestUser,
  saleId: string,
  payload: ICancelSalePayload,
) => {
  const { note } = payload;

  if (!user.organizationId) {
    throw new AppError(status.BAD_REQUEST, "Organization context is missing");
  }

  const sale = await prisma.sale.findFirst({
    where: {
      id: saleId,
      organizationId: user.organizationId,
    },
    include: {
      items: true,
      returns: {
        include: {
          items: true,
        },
      },
    },
  });

  if (!sale) {
    throw new AppError(status.NOT_FOUND, "Sale not found");
  }

  if (sale.status === SaleStatus.CANCELLED) {
    throw new AppError(status.BAD_REQUEST, "Sale is already cancelled");
  }

  if (sale.returns.length > 0) {
    throw new AppError(
      status.BAD_REQUEST,
      "Cannot cancel a sale that already has return records",
    );
  }

  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      for (const item of sale.items) {
        const inventory = await tx.inventory.findFirst({
          where: {
            organizationId: user.organizationId!,
            shopId: sale.shopId,
            productId: item.productId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        if (inventory) {
          await tx.inventory.update({
            where: {
              id: inventory.id,
            },
            data: {
              quantity: {
                increment: item.quantity,
              },
            },
          });

          await tx.inventoryTransaction.create({
            data: {
              organizationId: user.organizationId!,
              shopId: sale.shopId,
              storageId: inventory.storageId,
              productId: item.productId,
              createdById: user.userId,
              type: InventoryTransactionType.STOCK_IN,
              quantity: item.quantity,
              note: `Sale cancelled: ${sale.invoiceNo}`,
              saleId: sale.id,
            },
          });
        } else {
          throw new AppError(
            status.BAD_REQUEST,
            "Related inventory not found for sale item restoration",
          );
        }
      }

      const updatedSale = await tx.sale.update({
        where: {
          id: sale.id,
        },
        data: {
          status: SaleStatus.CANCELLED,
          paymentStatus: SalePaymentStatus.UNPAID,
          paidAmount: new Prisma.Decimal(0),
          dueAmount: new Prisma.Decimal(0),
          note: note
            ? `${sale.note ? `${sale.note}\n\n` : ""}Cancellation note: ${note}`
            : sale.note,
        },
        include: {
          shop: true,
          createdBy: true,
          items: {
            include: {
              product: true,
            },
          },
          payments: {
            include: {
              receivedBy: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
          returns: {
            include: {
              returnedBy: true,
              items: {
                include: {
                  product: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });

      return updatedSale;
    },
  );

  return result;
};

export const saleService = {
  createSale,
  addSalePayment,
  getSalePayments,
  getAllSales,
  getSingleSale,
  cancelSale,
};
