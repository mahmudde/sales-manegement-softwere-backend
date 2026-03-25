import z from "zod";

export const createSaleValidationSchema = z.object({
  shopId: z.string().min(1, "Shop id is required"),
  storageId: z.string().min(1, "Storage id is required"),
  paymentMethod: z.enum(["CASH", "CARD", "OTHER"]),
  discount: z
    .number({ error: "Discount must be a number" })
    .min(0, "Discount cannot be negative")
    .optional(),
  note: z.string().max(255, "Note cannot exceed 255 characters").optional(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, "Product id is required"),
        quantity: z
          .number({ error: "Quantity must be a number" })
          .int("Quantity must be an integer")
          .positive("Quantity must be greater than 0"),
      }),
    )
    .min(1, "At least one sale item is required"),
});
