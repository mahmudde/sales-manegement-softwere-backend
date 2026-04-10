import z from "zod";
import { OrgRole } from "../../../generated/prisma/enums";

export const createStaffValidationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name cannot exceed 60 characters"),

  email: z.email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters"),

  phone: z
    .string()
    .min(11, "Phone number must be at least 11 characters")
    .max(20, "Phone number cannot exceed 20 characters")
    .optional(),

  shopId: z.string().min(1, "Shop id is required"),

  role: z.enum([OrgRole.ORG_ADMIN, OrgRole.SHOP_ADMIN, OrgRole.STAFF]),
});

export const updateStaffValidationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name cannot exceed 60 characters")
    .optional(),

  phone: z
    .string()
    .min(11, "Phone number must be at least 11 characters")
    .max(20, "Phone number cannot exceed 20 characters")
    .optional(),

  shopId: z.string().min(1, "Shop id is required").optional(),

  role: z
    .enum([OrgRole.ORG_ADMIN, OrgRole.SHOP_ADMIN, OrgRole.STAFF])
    .optional(),
});

export const updateStaffStatusValidationSchema = z.object({
  status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]),
});
