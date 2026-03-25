import z from "zod";

export const createCategoryValidationSchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(100, "Category name cannot exceed 100 characters"),

  description: z
    .string()
    .max(255, "Description cannot exceed 255 characters")
    .optional(),
});

export const updateCategoryValidationSchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(100, "Category name cannot exceed 100 characters")
    .optional(),

  description: z
    .string()
    .max(255, "Description cannot exceed 255 characters")
    .optional(),
});
