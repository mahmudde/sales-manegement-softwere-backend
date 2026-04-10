import z from "zod";

export const updateOrganizationValidationSchema = z.object({
  name: z
    .string()
    .min(2, "Organization name must be at least 2 characters")
    .max(100, "Organization name cannot exceed 100 characters")
    .optional(),

  email: z.email("Invalid email address").optional(),

  phone: z
    .string()
    .min(11, "Phone number must be at least 11 characters")
    .max(20, "Phone number cannot exceed 20 characters")
    .optional(),

  address: z
    .string()
    .min(3, "Address must be at least 3 characters")
    .max(255, "Address cannot exceed 255 characters")
    .optional(),
});
