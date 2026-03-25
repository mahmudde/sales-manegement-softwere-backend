import z from "zod";

export const stockInValidationSchema = z.object({
  shopId: z.string().min(1, "Shop id is required"),
  storageId: z.string().min(1, "Storage id is required"),
  productId: z.string().min(1, "Product id is required"),
  quantity: z
    .number({ error: "Quantity must be a number" })
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),
  lowStockThreshold: z
    .number({ error: "Low stock threshold must be a number" })
    .int("Low stock threshold must be an integer")
    .nonnegative("Low stock threshold cannot be negative")
    .optional(),
  note: z.string().max(255, "Note cannot exceed 255 characters").optional(),
});

export const stockOutValidationSchema = z.object({
  shopId: z.string().min(1, "Shop id is required"),
  storageId: z.string().min(1, "Storage id is required"),
  productId: z.string().min(1, "Product id is required"),
  quantity: z
    .number({ error: "Quantity must be a number" })
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),
  note: z.string().max(255, "Note cannot exceed 255 characters").optional(),
});
