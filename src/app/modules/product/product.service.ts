import status from "http-status";

import AppError from "../../errorHelper/AppError";
import { IRequestUser } from "../auth/auth.interface";
import {
  ICreateProductPayload,
  IUpdateProductPayload,
  IUpdateProductStatusPayload,
} from "./product.interface";
import { prisma } from "../../lib/prisma";
import { Prisma, ProductStatus } from "../../../generated/prisma/client";
import { IQueryParams } from "../../interfaces/query.interface";
import { QueryBuilder } from "../../builder/QueryBuilder";
import {
  productFilterableFields,
  productSearchableFields,
  productSortableFields,
} from "./product.constant";
import { deleteFileFromCloudinary } from "../../config/cloudinary.config";

const generateSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const generateUniqueProductSlug = async (
  organizationId: string,
  productName: string,
) => {
  const baseSlug = generateSlug(productName) || "product";
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingProduct = await prisma.product.findFirst({
      where: {
        organizationId,
        slug,
      },
    });

    if (!existingProduct) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

const createProduct = async (
  user: IRequestUser,
  payload: ICreateProductPayload,
  file?: Express.Multer.File,
) => {
  const category = await prisma.category.findFirst({
    where: {
      id: payload.categoryId,
      organizationId: user.organizationId,
      isDeleted: false,
    },
  });

  if (!category) {
    throw new AppError(status.NOT_FOUND, "Category not found");
  }

  const existingSkuProduct = await prisma.product.findFirst({
    where: {
      organizationId: user.organizationId,
      sku: payload.sku,
    },
  });

  if (existingSkuProduct) {
    throw new AppError(status.CONFLICT, "Product already exists with this SKU");
  }

  const slug = await generateUniqueProductSlug(
    user.organizationId,
    payload.name,
  );

  const uploadedFile = file as Express.Multer.File & {
    path?: string;
    filename?: string;
  };

  console.log("service file =>", uploadedFile);

  const imageUrl = uploadedFile?.path ?? null;

  console.log("from product service", imageUrl);

  console.log("imageUrl =>", imageUrl);

  const product = await prisma.product.create({
    data: {
      organizationId: user.organizationId,
      categoryId: payload.categoryId,
      name: payload.name,
      slug,
      sku: payload.sku,
      description: payload.description,
      image: imageUrl,
      price: new Prisma.Decimal(payload.price),
    },
    include: {
      category: true,
    },
  });

  return product;
};

const getAllProducts = async (user: IRequestUser, query: IQueryParams) => {
  const queryBuilder = new QueryBuilder(prisma.product, query, {
    searchableFields: productSearchableFields,
    filterableFields: productFilterableFields,
    sortableFields: productSortableFields,
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
      category: true,
    })
    .where({
      organizationId: user.organizationId,
      isDeleted: false,
    })
    .execute();

  return result;
};

const getSingleProduct = async (user: IRequestUser, productId: string) => {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      organizationId: user.organizationId,
      isDeleted: false,
    },
    include: {
      category: true,
    },
  });

  if (!product) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  return product;
};

const updateProduct = async (
  user: IRequestUser,
  productId: string,
  payload: IUpdateProductPayload,
  file?: Express.Multer.File,
) => {
  const existingProduct = await prisma.product.findFirst({
    where: {
      id: productId,
      organizationId: user.organizationId,
      isDeleted: false,
    },
    include: {
      category: true,
    },
  });

  if (!existingProduct) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  const hasAnyUpdateField = Object.keys(payload).length > 0 || !!file;

  if (!hasAnyUpdateField) {
    throw new AppError(status.BAD_REQUEST, "No update data provided");
  }

  if (payload.categoryId) {
    const category = await prisma.category.findFirst({
      where: {
        id: payload.categoryId,
        organizationId: user.organizationId,
        isDeleted: false,
      },
    });

    if (!category) {
      throw new AppError(status.NOT_FOUND, "Category not found");
    }
  }

  if (payload.sku && payload.sku !== existingProduct.sku) {
    const duplicateSkuProduct = await prisma.product.findFirst({
      where: {
        organizationId: user.organizationId,
        sku: payload.sku,
        NOT: {
          id: existingProduct.id,
        },
      },
    });

    if (duplicateSkuProduct) {
      throw new AppError(
        status.CONFLICT,
        "Product already exists with this SKU",
      );
    }
  }

  let slug = existingProduct.slug;

  if (payload.name && payload.name !== existingProduct.name) {
    slug = await generateUniqueProductSlug(user.organizationId, payload.name);
  }

  const newImageUrl = file?.path ?? existingProduct.image ?? undefined;

  const updatedProduct = await prisma.product.update({
    where: {
      id: existingProduct.id,
    },
    data: {
      name: payload.name,
      categoryId: payload.categoryId,
      sku: payload.sku,
      description: payload.description,
      image: newImageUrl,
      slug,
      ...(payload.price !== undefined && {
        price: new Prisma.Decimal(payload.price),
      }),
    },
    include: {
      category: true,
    },
  });

  if (
    file?.path &&
    existingProduct.image &&
    existingProduct.image !== file.path
  ) {
    await deleteFileFromCloudinary(existingProduct.image);
  }

  return updatedProduct;
};

const updateProductStatus = async (
  user: IRequestUser,
  productId: string,
  payload: IUpdateProductStatusPayload,
) => {
  const existingProduct = await prisma.product.findFirst({
    where: {
      id: productId,
      organizationId: user.organizationId,
      isDeleted: false,
    },
  });

  if (!existingProduct) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: existingProduct.id,
    },
    data: {
      status: payload.status as ProductStatus,
    },
    include: {
      category: true,
    },
  });

  return updatedProduct;
};

export const productService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  updateProductStatus,
};
