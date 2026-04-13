import z from "zod";

export const createSaleValidationSchema = z.object({
  shopId: z.string().min(1, "Shop id is required"),
  storageId: z.string().min(1, "Storage id is required"),
  paymentMethod: z.enum(["CASH", "CARD", "MOBILE_BANKING", "BANK_TRANSFER"]),
  discount: z.number().min(0).optional(),
  note: z.string().optional(),
  paidAmount: z.number().min(0).optional(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, "Product id is required"),
        quantity: z.number().int().positive("Quantity must be greater than 0"),
      }),
    )
    .min(1, "At least one sale item is required"),
});

export const addSalePaymentValidationSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  paymentMethod: z.enum(["CASH", "CARD", "MOBILE_BANKING", "BANK_TRANSFER"]),
  note: z.string().optional(),
});

export const createSaleReturnValidationSchema = z.object({
  storageId: z.string().min(1, "Storage id is required"),
  note: z.string().optional(),
  items: z
    .array(
      z.object({
        saleItemId: z.string().min(1, "Sale item id is required"),
        quantity: z.number().int().positive("Quantity must be greater than 0"),
      }),
    )
    .min(1, "At least one return item is required"),
});

export const cancelSaleValidationSchema = z.object({
  note: z.string().optional(),
});
