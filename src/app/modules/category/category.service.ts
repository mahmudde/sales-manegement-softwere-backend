import status from "http-status";

import AppError from "../../errorHelper/AppError";
import { IRequestUser } from "../auth/auth.interface";
import {
  ICreateCategoryPayload,
  IUpdateCategoryPayload,
} from "./category.interface";
import { prisma } from "../../lib/prisma";
import { CategoryStatus } from "../../../generated/prisma/enums";

const generateSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const generateUniqueCategorySlug = async (
  organizationId: string,
  categoryName: string,
) => {
  const baseSlug = generateSlug(categoryName) || "category";
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingCategory = await prisma.category.findFirst({
      where: {
        organizationId,
        slug,
      },
    });

    if (!existingCategory) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

const createCategory = async (
  user: IRequestUser,
  payload: ICreateCategoryPayload,
) => {
  const existingCategoryByName = await prisma.category.findFirst({
    where: {
      organizationId: user.organizationId,
      name: payload.name,
      isDeleted: false,
    },
  });

  if (existingCategoryByName) {
    throw new AppError(
      status.CONFLICT,
      "Category already exists with this name",
    );
  }

  const slug = await generateUniqueCategorySlug(
    user.organizationId,
    payload.name,
  );

  const category = await prisma.category.create({
    data: {
      organizationId: user.organizationId,
      name: payload.name,
      slug,
      description: payload.description,
    },
  });

  return category;
};

const getAllCategories = async (user: IRequestUser) => {
  const categories = await prisma.category.findMany({
    where: {
      organizationId: user.organizationId,
      isDeleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return categories;
};

const getSingleCategory = async (user: IRequestUser, categoryId: string) => {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      organizationId: user.organizationId,
      isDeleted: false,
    },
  });

  if (!category) {
    throw new AppError(status.NOT_FOUND, "Category not found");
  }

  return category;
};

const updateCategory = async (
  user: IRequestUser,
  categoryId: string,
  payload: IUpdateCategoryPayload,
) => {
  const existingCategory = await prisma.category.findFirst({
    where: {
      id: categoryId,
      organizationId: user.organizationId,
      isDeleted: false,
    },
  });

  if (!existingCategory) {
    throw new AppError(status.NOT_FOUND, "Category not found");
  }

  const hasAnyUpdateField = Object.keys(payload).length > 0;

  if (!hasAnyUpdateField) {
    throw new AppError(status.BAD_REQUEST, "No update data provided");
  }

  let slug = existingCategory.slug;

  if (payload.name && payload.name !== existingCategory.name) {
    const duplicateNameCategory = await prisma.category.findFirst({
      where: {
        organizationId: user.organizationId,
        name: payload.name,
        isDeleted: false,
        NOT: {
          id: existingCategory.id,
        },
      },
    });

    if (duplicateNameCategory) {
      throw new AppError(
        status.CONFLICT,
        "Category already exists with this name",
      );
    }

    slug = await generateUniqueCategorySlug(user.organizationId, payload.name);
  }

  const updatedCategory = await prisma.category.update({
    where: {
      id: existingCategory.id,
    },
    data: {
      ...payload,
      slug,
    },
  });

  return updatedCategory;
};

const deleteCategory = async (user: IRequestUser, categoryId: string) => {
  const existingCategory = await prisma.category.findFirst({
    where: {
      id: categoryId,
      organizationId: user.organizationId,
      isDeleted: false,
    },
  });

  if (!existingCategory) {
    throw new AppError(status.NOT_FOUND, "Category not found");
  }

  const categoryWithProducts = await prisma.category.findFirst({
    where: {
      id: categoryId,
      organizationId: user.organizationId,
      isDeleted: false,
    },
    include: {
      products: {
        where: {
          isDeleted: false,
        },
      },
    },
  });

  if (categoryWithProducts && categoryWithProducts.products.length > 0) {
    throw new AppError(
      status.BAD_REQUEST,
      "This category cannot be deleted because products are associated with it",
    );
  }

  const deletedCategory = await prisma.category.update({
    where: {
      id: existingCategory.id,
    },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
      status: CategoryStatus.INACTIVE,
    },
  });

  return deletedCategory;
};

export const categoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
