import z from "zod";
import { StorageStatus } from "../../../generated/prisma/enums";

export const createStorageValidationSchema = z.object({
  shopId: z.string().min(1, "Shop id is required"),

  name: z
    .string()
    .min(2, "Storage name must be at least 2 characters")
    .max(100, "Storage name cannot exceed 100 characters"),

  description: z
    .string()
    .max(255, "Description cannot exceed 255 characters")
    .optional(),
});

export const updateStorageValidationSchema = z.object({
  shopId: z.string().min(1, "Shop id is required").optional(),

  name: z
    .string()
    .min(2, "Storage name must be at least 2 characters")
    .max(100, "Storage name cannot exceed 100 characters")
    .optional(),

  description: z
    .string()
    .max(255, "Description cannot exceed 255 characters")
    .optional(),
});

export const updateStorageStatusValidationSchema = z.object({
  status: z.enum([StorageStatus.ACTIVE, StorageStatus.INACTIVE]),
});
