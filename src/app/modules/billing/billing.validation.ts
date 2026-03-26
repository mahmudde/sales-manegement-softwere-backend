import z from "zod";

export const createPaymentIntentValidationSchema = z.object({
  billingPlanId: z.string().min(1, "Billing plan id is required"),
});
