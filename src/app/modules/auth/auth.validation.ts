import z from "zod";

export const registerUserValidationSchema = z.object({
  organizationName: z
    .string()
    .min(2, "Organization name must be at least 2 characters")
    .max(100, "Organization name cannot exceed 100 characters"),

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
});

export const loginUserValidationSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters"),
});

export const changePasswordValidationSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters")
      .max(128, "Current password cannot exceed 128 characters"),

    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .max(128, "New password cannot exceed 128 characters"),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export const forgotPasswordValidationSchema = z.object({
  email: z.email("Invalid email address"),
});

export const resetPasswordValidationSchema = z.object({
  email: z.email("Invalid email address"),

  otp: z
    .string()
    .length(6, "OTP must be exactly 6 characters")
    .regex(/^\d{6}$/, "OTP must be a 6-digit number"),

  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters")
    .max(128, "New password cannot exceed 128 characters"),
});
