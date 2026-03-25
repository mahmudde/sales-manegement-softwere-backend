import z from "zod";
import { ProductStatus } from "../../../generated/prisma/enums";

export const createProductValidationSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(120, "Product name cannot exceed 120 characters"),

  categoryId: z.string().min(1, "Category id is required"),

  sku: z
    .string()
    .min(2, "SKU must be at least 2 characters")
    .max(50, "SKU cannot exceed 50 characters"),

  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  image: z.url("Image must be a valid URL").optional(),

  price: z
    .number({ error: "Price must be a number" })
    .positive("Price must be greater than 0"),
});

export const updateProductValidationSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(120, "Product name cannot exceed 120 characters")
    .optional(),

  categoryId: z.string().min(1, "Category id is required").optional(),

  sku: z
    .string()
    .min(2, "SKU must be at least 2 characters")
    .max(50, "SKU cannot exceed 50 characters")
    .optional(),

  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  image: z.url("Image must be a valid URL").optional(),

  price: z
    .number({ error: "Price must be a number" })
    .positive("Price must be greater than 0")
    .optional(),
});

export const updateProductStatusValidationSchema = z.object({
  status: z.enum([
    ProductStatus.ACTIVE,
    ProductStatus.INACTIVE,
    ProductStatus.OUT_OF_STOCK,
  ]),
});
