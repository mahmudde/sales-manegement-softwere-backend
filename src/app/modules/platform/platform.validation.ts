import z from "zod";

export const updateOrganizationStatusValidationSchema = z.object({
  status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]),
});
