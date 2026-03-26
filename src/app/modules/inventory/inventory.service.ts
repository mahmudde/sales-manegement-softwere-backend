import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { IRequestUser } from "../auth/auth.interface";
import { IStockInPayload, IStockOutPayload } from "./inventory.interface";
import { prisma } from "../../lib/prisma";
import {
  InventoryTransactionType,
  Prisma,
} from "../../../generated/prisma/client";
import {
  inventoryFilterableFields,
  inventorySearchableFields,
  inventorySortableFields,
  inventoryTransactionFilterableFields,
  inventoryTransactionSearchableFields,
  inventoryTransactionSortableFields,
} from "./inventory.constant";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { IQueryParams } from "../../interfaces/query.interface";

const validateInventoryReferences = async (
  organizationId: string,
  shopId: string,
  storageId: string,
  productId: string,
) => {
  const [shop, storage, product] = await Promise.all([
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
    prisma.product.findFirst({
      where: {
        id: productId,
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

  if (!product) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  if (storage.shopId !== shopId) {
    throw new AppError(
      status.BAD_REQUEST,
      "Selected storage does not belong to the selected shop",
    );
  }

  return { shop, storage, product };
};

const stockIn = async (user: IRequestUser, payload: IStockInPayload) => {
  const { shopId, storageId, productId, quantity, lowStockThreshold, note } =
    payload;

  await validateInventoryReferences(
    user.organizationId,
    shopId,
    storageId,
    productId,
  );

  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const existingInventory = await tx.inventory.findFirst({
        where: {
          organizationId: user.organizationId,
          shopId,
          storageId,
          productId,
        },
      });

      let inventory;

      if (existingInventory) {
        inventory = await tx.inventory.update({
          where: {
            id: existingInventory.id,
          },
          data: {
            quantity: {
              increment: quantity,
            },
            ...(lowStockThreshold !== undefined && { lowStockThreshold }),
          },
        });
      } else {
        inventory = await tx.inventory.create({
          data: {
            organizationId: user.organizationId,
            shopId,
            storageId,
            productId,
            quantity,
            lowStockThreshold: lowStockThreshold ?? 5,
          },
        });
      }

      await tx.inventoryTransaction.create({
        data: {
          organizationId: user.organizationId,
          shopId,
          storageId,
          productId,
          createdById: user.userId,
          type: InventoryTransactionType.STOCK_IN,
          quantity,
          note,
        },
      });

      return inventory;
    },
  );

  return result;
};

const stockOut = async (user: IRequestUser, payload: IStockOutPayload) => {
  const { shopId, storageId, productId, quantity, note } = payload;

  await validateInventoryReferences(
    user.organizationId,
    shopId,
    storageId,
    productId,
  );

  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const existingInventory = await tx.inventory.findFirst({
        where: {
          organizationId: user.organizationId,
          shopId,
          storageId,
          productId,
        },
      });

      if (!existingInventory) {
        throw new AppError(status.NOT_FOUND, "Inventory not found");
      }

      if (existingInventory.quantity < quantity) {
        throw new AppError(
          status.BAD_REQUEST,
          "Insufficient stock quantity for stock out",
        );
      }

      const inventory = await tx.inventory.update({
        where: {
          id: existingInventory.id,
        },
        data: {
          quantity: {
            decrement: quantity,
          },
        },
      });

      await tx.inventoryTransaction.create({
        data: {
          organizationId: user.organizationId,
          shopId,
          storageId,
          productId,
          createdById: user.userId,
          type: InventoryTransactionType.STOCK_OUT,
          quantity,
          note,
        },
      });

      return inventory;
    },
  );

  return result;
};

const getAllInventory = async (user: IRequestUser, query: IQueryParams) => {
  const queryBuilder = new QueryBuilder(prisma.inventory, query, {
    searchableFields: inventorySearchableFields,
    filterableFields: inventoryFilterableFields,
    sortableFields: inventorySortableFields,
    defaultSortBy: "updatedAt",
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
      storage: true,
      product: {
        include: {
          category: true,
        },
      },
    })
    .where({
      organizationId: user.organizationId,
    })
    .execute();

  return result;
};

const getSingleInventory = async (user: IRequestUser, inventoryId: string) => {
  const inventory = await prisma.inventory.findFirst({
    where: {
      id: inventoryId,
      organizationId: user.organizationId,
    },
    include: {
      shop: true,
      storage: true,
      product: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!inventory) {
    throw new AppError(status.NOT_FOUND, "Inventory not found");
  }

  return inventory;
};

const getInventoryTransactions = async (
  user: IRequestUser,
  query: IQueryParams,
) => {
  const queryBuilder = new QueryBuilder(prisma.inventoryTransaction, query, {
    searchableFields: inventoryTransactionSearchableFields,
    filterableFields: inventoryTransactionFilterableFields,
    sortableFields: inventoryTransactionSortableFields,
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
      storage: true,
      product: {
        include: {
          category: true,
        },
      },
      createdBy: true,
    })
    .where({
      organizationId: user.organizationId,
    })
    .execute();

  return result;
};

export const inventoryService = {
  stockIn,
  stockOut,
  getAllInventory,
  getSingleInventory,
  getInventoryTransactions,
};
