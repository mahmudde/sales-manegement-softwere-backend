import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { IRequestUser } from "../auth/auth.interface";
import {
  ICreateShopPayload,
  IUpdateShopPayload,
  IUpdateShopStatusPayload,
} from "./shop.interface";
import { prisma } from "../../lib/prisma";
import { ShopStatus } from "../../../generated/prisma/enums";
import {
  shopFilterableFields,
  shopSearchableFields,
  shopSortableFields,
} from "./shop.constant";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { IQueryParams } from "../../interfaces/query.interface";
import { deleteFileFromCloudinary } from "../../config/cloudinary.config";

const generateSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const ensureOrg = (user: IRequestUser): string => {
  if (!user.organizationId) {
    throw new AppError(status.BAD_REQUEST, "Organization context is missing");
  }
  return user.organizationId;
};

const generateUniqueShopSlug = async (
  organizationId: string,
  shopName: string,
) => {
  const baseSlug = generateSlug(shopName) || "shop";
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingShop = await prisma.shop.findFirst({
      where: {
        organizationId,
        slug,
      },
    });

    if (!existingShop) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

const createShop = async (
  user: IRequestUser,
  payload: ICreateShopPayload,
  file?: Express.Multer.File,
) => {
  const organizationId = ensureOrg(user);

  const slug = await generateUniqueShopSlug(organizationId, payload.name);

  const uploadedFile = file as Express.Multer.File & {
    path?: string;
    secure_url?: string;
  };

  const imageUrl = uploadedFile?.path || uploadedFile?.secure_url || null;

  const shop = await prisma.shop.create({
    data: {
      organizationId,
      name: payload.name,
      slug,
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
      image: imageUrl,
    },
  });

  return shop;
};

const getAllShops = async (user: IRequestUser, query: IQueryParams) => {
  const organizationId = ensureOrg(user);

  const queryBuilder = new QueryBuilder(prisma.shop, query, {
    searchableFields: shopSearchableFields,
    filterableFields: shopFilterableFields,
    sortableFields: shopSortableFields,
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
    .where({
      organizationId,
      isDeleted: false,
    })
    .execute();

  return result;
};

const getSingleShop = async (user: IRequestUser, shopId: string) => {
  const organizationId = ensureOrg(user);

  const shop = await prisma.shop.findFirst({
    where: {
      id: shopId,
      organizationId,
      isDeleted: false,
    },
  });

  if (!shop) {
    throw new AppError(status.NOT_FOUND, "Shop not found");
  }

  return shop;
};

const updateShop = async (
  user: IRequestUser,
  shopId: string,
  payload: IUpdateShopPayload,
  file?: Express.Multer.File,
) => {
  const organizationId = ensureOrg(user);

  const existingShop = await prisma.shop.findFirst({
    where: {
      id: shopId,
      organizationId,
      isDeleted: false,
    },
  });

  if (!existingShop) {
    throw new AppError(status.NOT_FOUND, "Shop not found");
  }

  const hasAnyUpdateField = Object.keys(payload).length > 0 || !!file;

  if (!hasAnyUpdateField) {
    throw new AppError(status.BAD_REQUEST, "No update data provided");
  }

  let slug = existingShop.slug;

  if (payload.name && payload.name !== existingShop.name) {
    slug = await generateUniqueShopSlug(organizationId, payload.name);
  }

  const uploadedFile = file as Express.Multer.File & {
    path?: string;
    secure_url?: string;
  };

  const imageUrl =
    uploadedFile?.path ||
    uploadedFile?.secure_url ||
    existingShop.image ||
    undefined;

  const updatedShop = await prisma.shop.update({
    where: {
      id: existingShop.id,
    },
    data: {
      ...payload,
      slug,
      image: imageUrl,
    },
  });

  if (file && existingShop.image && existingShop.image !== imageUrl) {
    await deleteFileFromCloudinary(existingShop.image);
  }

  return updatedShop;
};

const updateShopStatus = async (
  user: IRequestUser,
  shopId: string,
  payload: IUpdateShopStatusPayload,
) => {
  const organizationId = ensureOrg(user);

  const existingShop = await prisma.shop.findFirst({
    where: {
      id: shopId,
      organizationId,
      isDeleted: false,
    },
  });

  if (!existingShop) {
    throw new AppError(status.NOT_FOUND, "Shop not found");
  }

  const updatedShop = await prisma.shop.update({
    where: {
      id: existingShop.id,
    },
    data: {
      status: payload.status as ShopStatus,
    },
  });

  return updatedShop;
};

const deleteShop = async (user: IRequestUser, shopId: string) => {
  const organizationId = ensureOrg(user);

  const existingShop = await prisma.shop.findFirst({
    where: {
      id: shopId,
      organizationId,
      isDeleted: false,
    },
  });

  if (!existingShop) {
    throw new AppError(status.NOT_FOUND, "Shop not found");
  }

  const relatedStorageExists = await prisma.storage.findFirst({
    where: {
      shopId: existingShop.id,
      organizationId,
      isDeleted: false,
    },
    select: {
      id: true,
    },
  });

  if (relatedStorageExists) {
    throw new AppError(
      status.BAD_REQUEST,
      "Cannot delete shop because it has active storages",
    );
  }

  const relatedInventoryExists = await prisma.inventory.findFirst({
    where: {
      shopId: existingShop.id,
      organizationId,
    },
    select: {
      id: true,
    },
  });

  if (relatedInventoryExists) {
    throw new AppError(
      status.BAD_REQUEST,
      "Cannot delete shop because inventory exists for this shop",
    );
  }

  const relatedSaleExists = await prisma.sale.findFirst({
    where: {
      shopId: existingShop.id,
      organizationId,
    },
    select: {
      id: true,
    },
  });

  if (relatedSaleExists) {
    throw new AppError(
      status.BAD_REQUEST,
      "Cannot delete shop because sales already exist for this shop",
    );
  }

  const relatedAssignmentExists = await prisma.shopAssignment.findFirst({
    where: {
      shopId: existingShop.id,
      organizationId,
      isActive: true,
    },
    select: {
      id: true,
    },
  });

  if (relatedAssignmentExists) {
    throw new AppError(
      status.BAD_REQUEST,
      "Cannot delete shop because staff are still assigned to it",
    );
  }

  const deletedShop = await prisma.shop.update({
    where: {
      id: existingShop.id,
    },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });

  return deletedShop;
};

export const shopService = {
  createShop,
  getAllShops,
  getSingleShop,
  updateShop,
  updateShopStatus,
  deleteShop,
};
