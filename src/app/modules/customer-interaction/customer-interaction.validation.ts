import z from "zod";

export const createContactMessageValidationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

export const updateContactMessageStatusValidationSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "SCHEDULED", "CLOSED"]),
});

export const createDemoRequestValidationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().min(2, "Company name is required"),
  businessType: z.string().optional(),
  teamSize: z.string().optional(),
  preferredDate: z.string().datetime().optional(),
  message: z.string().optional(),
});

export const updateDemoRequestStatusValidationSchema = z.object({
  status: z.enum(["PENDING", "CONTACTED", "SCHEDULED", "COMPLETED", "CANCELLED"]),
});

export const createNewsletterSubscriberValidationSchema = z.object({
  email: z.email("Enter a valid email address"),
});

export const createSupportTicketValidationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  category: z.string().min(2, "Category is required"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

export const updateSupportTicketStatusValidationSchema = z.object({
  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]),
});
