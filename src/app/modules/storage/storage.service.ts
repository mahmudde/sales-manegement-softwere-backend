import status from "http-status";

import AppError from "../../errorHelper/AppError";
import { IRequestUser } from "../auth/auth.interface";
import {
  ICreateStoragePayload,
  IUpdateStoragePayload,
  IUpdateStorageStatusPayload,
} from "./storage.interface";
import { prisma } from "../../lib/prisma";
import { StorageStatus } from "../../../generated/prisma/enums";
import {
  storageFilterableFields,
  storageSearchableFields,
  storageSortableFields,
} from "./storage.constant";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { IQueryParams } from "../../interfaces/query.interface";

const ensureOrg = (user: IRequestUser): string => {
  if (!user.organizationId) {
    throw new AppError(status.BAD_REQUEST, "Organization context is missing");
  }
  return user.organizationId;
};

const createStorage = async (
  user: IRequestUser,
  payload: ICreateStoragePayload,
) => {
  const shop = await prisma.shop.findFirst({
    where: {
      id: payload.shopId,
      organizationId: ensureOrg(user),
      isDeleted: false,
    },
  });

  if (!shop) {
    throw new AppError(status.NOT_FOUND, "Shop not found");
  }

  const existingStorage = await prisma.storage.findFirst({
    where: {
      shopId: payload.shopId,
      name: payload.name,
      isDeleted: false,
    },
  });

  if (existingStorage) {
    throw new AppError(
      status.CONFLICT,
      "Storage already exists with this name in this shop",
    );
  }

  const storage = await prisma.storage.create({
    data: {
      organizationId: ensureOrg(user),
      shopId: payload.shopId,
      name: payload.name,
      description: payload.description,
    },
    include: {
      shop: true,
    },
  });

  return storage;
};

const getAllStorages = async (user: IRequestUser, query: IQueryParams) => {
  const queryBuilder = new QueryBuilder(prisma.storage, query, {
    searchableFields: storageSearchableFields,
    filterableFields: storageFilterableFields,
    sortableFields: storageSortableFields,
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
    })
    .where({
      organizationId: user.organizationId,
      isDeleted: false,
    })
    .execute();

  return result;
};

const getSingleStorage = async (user: IRequestUser, storageId: string) => {
  const storage = await prisma.storage.findFirst({
    where: {
      id: storageId,
      organizationId: ensureOrg(user),
      isDeleted: false,
    },
    include: {
      shop: true,
    },
  });

  if (!storage) {
    throw new AppError(status.NOT_FOUND, "Storage not found");
  }

  return storage;
};

const updateStorage = async (
  user: IRequestUser,
  storageId: string,
  payload: IUpdateStoragePayload,
) => {
  const existingStorage = await prisma.storage.findFirst({
    where: {
      id: storageId,
      organizationId: ensureOrg(user),
      isDeleted: false,
    },
  });

  if (!existingStorage) {
    throw new AppError(status.NOT_FOUND, "Storage not found");
  }

  const hasAnyUpdateField = Object.keys(payload).length > 0;

  if (!hasAnyUpdateField) {
    throw new AppError(status.BAD_REQUEST, "No update data provided");
  }

  let finalShopId = existingStorage.shopId;

  if (payload.shopId && payload.shopId !== existingStorage.shopId) {
    const shop = await prisma.shop.findFirst({
      where: {
        id: payload.shopId,
        organizationId: ensureOrg(user),
        isDeleted: false,
      },
    });

    if (!shop) {
      throw new AppError(status.NOT_FOUND, "Shop not found");
    }

    finalShopId = payload.shopId;
  }

  if (
    (payload.name && payload.name !== existingStorage.name) ||
    finalShopId !== existingStorage.shopId
  ) {
    const duplicateStorage = await prisma.storage.findFirst({
      where: {
        shopId: finalShopId,
        name: payload.name ?? existingStorage.name,
        isDeleted: false,
        NOT: {
          id: existingStorage.id,
        },
      },
    });

    if (duplicateStorage) {
      throw new AppError(
        status.CONFLICT,
        "Storage already exists with this name in this shop",
      );
    }
  }

  const updatedStorage = await prisma.storage.update({
    where: {
      id: existingStorage.id,
    },
    data: {
      shopId: finalShopId,
      name: payload.name,
      description: payload.description,
    },
    include: {
      shop: true,
    },
  });

  return updatedStorage;
};

const updateStorageStatus = async (
  user: IRequestUser,
  storageId: string,
  payload: IUpdateStorageStatusPayload,
) => {
  const existingStorage = await prisma.storage.findFirst({
    where: {
      id: storageId,
      organizationId: ensureOrg(user),
      isDeleted: false,
    },
  });

  if (!existingStorage) {
    throw new AppError(status.NOT_FOUND, "Storage not found");
  }

  const updatedStorage = await prisma.storage.update({
    where: {
      id: existingStorage.id,
    },
    data: {
      status: payload.status as StorageStatus,
    },
    include: {
      shop: true,
    },
  });

  return updatedStorage;
};

const deleteStorage = async (user: IRequestUser, storageId: string) => {
  if (!user.organizationId) {
    throw new AppError(status.BAD_REQUEST, "Organization context is missing");
  }

  const organizationId = user.organizationId;

  const existingStorage = await prisma.storage.findFirst({
    where: {
      id: storageId,
      organizationId,
      isDeleted: false,
    },
  });

  if (!existingStorage) {
    throw new AppError(status.NOT_FOUND, "Storage not found");
  }

  const relatedInventoryExists = await prisma.inventory.findFirst({
    where: {
      storageId: existingStorage.id,
      organizationId,
    },
    select: {
      id: true,
    },
  });

  if (relatedInventoryExists) {
    throw new AppError(
      status.BAD_REQUEST,
      "Cannot delete storage because inventory exists in this storage",
    );
  }

  const relatedInventoryTxnExists = await prisma.inventoryTransaction.findFirst(
    {
      where: {
        storageId: existingStorage.id,
        organizationId,
      },
      select: {
        id: true,
      },
    },
  );

  if (relatedInventoryTxnExists) {
    throw new AppError(
      status.BAD_REQUEST,
      "Cannot delete storage because inventory transactions exist for this storage",
    );
  }

  const relatedSaleReturnExists = await prisma.saleReturn.findFirst({
    where: {
      storageId: existingStorage.id,
      organizationId,
    },
    select: {
      id: true,
    },
  });

  if (relatedSaleReturnExists) {
    throw new AppError(
      status.BAD_REQUEST,
      "Cannot delete storage because sale returns exist for this storage",
    );
  }

  const deletedStorage = await prisma.storage.update({
    where: {
      id: existingStorage.id,
    },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
    include: {
      shop: true,
    },
  });

  return deletedStorage;
};

export const storageService = {
  createStorage,
  getAllStorages,
  getSingleStorage,
  updateStorage,
  updateStorageStatus,
  deleteStorage,
};
