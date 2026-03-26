import status from "http-status";

import AppError from "../../errorHelper/AppError";
import { IRequestUser } from "../auth/auth.interface";
import { ICreateSalePayload } from "./sale.interface";
import { prisma } from "../../lib/prisma";
import {
  InventoryTransactionType,
  Prisma,
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
    items,
  } = payload;

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

  const sale = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const createdSale = await tx.sale.create({
        data: {
          organizationId: user.organizationId,
          shopId,
          createdById: user.userId,
          invoiceNo,
          subtotal: new Prisma.Decimal(subtotal),
          discount: new Prisma.Decimal(discount),
          total: new Prisma.Decimal(total),
          paymentMethod,
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
            organizationId: user.organizationId,
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
    },
  });

  return saleWithDetails;
};

const getAllSales = async (user: IRequestUser, query: IQueryParams) => {
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
    })
    .where({
      organizationId: user.organizationId,
    })
    .execute();

  return result;
};

const getSingleSale = async (user: IRequestUser, saleId: string) => {
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
    },
  });

  if (!sale) {
    throw new AppError(status.NOT_FOUND, "Sale not found");
  }

  return sale;
};

export const saleService = {
  createSale,
  getAllSales,
  getSingleSale,
};
