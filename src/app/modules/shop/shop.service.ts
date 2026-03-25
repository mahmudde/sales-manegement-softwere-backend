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

const generateSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

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

const createShop = async (user: IRequestUser, payload: ICreateShopPayload) => {
  const slug = await generateUniqueShopSlug(user.organizationId, payload.name);

  const shop = await prisma.shop.create({
    data: {
      organizationId: user.organizationId,
      name: payload.name,
      slug,
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
      image: payload.image,
    },
  });

  return shop;
};

const getAllShops = async (user: IRequestUser) => {
  const shops = await prisma.shop.findMany({
    where: {
      organizationId: user.organizationId,
      isDeleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return shops;
};

const getSingleShop = async (user: IRequestUser, shopId: string) => {
  const shop = await prisma.shop.findFirst({
    where: {
      id: shopId,
      organizationId: user.organizationId,
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
) => {
  const existingShop = await prisma.shop.findFirst({
    where: {
      id: shopId,
      organizationId: user.organizationId,
      isDeleted: false,
    },
  });

  if (!existingShop) {
    throw new AppError(status.NOT_FOUND, "Shop not found");
  }

  const hasAnyUpdateField = Object.keys(payload).length > 0;

  if (!hasAnyUpdateField) {
    throw new AppError(status.BAD_REQUEST, "No update data provided");
  }

  let slug = existingShop.slug;

  if (payload.name && payload.name !== existingShop.name) {
    slug = await generateUniqueShopSlug(user.organizationId, payload.name);
  }

  const updatedShop = await prisma.shop.update({
    where: {
      id: existingShop.id,
    },
    data: {
      ...payload,
      slug,
    },
  });

  return updatedShop;
};

const updateShopStatus = async (
  user: IRequestUser,
  shopId: string,
  payload: IUpdateShopStatusPayload,
) => {
  const existingShop = await prisma.shop.findFirst({
    where: {
      id: shopId,
      organizationId: user.organizationId,
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

export const shopService = {
  createShop,
  getAllShops,
  getSingleShop,
  updateShop,
  updateShopStatus,
};
