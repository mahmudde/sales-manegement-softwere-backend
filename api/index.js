var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// src/app/config/env.ts
import dotenv from "dotenv";
dotenv.config();
var requiredEnvVars = [
  "NODE_ENV",
  "DATABASE_URL",
  "FRONTEND_URL",
  "BETTER_AUTH_SECRET",
  "BETTER_AUTH_URL",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
  "ACCESS_TOKEN_EXPIRES_IN",
  "REFRESH_TOKEN_EXPIRES_IN",
  "BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN",
  "BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "STRIPE_PUBLISHABLE_KEY",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "EMAIL_SENDER_SMTP_USER",
  "EMAIL_SENDER_SMTP_PASS",
  "EMAIL_SENDER_SMTP_HOST",
  "EMAIL_SENDER_SMTP_PORT",
  "EMAIL_SENDER_SMTP_FROM",
  "PLATFORM_SUPER_ADMIN_NAME",
  "PLATFORM_SUPER_ADMIN_EMAIL",
  "PLATFORM_SUPER_ADMIN_PASSWORD"
];
var loadEnvVariables = () => {
  for (const variable of requiredEnvVars) {
    if (!process.env[variable]) {
      throw new Error(
        `Environment variable ${variable} is required but not defined.`
      );
    }
  }
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT ?? 5e3),
    DATABASE_URL: process.env.DATABASE_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN: process.env.BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN,
    BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE: process.env.BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    EMAIL_SENDER_SMTP_USER: process.env.EMAIL_SENDER_SMTP_USER,
    EMAIL_SENDER_SMTP_PASS: process.env.EMAIL_SENDER_SMTP_PASS,
    EMAIL_SENDER_SMTP_HOST: process.env.EMAIL_SENDER_SMTP_HOST,
    EMAIL_SENDER_SMTP_PORT: process.env.EMAIL_SENDER_SMTP_PORT,
    EMAIL_SENDER_SMTP_FROM: process.env.EMAIL_SENDER_SMTP_FROM,
    PLATFORM_SUPER_ADMIN_NAME: process.env.PLATFORM_SUPER_ADMIN_NAME,
    PLATFORM_SUPER_ADMIN_EMAIL: process.env.PLATFORM_SUPER_ADMIN_EMAIL,
    PLATFORM_SUPER_ADMIN_PASSWORD: process.env.PLATFORM_SUPER_ADMIN_PASSWORD
  };
};
var envVars = loadEnvVariables();

// src/app/routes/index.ts
import { Router as Router14 } from "express";

// src/app/modules/auth/auth.route.ts
import { Router } from "express";

// src/app/modules/auth/auth.controller.ts
import status3 from "http-status";

// src/app/shared/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// src/app/shared/sendResponse.ts
var sendResponse = (res, data) => {
  const responseData = {
    success: data.success,
    message: data.message
  };
  if (data.meta) {
    responseData.meta = data.meta;
  }
  if (data.data !== void 0) {
    responseData.data = data.data;
  }
  return res.status(data.httpStatusCode).json(responseData);
};

// src/app/modules/auth/auth.service.ts
import status2 from "http-status";

// src/app/errorHelper/AppError.ts
var AppError = class extends Error {
  statusCode;
  constructor(statusCode, message, stack) {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
var AppError_default = AppError;

// src/app/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";

// src/app/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import * as path from "node:path";
import { fileURLToPath } from "node:url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.5.0",
  "engineVersion": "280c870be64f457428992c43c1f6d557fab6e29e",
  "activeProvider": "postgresql",
  "inlineSchema": 'enum BillingInterval {\n  MONTHLY\n  YEARLY\n  ONE_TIME\n}\n\nenum SubscriptionStatus {\n  ACTIVE\n  INACTIVE\n  PAST_DUE\n  CANCELLED\n  TRIALING\n}\n\nenum PaymentStatus {\n  PENDING\n  SUCCEEDED\n  FAILED\n  CANCELLED\n  REFUNDED\n}\n\nenum UserStatus {\n  ACTIVE\n  INACTIVE\n  SUSPENDED\n}\n\nenum OrganizationStatus {\n  ACTIVE\n  INACTIVE\n  SUSPENDED\n}\n\nenum OrgRole {\n  ORG_SUPER_ADMIN\n  ORG_ADMIN\n  SHOP_ADMIN\n  STAFF\n}\n\nenum ShopStatus {\n  ACTIVE\n  INACTIVE\n}\n\nenum CategoryStatus {\n  ACTIVE\n  INACTIVE\n}\n\nenum ProductStatus {\n  ACTIVE\n  INACTIVE\n  OUT_OF_STOCK\n}\n\nenum StorageStatus {\n  ACTIVE\n  INACTIVE\n}\n\nenum PlatformRole {\n  PLATFORM_SUPER_ADMIN\n}\n\nenum SalePaymentStatus {\n  UNPAID\n  PARTIAL\n  PAID\n}\n\nenum SaleReturnStatus {\n  PARTIAL\n  FULL\n}\n\nenum InventoryTransactionType {\n  STOCK_IN\n  STOCK_OUT\n  SALE\n  ADJUSTMENT\n}\n\nenum SalePaymentMethod {\n  CASH\n  CARD\n  OTHER\n}\n\nenum SaleStatus {\n  COMPLETED\n  CANCELLED\n  REFUNDED\n}\n\nmodel AuditLog {\n  id             String   @id @default(cuid())\n  userId         String?\n  organizationId String?\n  action         String\n  entityType     String\n  entityId       String?\n  description    String?\n  metadata       Json?\n  createdAt      DateTime @default(now())\n\n  user         User?         @relation(fields: [userId], references: [id], onDelete: SetNull)\n  organization Organization? @relation(fields: [organizationId], references: [id], onDelete: SetNull)\n\n  @@index([userId])\n  @@index([organizationId])\n  @@index([entityType])\n  @@index([createdAt])\n}\n\nmodel User {\n  id            String        @id\n  name          String\n  email         String\n  emailVerified Boolean       @default(false)\n  image         String?\n  phone         String?\n  status        UserStatus    @default(ACTIVE)\n  platformRole  PlatformRole?\n  isDeleted     Boolean       @default(false)\n  deletedAt     DateTime?\n  createdAt     DateTime      @default(now())\n  updatedAt     DateTime      @updatedAt\n\n  sessions  Session[]\n  accounts  Account[]\n  auditLogs AuditLog[]\n\n  organizationMembers OrganizationMember[]\n  shopAssignments     ShopAssignment[]\n\n  createdSales         Sale[]                 @relation("SaleCreatedBy")\n  createdInventoryTxns InventoryTransaction[] @relation("InventoryTxnCreatedBy")\n  createdPayments      PaymentTransaction[]   @relation("PaymentCreatedBy")\n  salePaymentsReceived SalePayment[]          @relation("SalePaymentReceivedBy")\n  saleReturns          SaleReturn[]           @relation("SaleReturnReturnedBy")\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([providerId, accountId])\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel BillingPlan {\n  id             String          @id @default(cuid())\n  organizationId String?\n  name           String\n  slug           String          @unique\n  description    String?\n  amount         Decimal         @db.Decimal(10, 2)\n  currency       String          @default("usd")\n  interval       BillingInterval\n  isActive       Boolean         @default(true)\n  createdAt      DateTime        @default(now())\n  updatedAt      DateTime        @updatedAt\n\n  organization  Organization?              @relation(fields: [organizationId], references: [id], onDelete: SetNull)\n  subscriptions OrganizationSubscription[]\n\n  @@index([organizationId])\n}\n\nmodel OrganizationSubscription {\n  id                   String             @id @default(cuid())\n  organizationId       String\n  billingPlanId        String\n  status               SubscriptionStatus @default(INACTIVE)\n  stripeCustomerId     String?\n  stripeSubscriptionId String?\n  startsAt             DateTime?\n  endsAt               DateTime?\n  createdAt            DateTime           @default(now())\n  updatedAt            DateTime           @updatedAt\n\n  organization Organization         @relation(fields: [organizationId], references: [id], onDelete: Cascade)\n  billingPlan  BillingPlan          @relation(fields: [billingPlanId], references: [id], onDelete: Restrict)\n  payments     PaymentTransaction[]\n\n  @@index([organizationId])\n  @@index([billingPlanId])\n  @@index([stripeCustomerId])\n  @@index([stripeSubscriptionId])\n}\n\nmodel PaymentTransaction {\n  id                    String        @id @default(cuid())\n  organizationId        String\n  subscriptionId        String?\n  createdById           String?\n  amount                Decimal       @db.Decimal(10, 2)\n  currency              String        @default("usd")\n  status                PaymentStatus @default(PENDING)\n  stripePaymentIntentId String?       @unique\n  stripeClientSecret    String?\n  note                  String?\n  createdAt             DateTime      @default(now())\n  updatedAt             DateTime      @updatedAt\n\n  organization Organization              @relation(fields: [organizationId], references: [id], onDelete: Cascade)\n  subscription OrganizationSubscription? @relation(fields: [subscriptionId], references: [id], onDelete: SetNull)\n  createdBy    User?                     @relation("PaymentCreatedBy", fields: [createdById], references: [id], onDelete: SetNull)\n\n  @@index([organizationId, createdAt])\n  @@index([subscriptionId])\n  @@index([createdById])\n}\n\nmodel Category {\n  id             String         @id @default(cuid())\n  organizationId String\n  name           String\n  slug           String\n  description    String?\n  status         CategoryStatus @default(ACTIVE)\n  isDeleted      Boolean        @default(false)\n  deletedAt      DateTime?\n  createdAt      DateTime       @default(now())\n  updatedAt      DateTime       @updatedAt\n\n  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)\n  products     Product[]\n\n  @@unique([organizationId, slug])\n  @@index([organizationId])\n}\n\nmodel Product {\n  id             String        @id @default(cuid())\n  organizationId String\n  categoryId     String\n  name           String\n  slug           String\n  sku            String\n  description    String?\n  image          String?\n  price          Decimal       @db.Decimal(10, 2)\n  status         ProductStatus @default(ACTIVE)\n  isDeleted      Boolean       @default(false)\n  deletedAt      DateTime?\n  createdAt      DateTime      @default(now())\n  updatedAt      DateTime      @updatedAt\n\n  organization  Organization           @relation(fields: [organizationId], references: [id], onDelete: Cascade)\n  category      Category               @relation(fields: [categoryId], references: [id], onDelete: Restrict)\n  inventories   Inventory[]\n  inventoryTxns InventoryTransaction[]\n  saleItems     SaleItem[]\n  items         SaleReturnItem[]\n\n  @@unique([organizationId, slug])\n  @@unique([organizationId, sku])\n  @@index([organizationId, categoryId])\n}\n\nenum LeadStatus {\n  NEW\n  CONTACTED\n  SCHEDULED\n  CLOSED\n}\n\nenum DemoRequestStatus {\n  PENDING\n  CONTACTED\n  SCHEDULED\n  COMPLETED\n  CANCELLED\n}\n\nenum SupportTicketStatus {\n  OPEN\n  IN_PROGRESS\n  RESOLVED\n  CLOSED\n}\n\nenum SupportTicketPriority {\n  LOW\n  MEDIUM\n  HIGH\n  URGENT\n}\n\nmodel ContactMessage {\n  id        String     @id @default(uuid())\n  name      String\n  email     String\n  phone     String?\n  company   String?\n  message   String\n  status    LeadStatus @default(NEW)\n  createdAt DateTime   @default(now())\n  updatedAt DateTime   @updatedAt\n\n  @@index([status, createdAt])\n  @@index([email])\n}\n\nmodel DemoRequest {\n  id            String            @id @default(uuid())\n  name          String\n  email         String\n  phone         String?\n  company       String\n  businessType  String?\n  teamSize      String?\n  preferredDate DateTime?\n  message       String?\n  status        DemoRequestStatus @default(PENDING)\n  createdAt     DateTime          @default(now())\n  updatedAt     DateTime          @updatedAt\n\n  @@index([status, createdAt])\n  @@index([email])\n}\n\nmodel NewsletterSubscriber {\n  id        String   @id @default(uuid())\n  email     String   @unique\n  isActive  Boolean  @default(true)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel SupportTicket {\n  id             String                @id @default(uuid())\n  organizationId String?\n  name           String\n  email          String\n  subject        String\n  category       String\n  priority       SupportTicketPriority @default(MEDIUM)\n  message        String\n  status         SupportTicketStatus   @default(OPEN)\n  createdAt      DateTime              @default(now())\n  updatedAt      DateTime              @updatedAt\n\n  organization Organization? @relation(fields: [organizationId], references: [id], onDelete: SetNull)\n\n  @@index([organizationId])\n  @@index([status, createdAt])\n  @@index([email])\n}\n\nmodel Storage {\n  id             String        @id @default(cuid())\n  organizationId String\n  shopId         String\n  name           String\n  description    String?\n  status         StorageStatus @default(ACTIVE)\n  isDeleted      Boolean       @default(false)\n  deletedAt      DateTime?\n  createdAt      DateTime      @default(now())\n  updatedAt      DateTime      @updatedAt\n\n  organization  Organization           @relation(fields: [organizationId], references: [id], onDelete: Cascade)\n  shop          Shop                   @relation(fields: [shopId], references: [id], onDelete: Cascade)\n  inventories   Inventory[]\n  inventoryTxns InventoryTransaction[]\n  returns       SaleReturn[]\n\n  @@unique([shopId, name])\n  @@index([organizationId, shopId])\n}\n\nmodel Inventory {\n  id                String   @id @default(cuid())\n  organizationId    String\n  shopId            String\n  storageId         String\n  productId         String\n  quantity          Int      @default(0)\n  lowStockThreshold Int      @default(5)\n  createdAt         DateTime @default(now())\n  updatedAt         DateTime @updatedAt\n\n  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)\n  shop         Shop         @relation(fields: [shopId], references: [id], onDelete: Cascade)\n  storage      Storage      @relation(fields: [storageId], references: [id], onDelete: Cascade)\n  product      Product      @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  @@unique([shopId, storageId, productId])\n  @@index([organizationId, shopId])\n  @@index([productId])\n}\n\nmodel InventoryTransaction {\n  id             String                   @id @default(cuid())\n  organizationId String\n  shopId         String\n  storageId      String\n  productId      String\n  createdById    String\n  type           InventoryTransactionType\n  quantity       Int\n  note           String?\n  saleId         String?\n  createdAt      DateTime                 @default(now())\n\n  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)\n  shop         Shop         @relation(fields: [shopId], references: [id], onDelete: Cascade)\n  storage      Storage      @relation(fields: [storageId], references: [id], onDelete: Cascade)\n  product      Product      @relation(fields: [productId], references: [id], onDelete: Cascade)\n  createdBy    User         @relation("InventoryTxnCreatedBy", fields: [createdById], references: [id], onDelete: Restrict)\n  sale         Sale?        @relation(fields: [saleId], references: [id], onDelete: SetNull)\n\n  @@index([organizationId, shopId, createdAt])\n  @@index([productId, createdAt])\n  @@index([createdById])\n  @@index([saleId])\n}\n\nmodel Organization {\n  id          String             @id @default(cuid())\n  name        String\n  slug        String             @unique\n  email       String?\n  phone       String?\n  address     String?\n  logo        String?\n  status      OrganizationStatus @default(ACTIVE)\n  isDeleted   Boolean            @default(false)\n  deletedAt   DateTime?\n  createdAt   DateTime           @default(now())\n  updatedAt   DateTime           @updatedAt\n  suspendedAt DateTime?\n\n  members             OrganizationMember[]\n  shops               Shop[]\n  categories          Category[]\n  products            Product[]\n  storages            Storage[]\n  inventories         Inventory[]\n  inventoryTxns       InventoryTransaction[]\n  sales               Sale[]\n  billingPlans        BillingPlan[]\n  subscriptions       OrganizationSubscription[]\n  paymentTransactions PaymentTransaction[]\n  shopAssignments     ShopAssignment[]\n  auditLogs           AuditLog[]\n  returns             SaleReturn[]\n  supportTickets      SupportTicket[]\n}\n\nmodel OrganizationMember {\n  id             String   @id @default(cuid())\n  organizationId String\n  userId         String\n  role           OrgRole\n  isActive       Boolean  @default(true)\n  joinedAt       DateTime @default(now())\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt\n\n  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)\n  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([organizationId, userId])\n  @@index([organizationId, role])\n  @@index([userId])\n}\n\nmodel SalePayment {\n  id            String            @id @default(cuid())\n  saleId        String\n  receivedById  String?\n  amount        Decimal           @db.Decimal(10, 2)\n  paymentMethod SalePaymentMethod\n  note          String?\n  createdAt     DateTime          @default(now())\n  updatedAt     DateTime          @updatedAt\n\n  sale       Sale  @relation(fields: [saleId], references: [id], onDelete: Cascade)\n  receivedBy User? @relation("SalePaymentReceivedBy", fields: [receivedById], references: [id], onDelete: SetNull)\n\n  @@index([saleId])\n  @@index([receivedById])\n  @@index([createdAt])\n}\n\nmodel SaleReturn {\n  id             String           @id @default(cuid())\n  saleId         String\n  organizationId String\n  shopId         String\n  storageId      String\n  returnedById   String\n  refundAmount   Decimal          @db.Decimal(10, 2)\n  status         SaleReturnStatus\n  note           String?\n  createdAt      DateTime         @default(now())\n  updatedAt      DateTime         @updatedAt\n\n  sale         Sale             @relation(fields: [saleId], references: [id], onDelete: Cascade)\n  organization Organization     @relation(fields: [organizationId], references: [id], onDelete: Cascade)\n  shop         Shop             @relation(fields: [shopId], references: [id], onDelete: Cascade)\n  storage      Storage          @relation(fields: [storageId], references: [id], onDelete: Cascade)\n  returnedBy   User             @relation("SaleReturnReturnedBy", fields: [returnedById], references: [id], onDelete: Restrict)\n  items        SaleReturnItem[] @relation("SaleReturnToItems")\n\n  @@index([saleId])\n  @@index([organizationId, createdAt])\n}\n\nmodel SaleReturnItem {\n  id           String   @id @default(cuid())\n  saleReturnId String\n  saleItemId   String\n  productId    String\n  quantity     Int\n  unitPrice    Decimal  @db.Decimal(10, 2)\n  totalPrice   Decimal  @db.Decimal(10, 2)\n  createdAt    DateTime @default(now())\n\n  saleReturn SaleReturn @relation("SaleReturnToItems", fields: [saleReturnId], references: [id], onDelete: Cascade)\n  saleItem   SaleItem   @relation(fields: [saleItemId], references: [id], onDelete: Restrict)\n  product    Product    @relation(fields: [productId], references: [id], onDelete: Restrict)\n\n  @@index([saleReturnId])\n  @@index([saleItemId])\n  @@index([productId])\n}\n\nmodel Sale {\n  id             String            @id @default(cuid())\n  organizationId String\n  shopId         String\n  createdById    String\n  invoiceNo      String\n  subtotal       Decimal           @db.Decimal(10, 2)\n  discount       Decimal           @default(0) @db.Decimal(10, 2)\n  total          Decimal           @db.Decimal(10, 2)\n  paymentMethod  SalePaymentMethod\n  status         SaleStatus        @default(COMPLETED)\n  note           String?\n  paymentStatus  SalePaymentStatus @default(PAID)\n  paidAmount     Decimal           @default(0)\n  dueAmount      Decimal           @default(0)\n  createdAt      DateTime          @default(now())\n  updatedAt      DateTime          @updatedAt\n\n  organization  Organization           @relation(fields: [organizationId], references: [id], onDelete: Cascade)\n  shop          Shop                   @relation(fields: [shopId], references: [id], onDelete: Cascade)\n  createdBy     User                   @relation("SaleCreatedBy", fields: [createdById], references: [id], onDelete: Restrict)\n  items         SaleItem[]\n  inventoryTxns InventoryTransaction[]\n  payments      SalePayment[]\n  returns       SaleReturn[]\n\n  @@unique([organizationId, invoiceNo])\n  @@index([organizationId, shopId, createdAt])\n  @@index([createdById])\n}\n\nmodel SaleItem {\n  id         String   @id @default(cuid())\n  saleId     String\n  productId  String\n  quantity   Int\n  unitPrice  Decimal  @db.Decimal(10, 2)\n  totalPrice Decimal  @db.Decimal(10, 2)\n  createdAt  DateTime @default(now())\n\n  sale            Sale             @relation(fields: [saleId], references: [id], onDelete: Cascade)\n  product         Product          @relation(fields: [productId], references: [id], onDelete: Restrict)\n  saleReturnItems SaleReturnItem[]\n\n  @@index([saleId])\n  @@index([productId])\n}\n\nmodel Shop {\n  id             String     @id @default(cuid())\n  organizationId String\n  name           String\n  slug           String\n  email          String?\n  phone          String?\n  address        String?\n  image          String?\n  status         ShopStatus @default(ACTIVE)\n  isDeleted      Boolean    @default(false)\n  deletedAt      DateTime?\n  createdAt      DateTime   @default(now())\n  updatedAt      DateTime   @updatedAt\n\n  organization  Organization           @relation(fields: [organizationId], references: [id], onDelete: Cascade)\n  assignments   ShopAssignment[]\n  storages      Storage[]\n  inventories   Inventory[]\n  inventoryTxns InventoryTransaction[]\n  sales         Sale[]\n  saleReturns   SaleReturn[]\n\n  @@unique([organizationId, slug])\n  @@index([organizationId])\n}\n\nmodel ShopAssignment {\n  id             String   @id @default(cuid())\n  organizationId String\n  shopId         String\n  userId         String\n  isActive       Boolean  @default(true)\n  assignedAt     DateTime @default(now())\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt\n\n  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)\n  shop         Shop         @relation(fields: [shopId], references: [id], onDelete: Cascade)\n  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([shopId, userId])\n  @@index([organizationId])\n  @@index([userId])\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"AuditLog":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"organizationId","kind":"scalar","type":"String"},{"name":"action","kind":"scalar","type":"String"},{"name":"entityType","kind":"scalar","type":"String"},{"name":"entityId","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"metadata","kind":"scalar","type":"Json"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"AuditLogToUser"},{"name":"organization","kind":"object","type":"Organization","relationName":"AuditLogToOrganization"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"platformRole","kind":"enum","type":"PlatformRole"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"auditLogs","kind":"object","type":"AuditLog","relationName":"AuditLogToUser"},{"name":"organizationMembers","kind":"object","type":"OrganizationMember","relationName":"OrganizationMemberToUser"},{"name":"shopAssignments","kind":"object","type":"ShopAssignment","relationName":"ShopAssignmentToUser"},{"name":"createdSales","kind":"object","type":"Sale","relationName":"SaleCreatedBy"},{"name":"createdInventoryTxns","kind":"object","type":"InventoryTransaction","relationName":"InventoryTxnCreatedBy"},{"name":"createdPayments","kind":"object","type":"PaymentTransaction","relationName":"PaymentCreatedBy"},{"name":"salePaymentsReceived","kind":"object","type":"SalePayment","relationName":"SalePaymentReceivedBy"},{"name":"saleReturns","kind":"object","type":"SaleReturn","relationName":"SaleReturnReturnedBy"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"BillingPlan":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"organizationId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"currency","kind":"scalar","type":"String"},{"name":"interval","kind":"enum","type":"BillingInterval"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"organization","kind":"object","type":"Organization","relationName":"BillingPlanToOrganization"},{"name":"subscriptions","kind":"object","type":"OrganizationSubscription","relationName":"BillingPlanToOrganizationSubscription"}],"dbName":null},"OrganizationSubscription":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"organizationId","kind":"scalar","type":"String"},{"name":"billingPlanId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"SubscriptionStatus"},{"name":"stripeCustomerId","kind":"scalar","type":"String"},{"name":"stripeSubscriptionId","kind":"scalar","type":"String"},{"name":"startsAt","kind":"scalar","type":"DateTime"},{"name":"endsAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"organization","kind":"object","type":"Organization","relationName":"OrganizationToOrganizationSubscription"},{"name":"billingPlan","kind":"object","type":"BillingPlan","relationName":"BillingPlanToOrganizationSubscription"},{"name":"payments","kind":"object","type":"PaymentTransaction","relationName":"OrganizationSubscriptionToPaymentTransaction"}],"dbName":null},"PaymentTransaction":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"organizationId","kind":"scalar","type":"String"},{"name":"subscriptionId","kind":"scalar","type":"String"},{"name":"createdById","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"currency","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"PaymentStatus"},{"name":"stripePaymentIntentId","kind":"scalar","type":"String"},{"name":"stripeClientSecret","kind":"scalar","type":"String"},{"name":"note","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"organization","kind":"object","type":"Organization","relationName":"OrganizationToPaymentTransaction"},{"name":"subscription","kind":"object","type":"OrganizationSubscription","relationName":"OrganizationSubscriptionToPaymentTransaction"},{"name":"createdBy","kind":"object","type":"User","relationName":"PaymentCreatedBy"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"organizationId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"CategoryStatus"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"organization","kind":"object","type":"Organization","relationName":"CategoryToOrganization"},{"name":"products","kind":"object","type":"Product","relationName":"CategoryToProduct"}],"dbName":null},"Product":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"organizationId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"sku","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"ProductStatus"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"organization","kind":"object","type":"Organization","relationName":"OrganizationToProduct"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToProduct"},{"name":"inventories","kind":"object","type":"Inventory","relationName":"InventoryToProduct"},{"name":"inventoryTxns","kind":"object","type":"InventoryTransaction","relationName":"InventoryTransactionToProduct"},{"name":"saleItems","kind":"object","type":"SaleItem","relationName":"ProductToSaleItem"},{"name":"items","kind":"object","type":"SaleReturnItem","relationName":"ProductToSaleReturnItem"}],"dbName":null},"ContactMessage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"company","kind":"scalar","type":"String"},{"name":"message","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"LeadStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"DemoRequest":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"company","kind":"scalar","type":"String"},{"name":"businessType","kind":"scalar","type":"String"},{"name":"teamSize","kind":"scalar","type":"String"},{"name":"preferredDate","kind":"scalar","type":"DateTime"},{"name":"message","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"DemoRequestStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"NewsletterSubscriber":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"SupportTicket":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"organizationId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"subject","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"priority","kind":"enum","type":"SupportTicketPriority"},{"name":"message","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"SupportTicketStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"organization","kind":"object","type":"Organization","relationName":"OrganizationToSupportTicket"}],"dbName":null},"Storage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"organizationId","kind":"scalar","type":"String"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"StorageStatus"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"organization","kind":"object","type":"Organization","relationName":"OrganizationToStorage"},{"name":"shop","kind":"object","type":"Shop","relationName":"ShopToStorage"},{"name":"inventories","kind":"object","type":"Inventory","relationName":"InventoryToStorage"},{"name":"inventoryTxns","kind":"object","type":"InventoryTransaction","relationName":"InventoryTransactionToStorage"},{"name":"returns","kind":"object","type":"SaleReturn","relationName":"SaleReturnToStorage"}],"dbName":null},"Inventory":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"organizationId","kind":"scalar","type":"String"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"storageId","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"lowStockThreshold","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"organization","kind":"object","type":"Organization","relationName":"InventoryToOrganization"},{"name":"shop","kind":"object","type":"Shop","relationName":"InventoryToShop"},{"name":"storage","kind":"object","type":"Storage","relationName":"InventoryToStorage"},{"name":"product","kind":"object","type":"Product","relationName":"InventoryToProduct"}],"dbName":null},"InventoryTransaction":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"organizationId","kind":"scalar","type":"String"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"storageId","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"createdById","kind":"scalar","type":"String"},{"name":"type","kind":"enum","type":"InventoryTransactionType"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"note","kind":"scalar","type":"String"},{"name":"saleId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"organization","kind":"object","type":"Organization","relationName":"InventoryTransactionToOrganization"},{"name":"shop","kind":"object","type":"Shop","relationName":"InventoryTransactionToShop"},{"name":"storage","kind":"object","type":"Storage","relationName":"InventoryTransactionToStorage"},{"name":"product","kind":"object","type":"Product","relationName":"InventoryTransactionToProduct"},{"name":"createdBy","kind":"object","type":"User","relationName":"InventoryTxnCreatedBy"},{"name":"sale","kind":"object","type":"Sale","relationName":"InventoryTransactionToSale"}],"dbName":null},"Organization":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"logo","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrganizationStatus"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"suspendedAt","kind":"scalar","type":"DateTime"},{"name":"members","kind":"object","type":"OrganizationMember","relationName":"OrganizationToOrganizationMember"},{"name":"shops","kind":"object","type":"Shop","relationName":"OrganizationToShop"},{"name":"categories","kind":"object","type":"Category","relationName":"CategoryToOrganization"},{"name":"products","kind":"object","type":"Product","relationName":"OrganizationToProduct"},{"name":"storages","kind":"object","type":"Storage","relationName":"OrganizationToStorage"},{"name":"inventories","kind":"object","type":"Inventory","relationName":"InventoryToOrganization"},{"name":"inventoryTxns","kind":"object","type":"InventoryTransaction","relationName":"InventoryTransactionToOrganization"},{"name":"sales","kind":"object","type":"Sale","relationName":"OrganizationToSale"},{"name":"billingPlans","kind":"object","type":"BillingPlan","relationName":"BillingPlanToOrganization"},{"name":"subscriptions","kind":"object","type":"OrganizationSubscription","relationName":"OrganizationToOrganizationSubscription"},{"name":"paymentTransactions","kind":"object","type":"PaymentTransaction","relationName":"OrganizationToPaymentTransaction"},{"name":"shopAssignments","kind":"object","type":"ShopAssignment","relationName":"OrganizationToShopAssignment"},{"name":"auditLogs","kind":"object","type":"AuditLog","relationName":"AuditLogToOrganization"},{"name":"returns","kind":"object","type":"SaleReturn","relationName":"OrganizationToSaleReturn"},{"name":"supportTickets","kind":"object","type":"SupportTicket","relationName":"OrganizationToSupportTicket"}],"dbName":null},"OrganizationMember":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"organizationId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"OrgRole"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"joinedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"organization","kind":"object","type":"Organization","relationName":"OrganizationToOrganizationMember"},{"name":"user","kind":"object","type":"User","relationName":"OrganizationMemberToUser"}],"dbName":null},"SalePayment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"saleId","kind":"scalar","type":"String"},{"name":"receivedById","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"paymentMethod","kind":"enum","type":"SalePaymentMethod"},{"name":"note","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sale","kind":"object","type":"Sale","relationName":"SaleToSalePayment"},{"name":"receivedBy","kind":"object","type":"User","relationName":"SalePaymentReceivedBy"}],"dbName":null},"SaleReturn":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"saleId","kind":"scalar","type":"String"},{"name":"organizationId","kind":"scalar","type":"String"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"storageId","kind":"scalar","type":"String"},{"name":"returnedById","kind":"scalar","type":"String"},{"name":"refundAmount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"SaleReturnStatus"},{"name":"note","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sale","kind":"object","type":"Sale","relationName":"SaleToSaleReturn"},{"name":"organization","kind":"object","type":"Organization","relationName":"OrganizationToSaleReturn"},{"name":"shop","kind":"object","type":"Shop","relationName":"SaleReturnToShop"},{"name":"storage","kind":"object","type":"Storage","relationName":"SaleReturnToStorage"},{"name":"returnedBy","kind":"object","type":"User","relationName":"SaleReturnReturnedBy"},{"name":"items","kind":"object","type":"SaleReturnItem","relationName":"SaleReturnToItems"}],"dbName":null},"SaleReturnItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"saleReturnId","kind":"scalar","type":"String"},{"name":"saleItemId","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"unitPrice","kind":"scalar","type":"Decimal"},{"name":"totalPrice","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"saleReturn","kind":"object","type":"SaleReturn","relationName":"SaleReturnToItems"},{"name":"saleItem","kind":"object","type":"SaleItem","relationName":"SaleItemToSaleReturnItem"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToSaleReturnItem"}],"dbName":null},"Sale":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"organizationId","kind":"scalar","type":"String"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"createdById","kind":"scalar","type":"String"},{"name":"invoiceNo","kind":"scalar","type":"String"},{"name":"subtotal","kind":"scalar","type":"Decimal"},{"name":"discount","kind":"scalar","type":"Decimal"},{"name":"total","kind":"scalar","type":"Decimal"},{"name":"paymentMethod","kind":"enum","type":"SalePaymentMethod"},{"name":"status","kind":"enum","type":"SaleStatus"},{"name":"note","kind":"scalar","type":"String"},{"name":"paymentStatus","kind":"enum","type":"SalePaymentStatus"},{"name":"paidAmount","kind":"scalar","type":"Decimal"},{"name":"dueAmount","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"organization","kind":"object","type":"Organization","relationName":"OrganizationToSale"},{"name":"shop","kind":"object","type":"Shop","relationName":"SaleToShop"},{"name":"createdBy","kind":"object","type":"User","relationName":"SaleCreatedBy"},{"name":"items","kind":"object","type":"SaleItem","relationName":"SaleToSaleItem"},{"name":"inventoryTxns","kind":"object","type":"InventoryTransaction","relationName":"InventoryTransactionToSale"},{"name":"payments","kind":"object","type":"SalePayment","relationName":"SaleToSalePayment"},{"name":"returns","kind":"object","type":"SaleReturn","relationName":"SaleToSaleReturn"}],"dbName":null},"SaleItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"saleId","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"unitPrice","kind":"scalar","type":"Decimal"},{"name":"totalPrice","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"sale","kind":"object","type":"Sale","relationName":"SaleToSaleItem"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToSaleItem"},{"name":"saleReturnItems","kind":"object","type":"SaleReturnItem","relationName":"SaleItemToSaleReturnItem"}],"dbName":null},"Shop":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"organizationId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"ShopStatus"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"organization","kind":"object","type":"Organization","relationName":"OrganizationToShop"},{"name":"assignments","kind":"object","type":"ShopAssignment","relationName":"ShopToShopAssignment"},{"name":"storages","kind":"object","type":"Storage","relationName":"ShopToStorage"},{"name":"inventories","kind":"object","type":"Inventory","relationName":"InventoryToShop"},{"name":"inventoryTxns","kind":"object","type":"InventoryTransaction","relationName":"InventoryTransactionToShop"},{"name":"sales","kind":"object","type":"Sale","relationName":"SaleToShop"},{"name":"saleReturns","kind":"object","type":"SaleReturn","relationName":"SaleReturnToShop"}],"dbName":null},"ShopAssignment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"organizationId","kind":"scalar","type":"String"},{"name":"shopId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"assignedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"organization","kind":"object","type":"Organization","relationName":"OrganizationToShopAssignment"},{"name":"shop","kind":"object","type":"Shop","relationName":"ShopToShopAssignment"},{"name":"user","kind":"object","type":"User","relationName":"ShopAssignmentToUser"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","sessions","accounts","auditLogs","members","organization","shop","assignments","storage","products","_count","category","inventories","product","createdBy","sale","returnedBy","items","saleReturn","saleItem","saleReturnItems","inventoryTxns","receivedBy","payments","returns","saleItems","storages","sales","saleReturns","shops","categories","billingPlan","subscription","subscriptions","billingPlans","paymentTransactions","shopAssignments","supportTickets","organizationMembers","createdSales","createdInventoryTxns","createdPayments","salePaymentsReceived","AuditLog.findUnique","AuditLog.findUniqueOrThrow","AuditLog.findFirst","AuditLog.findFirstOrThrow","AuditLog.findMany","data","AuditLog.createOne","AuditLog.createMany","AuditLog.createManyAndReturn","AuditLog.updateOne","AuditLog.updateMany","AuditLog.updateManyAndReturn","create","update","AuditLog.upsertOne","AuditLog.deleteOne","AuditLog.deleteMany","having","_min","_max","AuditLog.groupBy","AuditLog.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","BillingPlan.findUnique","BillingPlan.findUniqueOrThrow","BillingPlan.findFirst","BillingPlan.findFirstOrThrow","BillingPlan.findMany","BillingPlan.createOne","BillingPlan.createMany","BillingPlan.createManyAndReturn","BillingPlan.updateOne","BillingPlan.updateMany","BillingPlan.updateManyAndReturn","BillingPlan.upsertOne","BillingPlan.deleteOne","BillingPlan.deleteMany","_avg","_sum","BillingPlan.groupBy","BillingPlan.aggregate","OrganizationSubscription.findUnique","OrganizationSubscription.findUniqueOrThrow","OrganizationSubscription.findFirst","OrganizationSubscription.findFirstOrThrow","OrganizationSubscription.findMany","OrganizationSubscription.createOne","OrganizationSubscription.createMany","OrganizationSubscription.createManyAndReturn","OrganizationSubscription.updateOne","OrganizationSubscription.updateMany","OrganizationSubscription.updateManyAndReturn","OrganizationSubscription.upsertOne","OrganizationSubscription.deleteOne","OrganizationSubscription.deleteMany","OrganizationSubscription.groupBy","OrganizationSubscription.aggregate","PaymentTransaction.findUnique","PaymentTransaction.findUniqueOrThrow","PaymentTransaction.findFirst","PaymentTransaction.findFirstOrThrow","PaymentTransaction.findMany","PaymentTransaction.createOne","PaymentTransaction.createMany","PaymentTransaction.createManyAndReturn","PaymentTransaction.updateOne","PaymentTransaction.updateMany","PaymentTransaction.updateManyAndReturn","PaymentTransaction.upsertOne","PaymentTransaction.deleteOne","PaymentTransaction.deleteMany","PaymentTransaction.groupBy","PaymentTransaction.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Product.findUnique","Product.findUniqueOrThrow","Product.findFirst","Product.findFirstOrThrow","Product.findMany","Product.createOne","Product.createMany","Product.createManyAndReturn","Product.updateOne","Product.updateMany","Product.updateManyAndReturn","Product.upsertOne","Product.deleteOne","Product.deleteMany","Product.groupBy","Product.aggregate","ContactMessage.findUnique","ContactMessage.findUniqueOrThrow","ContactMessage.findFirst","ContactMessage.findFirstOrThrow","ContactMessage.findMany","ContactMessage.createOne","ContactMessage.createMany","ContactMessage.createManyAndReturn","ContactMessage.updateOne","ContactMessage.updateMany","ContactMessage.updateManyAndReturn","ContactMessage.upsertOne","ContactMessage.deleteOne","ContactMessage.deleteMany","ContactMessage.groupBy","ContactMessage.aggregate","DemoRequest.findUnique","DemoRequest.findUniqueOrThrow","DemoRequest.findFirst","DemoRequest.findFirstOrThrow","DemoRequest.findMany","DemoRequest.createOne","DemoRequest.createMany","DemoRequest.createManyAndReturn","DemoRequest.updateOne","DemoRequest.updateMany","DemoRequest.updateManyAndReturn","DemoRequest.upsertOne","DemoRequest.deleteOne","DemoRequest.deleteMany","DemoRequest.groupBy","DemoRequest.aggregate","NewsletterSubscriber.findUnique","NewsletterSubscriber.findUniqueOrThrow","NewsletterSubscriber.findFirst","NewsletterSubscriber.findFirstOrThrow","NewsletterSubscriber.findMany","NewsletterSubscriber.createOne","NewsletterSubscriber.createMany","NewsletterSubscriber.createManyAndReturn","NewsletterSubscriber.updateOne","NewsletterSubscriber.updateMany","NewsletterSubscriber.updateManyAndReturn","NewsletterSubscriber.upsertOne","NewsletterSubscriber.deleteOne","NewsletterSubscriber.deleteMany","NewsletterSubscriber.groupBy","NewsletterSubscriber.aggregate","SupportTicket.findUnique","SupportTicket.findUniqueOrThrow","SupportTicket.findFirst","SupportTicket.findFirstOrThrow","SupportTicket.findMany","SupportTicket.createOne","SupportTicket.createMany","SupportTicket.createManyAndReturn","SupportTicket.updateOne","SupportTicket.updateMany","SupportTicket.updateManyAndReturn","SupportTicket.upsertOne","SupportTicket.deleteOne","SupportTicket.deleteMany","SupportTicket.groupBy","SupportTicket.aggregate","Storage.findUnique","Storage.findUniqueOrThrow","Storage.findFirst","Storage.findFirstOrThrow","Storage.findMany","Storage.createOne","Storage.createMany","Storage.createManyAndReturn","Storage.updateOne","Storage.updateMany","Storage.updateManyAndReturn","Storage.upsertOne","Storage.deleteOne","Storage.deleteMany","Storage.groupBy","Storage.aggregate","Inventory.findUnique","Inventory.findUniqueOrThrow","Inventory.findFirst","Inventory.findFirstOrThrow","Inventory.findMany","Inventory.createOne","Inventory.createMany","Inventory.createManyAndReturn","Inventory.updateOne","Inventory.updateMany","Inventory.updateManyAndReturn","Inventory.upsertOne","Inventory.deleteOne","Inventory.deleteMany","Inventory.groupBy","Inventory.aggregate","InventoryTransaction.findUnique","InventoryTransaction.findUniqueOrThrow","InventoryTransaction.findFirst","InventoryTransaction.findFirstOrThrow","InventoryTransaction.findMany","InventoryTransaction.createOne","InventoryTransaction.createMany","InventoryTransaction.createManyAndReturn","InventoryTransaction.updateOne","InventoryTransaction.updateMany","InventoryTransaction.updateManyAndReturn","InventoryTransaction.upsertOne","InventoryTransaction.deleteOne","InventoryTransaction.deleteMany","InventoryTransaction.groupBy","InventoryTransaction.aggregate","Organization.findUnique","Organization.findUniqueOrThrow","Organization.findFirst","Organization.findFirstOrThrow","Organization.findMany","Organization.createOne","Organization.createMany","Organization.createManyAndReturn","Organization.updateOne","Organization.updateMany","Organization.updateManyAndReturn","Organization.upsertOne","Organization.deleteOne","Organization.deleteMany","Organization.groupBy","Organization.aggregate","OrganizationMember.findUnique","OrganizationMember.findUniqueOrThrow","OrganizationMember.findFirst","OrganizationMember.findFirstOrThrow","OrganizationMember.findMany","OrganizationMember.createOne","OrganizationMember.createMany","OrganizationMember.createManyAndReturn","OrganizationMember.updateOne","OrganizationMember.updateMany","OrganizationMember.updateManyAndReturn","OrganizationMember.upsertOne","OrganizationMember.deleteOne","OrganizationMember.deleteMany","OrganizationMember.groupBy","OrganizationMember.aggregate","SalePayment.findUnique","SalePayment.findUniqueOrThrow","SalePayment.findFirst","SalePayment.findFirstOrThrow","SalePayment.findMany","SalePayment.createOne","SalePayment.createMany","SalePayment.createManyAndReturn","SalePayment.updateOne","SalePayment.updateMany","SalePayment.updateManyAndReturn","SalePayment.upsertOne","SalePayment.deleteOne","SalePayment.deleteMany","SalePayment.groupBy","SalePayment.aggregate","SaleReturn.findUnique","SaleReturn.findUniqueOrThrow","SaleReturn.findFirst","SaleReturn.findFirstOrThrow","SaleReturn.findMany","SaleReturn.createOne","SaleReturn.createMany","SaleReturn.createManyAndReturn","SaleReturn.updateOne","SaleReturn.updateMany","SaleReturn.updateManyAndReturn","SaleReturn.upsertOne","SaleReturn.deleteOne","SaleReturn.deleteMany","SaleReturn.groupBy","SaleReturn.aggregate","SaleReturnItem.findUnique","SaleReturnItem.findUniqueOrThrow","SaleReturnItem.findFirst","SaleReturnItem.findFirstOrThrow","SaleReturnItem.findMany","SaleReturnItem.createOne","SaleReturnItem.createMany","SaleReturnItem.createManyAndReturn","SaleReturnItem.updateOne","SaleReturnItem.updateMany","SaleReturnItem.updateManyAndReturn","SaleReturnItem.upsertOne","SaleReturnItem.deleteOne","SaleReturnItem.deleteMany","SaleReturnItem.groupBy","SaleReturnItem.aggregate","Sale.findUnique","Sale.findUniqueOrThrow","Sale.findFirst","Sale.findFirstOrThrow","Sale.findMany","Sale.createOne","Sale.createMany","Sale.createManyAndReturn","Sale.updateOne","Sale.updateMany","Sale.updateManyAndReturn","Sale.upsertOne","Sale.deleteOne","Sale.deleteMany","Sale.groupBy","Sale.aggregate","SaleItem.findUnique","SaleItem.findUniqueOrThrow","SaleItem.findFirst","SaleItem.findFirstOrThrow","SaleItem.findMany","SaleItem.createOne","SaleItem.createMany","SaleItem.createManyAndReturn","SaleItem.updateOne","SaleItem.updateMany","SaleItem.updateManyAndReturn","SaleItem.upsertOne","SaleItem.deleteOne","SaleItem.deleteMany","SaleItem.groupBy","SaleItem.aggregate","Shop.findUnique","Shop.findUniqueOrThrow","Shop.findFirst","Shop.findFirstOrThrow","Shop.findMany","Shop.createOne","Shop.createMany","Shop.createManyAndReturn","Shop.updateOne","Shop.updateMany","Shop.updateManyAndReturn","Shop.upsertOne","Shop.deleteOne","Shop.deleteMany","Shop.groupBy","Shop.aggregate","ShopAssignment.findUnique","ShopAssignment.findUniqueOrThrow","ShopAssignment.findFirst","ShopAssignment.findFirstOrThrow","ShopAssignment.findMany","ShopAssignment.createOne","ShopAssignment.createMany","ShopAssignment.createManyAndReturn","ShopAssignment.updateOne","ShopAssignment.updateMany","ShopAssignment.updateManyAndReturn","ShopAssignment.upsertOne","ShopAssignment.deleteOne","ShopAssignment.deleteMany","ShopAssignment.groupBy","ShopAssignment.aggregate","AND","OR","NOT","id","organizationId","shopId","userId","isActive","assignedAt","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","name","slug","email","phone","address","image","ShopStatus","status","isDeleted","deletedAt","saleId","productId","quantity","unitPrice","totalPrice","createdById","invoiceNo","subtotal","discount","total","SalePaymentMethod","paymentMethod","SaleStatus","note","SalePaymentStatus","paymentStatus","paidAmount","dueAmount","saleReturnId","saleItemId","storageId","returnedById","refundAmount","SaleReturnStatus","receivedById","amount","OrgRole","role","joinedAt","logo","OrganizationStatus","suspendedAt","every","some","none","InventoryTransactionType","type","lowStockThreshold","description","StorageStatus","subject","SupportTicketPriority","priority","message","SupportTicketStatus","company","businessType","teamSize","preferredDate","DemoRequestStatus","LeadStatus","categoryId","sku","price","ProductStatus","CategoryStatus","subscriptionId","currency","PaymentStatus","stripePaymentIntentId","stripeClientSecret","billingPlanId","SubscriptionStatus","stripeCustomerId","stripeSubscriptionId","startsAt","endsAt","BillingInterval","interval","identifier","value","expiresAt","accountId","providerId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","emailVerified","UserStatus","PlatformRole","platformRole","action","entityType","entityId","metadata","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","organizationId_slug","organizationId_invoiceNo","organizationId_sku","shopId_storageId_productId","shopId_name","shopId_userId","organizationId_userId","providerId_accountId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "pxDwAaADDgMAAJsHACAIAACVBwAg1gMAAM0HADDXAwAADQAQ2AMAAM0HADDZAwEAAAAB2gMBALgGACHcAwEAuAYAId8DQAC8BgAhnAQBALgGACHOBAEAtwYAIc8EAQC3BgAh0AQBALgGACHRBAAAzgcAIAEAAAABACAZBAAAjAcAIAUAAI0HACAGAADJBgAgHwAAygYAICcAAMgGACApAAC9BgAgKgAAxAYAICsAAMMGACAsAADHBgAgLQAAjgcAINYDAACJBwAw1wMAAAMAENgDAACJBwAw2QMBALcGACHfA0AAvAYAIeADQAC8BgAh7AMBALcGACHuAwEAtwYAIe8DAQC4BgAh8QMBALgGACHzAwAAigfMBCL0AyAAugYAIfUDQAC7BgAhygQgALoGACHNBAAAiwfNBCMBAAAAAwAgDAMAAKoHACDWAwAA0QcAMNcDAAAFABDYAwAA0QcAMNkDAQC3BgAh3AMBALcGACHfA0AAvAYAIeADQAC8BgAhvQRAALwGACHHBAEAtwYAIcgEAQC4BgAhyQQBALgGACEDAwAAgw4AIMgEAADeBwAgyQQAAN4HACAMAwAAqgcAINYDAADRBwAw1wMAAAUAENgDAADRBwAw2QMBAAAAAdwDAQC3BgAh3wNAALwGACHgA0AAvAYAIb0EQAC8BgAhxwQBAAAAAcgEAQC4BgAhyQQBALgGACEDAAAABQAgAQAABgAwAgAABwAgEQMAAKoHACDWAwAA0AcAMNcDAAAJABDYAwAA0AcAMNkDAQC3BgAh3AMBALcGACHfA0AAvAYAIeADQAC8BgAhvgQBALcGACG_BAEAtwYAIcAEAQC4BgAhwQQBALgGACHCBAEAuAYAIcMEQAC7BgAhxARAALsGACHFBAEAuAYAIcYEAQC4BgAhCAMAAIMOACDABAAA3gcAIMEEAADeBwAgwgQAAN4HACDDBAAA3gcAIMQEAADeBwAgxQQAAN4HACDGBAAA3gcAIBIDAACqBwAg1gMAANAHADDXAwAACQAQ2AMAANAHADDZAwEAAAAB3AMBALcGACHfA0AAvAYAIeADQAC8BgAhvgQBALcGACG_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_QMQAJcHACH-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_AMBALcGACH9AxAAlwcAIf4DEACXBwAh_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_g0AIEAAAIAOACBBAAD_DQAg2gMAAN4HACDcAwAA3gcAIJwEAADeBwAg0AQAAN4HACDRBAAA3gcAIAzWAwAAjwcAMNcDAAC8AQAQ2AMAAI8HADDZAwEAggYAIdoDAQCNBgAh3AMBAI0GACHfA0AAhAYAIZwEAQCNBgAhzgQBAIIGACHPBAEAggYAIdAEAQCNBgAh0QQAAJAHACADAAAADQAgAQAAuwEAMD8AALwBACADAAAADQAgAQAADgAwAgAAAQAgGQQAAIwHACAFAACNBwAgBgAAyQYAIB8AAMoGACAnAADIBgAgKQAAvQYAICoAAMQGACArAADDBgAgLAAAxwYAIC0AAI4HACDWAwAAiQcAMNcDAAADABDYAwAAiQcAMNkDAQAAAAHfA0AAvAYAIeADQAC8BgAh7AMBALcGACHuAwEAAAAB7wMBALgGACHxAwEAuAYAIfMDAACKB8wEIvQDIAC6BgAh9QNAALsGACHKBCAAugYAIc0EAACLB80EIwEAAAC_AQAgAQAAAL8BACAOBAAA-w0AIAUAAPwNACAGAAC6DAAgHwAAuwwAICcAALkMACApAACuDAAgKgAAtQwAICsAALQMACAsAAC4DAAgLQAA_Q0AIO8DAADeBwAg8QMAAN4HACD1AwAA3gcAIM0EAADeBwAgAwAAAAMAIAEAAMIBADACAAC_AQAgAwAAAAMAIAEAAMIBADACAAC_AQAgAwAAAAMAIAEAAMIBADACAAC_AQAgFgQAAPENACAFAADyDQAgBgAA8w0AIB8AAPoNACAnAAD1DQAgKQAA9A0AICoAAPYNACArAAD3DQAgLAAA-A0AIC0AAPkNACDZAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7gMBAAAAAe8DAQAAAAHxAwEAAAAB8wMAAADMBAL0AyAAAAAB9QNAAAAAAcoEIAAAAAHNBAAAAM0EAwEzAADGAQAgDNkDAQAAAAHfA0AAAAAB4ANAAAAAAewDAQAAAAHuAwEAAAAB7wMBAAAAAfEDAQAAAAHzAwAAAMwEAvQDIAAAAAH1A0AAAAABygQgAAAAAc0EAAAAzQQDATMAAMgBADABMwAAyAEAMBYEAACFDQAgBQAAhg0AIAYAAIcNACAfAACODQAgJwAAiQ0AICkAAIgNACAqAACKDQAgKwAAiw0AICwAAIwNACAtAACNDQAg2QMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHuAwEA1QcAIe8DAQDiBwAh8QMBAOIHACHzAwAAgw3MBCL0AyAA1gcAIfUDQADkBwAhygQgANYHACHNBAAAhA3NBCMCAAAAvwEAIDMAAMsBACAM2QMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHuAwEA1QcAIe8DAQDiBwAh8QMBAOIHACHzAwAAgw3MBCL0AyAA1gcAIfUDQADkBwAhygQgANYHACHNBAAAhA3NBCMCAAAAAwAgMwAAzQEAIAIAAAADACAzAADNAQAgAwAAAL8BACA6AADGAQAgOwAAywEAIAEAAAC_AQAgAQAAAAMAIAcNAACADQAgQAAAgg0AIEEAAIENACDvAwAA3gcAIPEDAADeBwAg9QMAAN4HACDNBAAA3gcAIA_WAwAAggcAMNcDAADUAQAQ2AMAAIIHADDZAwEAggYAId8DQACEBgAh4ANAAIQGACHsAwEAggYAIe4DAQCCBgAh7wMBAI0GACHxAwEAjQYAIfMDAACDB8wEIvQDIACDBgAh9QNAAI8GACHKBCAAgwYAIc0EAACEB80EIwMAAAADACABAADTAQAwPwAA1AEAIAMAAAADACABAADCAQAwAgAAvwEAIAEAAAAHACABAAAABwAgAwAAAAUAIAEAAAYAMAIAAAcAIAMAAAAFACABAAAGADACAAAHACADAAAABQAgAQAABgAwAgAABwAgCQMAAP8MACDZAwEAAAAB3AMBAAAAAd8DQAAAAAHgA0AAAAABvQRAAAAAAccEAQAAAAHIBAEAAAAByQQBAAAAAQEzAADcAQAgCNkDAQAAAAHcAwEAAAAB3wNAAAAAAeADQAAAAAG9BEAAAAABxwQBAAAAAcgEAQAAAAHJBAEAAAABATMAAN4BADABMwAA3gEAMAkDAAD-DAAg2QMBANUHACHcAwEA1QcAId8DQADXBwAh4ANAANcHACG9BEAA1wcAIccEAQDVBwAhyAQBAOIHACHJBAEA4gcAIQIAAAAHACAzAADhAQAgCNkDAQDVBwAh3AMBANUHACHfA0AA1wcAIeADQADXBwAhvQRAANcHACHHBAEA1QcAIcgEAQDiBwAhyQQBAOIHACECAAAABQAgMwAA4wEAIAIAAAAFACAzAADjAQAgAwAAAAcAIDoAANwBACA7AADhAQAgAQAAAAcAIAEAAAAFACAFDQAA-wwAIEAAAP0MACBBAAD8DAAgyAQAAN4HACDJBAAA3gcAIAvWAwAAgQcAMNcDAADqAQAQ2AMAAIEHADDZAwEAggYAIdwDAQCCBgAh3wNAAIQGACHgA0AAhAYAIb0EQACEBgAhxwQBAIIGACHIBAEAjQYAIckEAQCNBgAhAwAAAAUAIAEAAOkBADA_AADqAQAgAwAAAAUAIAEAAAYAMAIAAAcAIAEAAAALACABAAAACwAgAwAAAAkAIAEAAAoAMAIAAAsAIAMAAAAJACABAAAKADACAAALACADAAAACQAgAQAACgAwAgAACwAgDgMAAPoMACDZAwEAAAAB3AMBAAAAAd8DQAAAAAHgA0AAAAABvgQBAAAAAb8EAQAAAAHABAEAAAABwQQBAAAAAcIEAQAAAAHDBEAAAAABxARAAAAAAcUEAQAAAAHGBAEAAAABATMAAPIBACAN2QMBAAAAAdwDAQAAAAHfA0AAAAAB4ANAAAAAAb4EAQAAAAG_BAEAAAABwAQBAAAAAcEEAQAAAAHCBAEAAAABwwRAAAAAAcQEQAAAAAHFBAEAAAABxgQBAAAAAQEzAAD0AQAwATMAAPQBADAOAwAA-QwAINkDAQDVBwAh3AMBANUHACHfA0AA1wcAIeADQADXBwAhvgQBANUHACG_BAEA1QcAIcAEAQDiBwAhwQQBAOIHACHCBAEA4gcAIcMEQADkBwAhxARAAOQHACHFBAEA4gcAIcYEAQDiBwAhAgAAAAsAIDMAAPcBACAN2QMBANUHACHcAwEA1QcAId8DQADXBwAh4ANAANcHACG-BAEA1QcAIb8EAQDVBwAhwAQBAOIHACHBBAEA4gcAIcIEAQDiBwAhwwRAAOQHACHEBEAA5AcAIcUEAQDiBwAhxgQBAOIHACECAAAACQAgMwAA-QEAIAIAAAAJACAzAAD5AQAgAwAAAAsAIDoAAPIBACA7AAD3AQAgAQAAAAsAIAEAAAAJACAKDQAA9gwAIEAAAPgMACBBAAD3DAAgwAQAAN4HACDBBAAA3gcAIMIEAADeBwAgwwQAAN4HACDEBAAA3gcAIMUEAADeBwAgxgQAAN4HACAQ1gMAAIAHADDXAwAAgAIAENgDAACABwAw2QMBAIIGACHcAwEAggYAId8DQACEBgAh4ANAAIQGACG-BAEAggYAIb8EAQCCBgAhwAQBAI0GACHBBAEAjQYAIcIEAQCNBgAhwwRAAI8GACHEBEAAjwYAIcUEAQCNBgAhxgQBAI0GACEDAAAACQAgAQAA_wEAMD8AAIACACADAAAACQAgAQAACgAwAgAACwAgCdYDAAD_BgAw1wMAAIYCABDYAwAA_wYAMNkDAQAAAAHfA0AAvAYAIeADQAC8BgAhuwQBALcGACG8BAEAtwYAIb0EQAC8BgAhAQAAAIMCACABAAAAgwIAIAnWAwAA_wYAMNcDAACGAgAQ2AMAAP8GADDZAwEAtwYAId8DQAC8BgAh4ANAALwGACG7BAEAtwYAIbwEAQC3BgAhvQRAALwGACEAAwAAAIYCACABAACHAgAwAgAAgwIAIAMAAACGAgAgAQAAhwIAMAIAAIMCACADAAAAhgIAIAEAAIcCADACAACDAgAgBtkDAQAAAAHfA0AAAAAB4ANAAAAAAbsEAQAAAAG8BAEAAAABvQRAAAAAAQEzAACLAgAgBtkDAQAAAAHfA0AAAAAB4ANAAAAAAbsEAQAAAAG8BAEAAAABvQRAAAAAAQEzAACNAgAwATMAAI0CADAG2QMBANUHACHfA0AA1wcAIeADQADXBwAhuwQBANUHACG8BAEA1QcAIb0EQADXBwAhAgAAAIMCACAzAACQAgAgBtkDAQDVBwAh3wNAANcHACHgA0AA1wcAIbsEAQDVBwAhvAQBANUHACG9BEAA1wcAIQIAAACGAgAgMwAAkgIAIAIAAACGAgAgMwAAkgIAIAMAAACDAgAgOgAAiwIAIDsAAJACACABAAAAgwIAIAEAAACGAgAgAw0AAPMMACBAAAD1DAAgQQAA9AwAIAnWAwAA_gYAMNcDAACZAgAQ2AMAAP4GADDZAwEAggYAId8DQACEBgAh4ANAAIQGACG7BAEAggYAIbwEAQCCBgAhvQRAAIQGACEDAAAAhgIAIAEAAJgCADA_AACZAgAgAwAAAIYCACABAACHAgAwAgAAgwIAIAEAAABsACABAAAAbAAgAwAAAGoAIAEAAGsAMAIAAGwAIAMAAABqACABAABrADACAABsACADAAAAagAgAQAAawAwAgAAbAAgDQgAAPIMACAkAACLCwAg2QMBAAAAAdoDAQAAAAHdAyAAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7QMBAAAAAY8EEAAAAAGcBAEAAAABrwQBAAAAAboEAAAAugQCATMAAKECACAL2QMBAAAAAdoDAQAAAAHdAyAAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7QMBAAAAAY8EEAAAAAGcBAEAAAABrwQBAAAAAboEAAAAugQCATMAAKMCADABMwAAowIAMAEAAABuACANCAAA8QwAICQAAP4KACDZAwEA1QcAIdoDAQDiBwAh3QMgANYHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHtAwEA1QcAIY8EEAD2BwAhnAQBAOIHACGvBAEA1QcAIboEAAD8CroEIgIAAABsACAzAACnAgAgC9kDAQDVBwAh2gMBAOIHACHdAyAA1gcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIe0DAQDVBwAhjwQQAPYHACGcBAEA4gcAIa8EAQDVBwAhugQAAPwKugQiAgAAAGoAIDMAAKkCACACAAAAagAgMwAAqQIAIAEAAABuACADAAAAbAAgOgAAoQIAIDsAAKcCACABAAAAbAAgAQAAAGoAIAcNAADsDAAgQAAA7wwAIEEAAO4MACCSAQAA7QwAIJMBAADwDAAg2gMAAN4HACCcBAAA3gcAIA7WAwAA-gYAMNcDAACxAgAQ2AMAAPoGADDZAwEAggYAIdoDAQCNBgAh3QMgAIMGACHfA0AAhAYAIeADQACEBgAh7AMBAIIGACHtAwEAggYAIY8EEACZBgAhnAQBAI0GACGvBAEAggYAIboEAAD7BroEIgMAAABqACABAACwAgAwPwAAsQIAIAMAAABqACABAABrADACAABsACABAAAAcgAgAQAAAHIAIAMAAABwACABAABxADACAAByACADAAAAcAAgAQAAcQAwAgAAcgAgAwAAAHAAIAEAAHEAMAIAAHIAIA0IAACJCwAgGgAA8QoAICIAAPAKACDZAwEAAAAB2gMBAAAAAd8DQAAAAAHgA0AAAAAB8wMAAAC1BAKzBAEAAAABtQQBAAAAAbYEAQAAAAG3BEAAAAABuARAAAAAAQEzAAC5AgAgCtkDAQAAAAHaAwEAAAAB3wNAAAAAAeADQAAAAAHzAwAAALUEArMEAQAAAAG1BAEAAAABtgQBAAAAAbcEQAAAAAG4BEAAAAABATMAALsCADABMwAAuwIAMA0IAACHCwAgGgAA4woAICIAAOIKACDZAwEA1QcAIdoDAQDVBwAh3wNAANcHACHgA0AA1wcAIfMDAADgCrUEIrMEAQDVBwAhtQQBAOIHACG2BAEA4gcAIbcEQADkBwAhuARAAOQHACECAAAAcgAgMwAAvgIAIArZAwEA1QcAIdoDAQDVBwAh3wNAANcHACHgA0AA1wcAIfMDAADgCrUEIrMEAQDVBwAhtQQBAOIHACG2BAEA4gcAIbcEQADkBwAhuARAAOQHACECAAAAcAAgMwAAwAIAIAIAAABwACAzAADAAgAgAwAAAHIAIDoAALkCACA7AAC-AgAgAQAAAHIAIAEAAABwACAHDQAA6QwAIEAAAOsMACBBAADqDAAgtQQAAN4HACC2BAAA3gcAILcEAADeBwAguAQAAN4HACAN1gMAAPYGADDXAwAAxwIAENgDAAD2BgAw2QMBAIIGACHaAwEAggYAId8DQACEBgAh4ANAAIQGACHzAwAA9wa1BCKzBAEAggYAIbUEAQCNBgAhtgQBAI0GACG3BEAAjwYAIbgEQACPBgAhAwAAAHAAIAEAAMYCADA_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_AAD3AgAgAwAAAGEAIAEAAGIAMAIAAGMAIAEAAAAnACABAAAAJwAgAwAAACUAIAEAACYAMAIAACcAIAMAAAAlACABAAAmADACAAAnACADAAAAJQAgAQAAJgAwAgAAJwAgFAgAAIQMACAOAADoCwAgDwAA6QsAIBQAAOwLACAYAADqCwAgHAAA6wsAINkDAQAAAAHaAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7QMBAAAAAfEDAQAAAAHzAwAAAK0EAvQDIAAAAAH1A0AAAAABnAQBAAAAAakEAQAAAAGqBAEAAAABqwQQAAAAAQEzAAD_AgAgDtkDAQAAAAHaAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7QMBAAAAAfEDAQAAAAHzAwAAAK0EAvQDIAAAAAH1A0AAAAABnAQBAAAAAakEAQAAAAGqBAEAAAABqwQQAAAAAQEzAACBAwAwATMAAIEDADAUCAAAggwAIA4AAL4LACAPAAC_CwAgFAAAwgsAIBgAAMALACAcAADBCwAg2QMBANUHACHaAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIe0DAQDVBwAh8QMBAOIHACHzAwAAvAutBCL0AyAA1gcAIfUDQADkBwAhnAQBAOIHACGpBAEA1QcAIaoEAQDVBwAhqwQQAPYHACECAAAAJwAgMwAAhAMAIA7ZAwEA1QcAIdoDAQDVBwAh3wNAANcHACHgA0AA1wcAIewDAQDVBwAh7QMBANUHACHxAwEA4gcAIfMDAAC8C60EIvQDIADWBwAh9QNAAOQHACGcBAEA4gcAIakEAQDVBwAhqgQBANUHACGrBBAA9gcAIQIAAAAlACAzAACGAwAgAgAAACUAIDMAAIYDACADAAAAJwAgOgAA_wIAIDsAAIQDACABAAAAJwAgAQAAACUAIAgNAADaDAAgQAAA3QwAIEEAANwMACCSAQAA2wwAIJMBAADeDAAg8QMAAN4HACD1AwAA3gcAIJwEAADeBwAgEdYDAADqBgAw1wMAAI0DABDYAwAA6gYAMNkDAQCCBgAh2gMBAIIGACHfA0AAhAYAIeADQACEBgAh7AMBAIIGACHtAwEAggYAIfEDAQCNBgAh8wMAAOsGrQQi9AMgAIMGACH1A0AAjwYAIZwEAQCNBgAhqQQBAIIGACGqBAEAggYAIasEEACZBgAhAwAAACUAIAEAAIwDADA_AACNAwAgAwAAACUAIAEAACYAMAIAACcAIAzWAwAA6AYAMNcDAACTAwAQ2AMAAOgGADDZAwEAAAAB3wNAALwGACHgA0AAvAYAIewDAQC3BgAh7gMBALcGACHvAwEAuAYAIfMDAADpBqkEIqEEAQC3BgAhowQBALgGACEBAAAAkAMAIAEAAACQAwAgDNYDAADoBgAw1wMAAJMDABDYAwAA6AYAMNkDAQC3BgAh3wNAALwGACHgA0AAvAYAIewDAQC3BgAh7gMBALcGACHvAwEAuAYAIfMDAADpBqkEIqEEAQC3BgAhowQBALgGACEC7wMAAN4HACCjBAAA3gcAIAMAAACTAwAgAQAAlAMAMAIAAJADACADAAAAkwMAIAEAAJQDADACAACQAwAgAwAAAJMDACABAACUAwAwAgAAkAMAIAnZAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7gMBAAAAAe8DAQAAAAHzAwAAAKkEAqEEAQAAAAGjBAEAAAABATMAAJgDACAJ2QMBAAAAAd8DQAAAAAHgA0AAAAAB7AMBAAAAAe4DAQAAAAHvAwEAAAAB8wMAAACpBAKhBAEAAAABowQBAAAAAQEzAACaAwAwATMAAJoDADAJ2QMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHuAwEA1QcAIe8DAQDiBwAh8wMAANkMqQQioQQBANUHACGjBAEA4gcAIQIAAACQAwAgMwAAnQMAIAnZAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIe4DAQDVBwAh7wMBAOIHACHzAwAA2QypBCKhBAEA1QcAIaMEAQDiBwAhAgAAAJMDACAzAACfAwAgAgAAAJMDACAzAACfAwAgAwAAAJADACA6AACYAwAgOwAAnQMAIAEAAACQAwAgAQAAAJMDACAFDQAA1gwAIEAAANgMACBBAADXDAAg7wMAAN4HACCjBAAA3gcAIAzWAwAA5AYAMNcDAACmAwAQ2AMAAOQGADDZAwEAggYAId8DQACEBgAh4ANAAIQGACHsAwEAggYAIe4DAQCCBgAh7wMBAI0GACHzAwAA5QapBCKhBAEAggYAIaMEAQCNBgAhAwAAAJMDACABAAClAwAwPwAApgMAIAMAAACTAwAgAQAAlAMAMAIAAJADACAP1gMAAOIGADDXAwAArAMAENgDAADiBgAw2QMBAAAAAd8DQAC8BgAh4ANAALwGACHsAwEAtwYAIe4DAQC3BgAh7wMBALgGACHzAwAA4waoBCKhBAEAuAYAIaMEAQC3BgAhpAQBALgGACGlBAEAuAYAIaYEQAC7BgAhAQAAAKkDACABAAAAqQMAIA_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_wMAIAMAAAAfACA6AAD4AwAgOwAA_QMAIAEAAAAfACABAAAAHQAgBQ0AAMcMACBAAADJDAAgQQAAyAwAIPUDAADeBwAgnAQAAN4HACAN1gMAANEGADDXAwAAhgQAENgDAADRBgAw2QMBAIIGACHaAwEAggYAIdsDAQCCBgAh3wNAAIQGACHgA0AAhAYAIewDAQCCBgAh8wMAANIGngQi9AMgAIMGACH1A0AAjwYAIZwEAQCNBgAhAwAAAB0AIAEAAIUEADA_AACGBAAgAwAAAB0AIAEAAB4AMAIAAB8AIAEAAAAjACABAAAAIwAgAwAAACEAIAEAACIAMAIAACMAIAMAAAAhACABAAAiADACAAAjACADAAAAIQAgAQAAIgAwAgAAIwAgDQgAAJUJACAJAADECQAgCwAAlgkAIBAAAJcJACDZAwEAAAAB2gMBAAAAAdsDAQAAAAHfA0AAAAAB4ANAAAAAAfcDAQAAAAH4AwIAAAABigQBAAAAAZsEAgAAAAEBMwAAjgQAIAnZAwEAAAAB2gMBAAAAAdsDAQAAAAHfA0AAAAAB4ANAAAAAAfcDAQAAAAH4AwIAAAABigQBAAAAAZsEAgAAAAEBMwAAkAQAMAEzAACQBAAwDQgAAJEJACAJAADCCQAgCwAAkgkAIBAAAJMJACDZAwEA1QcAIdoDAQDVBwAh2wMBANUHACHfA0AA1wcAIeADQADXBwAh9wMBANUHACH4AwIAiAgAIYoEAQDVBwAhmwQCAIgIACECAAAAIwAgMwAAkwQAIAnZAwEA1QcAIdoDAQDVBwAh2wMBANUHACHfA0AA1wcAIeADQADXBwAh9wMBANUHACH4AwIAiAgAIYoEAQDVBwAhmwQCAIgIACECAAAAIQAgMwAAlQQAIAIAAAAhACAzAACVBAAgAwAAACMAIDoAAI4EACA7AACTBAAgAQAAACMAIAEAAAAhACAFDQAAwgwAIEAAAMUMACBBAADEDAAgkgEAAMMMACCTAQAAxgwAIAzWAwAA0AYAMNcDAACcBAAQ2AMAANAGADDZAwEAggYAIdoDAQCCBgAh2wMBAIIGACHfA0AAhAYAIeADQACEBgAh9wMBAIIGACH4AwIAmAYAIYoEAQCCBgAhmwQCAJgGACEDAAAAIQAgAQAAmwQAMD8AAJwEACADAAAAIQAgAQAAIgAwAgAAIwAgAQAAAC0AIAEAAAAtACADAAAAKwAgAQAALAAwAgAALQAgAwAAACsAIAEAACwAMAIAAC0AIAMAAAArACABAAAsADACAAAtACARCAAA1AgAIAkAANUIACALAADWCAAgEAAA1wgAIBEAANgIACASAACFCQAg2QMBAAAAAdoDAQAAAAHbAwEAAAAB3wNAAAAAAfYDAQAAAAH3AwEAAAAB-AMCAAAAAfsDAQAAAAGDBAEAAAABigQBAAAAAZoEAAAAmgQCATMAAKQEACAL2QMBAAAAAdoDAQAAAAHbAwEAAAAB3wNAAAAAAfYDAQAAAAH3AwEAAAAB-AMCAAAAAfsDAQAAAAGDBAEAAAABigQBAAAAAZoEAAAAmgQCATMAAKYEADABMwAApgQAMAEAAAAvACARCAAAzggAIAkAAM8IACALAADQCAAgEAAA0QgAIBEAANIIACASAACDCQAg2QMBANUHACHaAwEA1QcAIdsDAQDVBwAh3wNAANcHACH2AwEA4gcAIfcDAQDVBwAh-AMCAIgIACH7AwEA1QcAIYMEAQDiBwAhigQBANUHACGaBAAAzAiaBCICAAAALQAgMwAAqgQAIAvZAwEA1QcAIdoDAQDVBwAh2wMBANUHACHfA0AA1wcAIfYDAQDiBwAh9wMBANUHACH4AwIAiAgAIfsDAQDVBwAhgwQBAOIHACGKBAEA1QcAIZoEAADMCJoEIgIAAAArACAzAACsBAAgAgAAACsAIDMAAKwEACABAAAALwAgAwAAAC0AIDoAAKQEACA7AACqBAAgAQAAAC0AIAEAAAArACAHDQAAvQwAIEAAAMAMACBBAAC_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_AADMBAAgAwAAAG4AIAEAALoEADACAAC3BAAgAQAAABIAIAEAAAASACADAAAAEAAgAQAAEQAwAgAAEgAgAwAAABAAIAEAABEAMAIAABIAIAMAAAAQACABAAARADACAAASACAKAwAAgwoAIAgAAIIKACDZAwEAAAAB2gMBAAAAAdwDAQAAAAHdAyAAAAAB3wNAAAAAAeADQAAAAAGRBAAAAJEEApIEQAAAAAEBMwAA1AQAIAjZAwEAAAAB2gMBAAAAAdwDAQAAAAHdAyAAAAAB3wNAAAAAAeADQAAAAAGRBAAAAJEEApIEQAAAAAEBMwAA1gQAMAEzAADWBAAwCgMAAIEKACAIAACACgAg2QMBANUHACHaAwEA1QcAIdwDAQDVBwAh3QMgANYHACHfA0AA1wcAIeADQADXBwAhkQQAAP8JkQQikgRAANcHACECAAAAEgAgMwAA2QQAIAjZAwEA1QcAIdoDAQDVBwAh3AMBANUHACHdAyAA1gcAId8DQADXBwAh4ANAANcHACGRBAAA_wmRBCKSBEAA1wcAIQIAAAAQACAzAADbBAAgAgAAABAAIDMAANsEACADAAAAEgAgOgAA1AQAIDsAANkEACABAAAAEgAgAQAAABAAIAMNAAD8CQAgQAAA_gkAIEEAAP0JACAL1gMAAK4GADDXAwAA4gQAENgDAACuBgAw2QMBAIIGACHaAwEAggYAIdwDAQCCBgAh3QMgAIMGACHfA0AAhAYAIeADQACEBgAhkQQAAK8GkQQikgRAAIQGACEDAAAAEAAgAQAA4QQAMD8AAOIEACADAAAAEAAgAQAAEQAwAgAAEgAgAQAAAD8AIAEAAAA_ACADAAAAPQAgAQAAPgAwAgAAPwAgAwAAAD0AIAEAAD4AMAIAAD8AIAMAAAA9ACABAAA-ADACAAA_ACAKEgAA-wkAIBkAAMEIACDZAwEAAAAB3wNAAAAAAeADQAAAAAH2AwEAAAABgQQAAACBBAKDBAEAAAABjgQBAAAAAY8EEAAAAAEBMwAA6gQAIAjZAwEAAAAB3wNAAAAAAeADQAAAAAH2AwEAAAABgQQAAACBBAKDBAEAAAABjgQBAAAAAY8EEAAAAAEBMwAA7AQAMAEzAADsBAAwAQAAAAMAIAoSAAD6CQAgGQAAvwgAINkDAQDVBwAh3wNAANcHACHgA0AA1wcAIfYDAQDVBwAhgQQAAJ8IgQQigwQBAOIHACGOBAEA4gcAIY8EEAD2BwAhAgAAAD8AIDMAAPAEACAI2QMBANUHACHfA0AA1wcAIeADQADXBwAh9gMBANUHACGBBAAAnwiBBCKDBAEA4gcAIY4EAQDiBwAhjwQQAPYHACECAAAAPQAgMwAA8gQAIAIAAAA9ACAzAADyBAAgAQAAAAMAIAMAAAA_ACA6AADqBAAgOwAA8AQAIAEAAAA_ACABAAAAPQAgBw0AAPUJACBAAAD4CQAgQQAA9wkAIJIBAAD2CQAgkwEAAPkJACCDBAAA3gcAII4EAADeBwAgC9YDAACtBgAw1wMAAPoEABDYAwAArQYAMNkDAQCCBgAh3wNAAIQGACHgA0AAhAYAIfYDAQCCBgAhgQQAAJ8GgQQigwQBAI0GACGOBAEAjQYAIY8EEACZBgAhAwAAAD0AIAEAAPkEADA_AAD6BAAgAwAAAD0AIAEAAD4AMAIAAD8AIAEAAABEACABAAAARAAgAwAAAEIAIAEAAEMAMAIAAEQAIAMAAABCACABAABDADACAABEACADAAAAQgAgAQAAQwAwAgAARAAgEQgAAJEIACAJAACzCAAgCwAAkggAIBIAAJAIACATAACTCAAgFAAAlAgAINkDAQAAAAHaAwEAAAAB2wMBAAAAAd8DQAAAAAHgA0AAAAAB8wMAAACOBAL2AwEAAAABgwQBAAAAAYoEAQAAAAGLBAEAAAABjAQQAAAAAQEzAACCBQAgC9kDAQAAAAHaAwEAAAAB2wMBAAAAAd8DQAAAAAHgA0AAAAAB8wMAAACOBAL2AwEAAAABgwQBAAAAAYoEAQAAAAGLBAEAAAABjAQQAAAAAQEzAACEBQAwATMAAIQFADARCAAA-gcAIAkAALEIACALAAD7BwAgEgAA-QcAIBMAAPwHACAUAAD9BwAg2QMBANUHACHaAwEA1QcAIdsDAQDVBwAh3wNAANcHACHgA0AA1wcAIfMDAAD3B44EIvYDAQDVBwAhgwQBAOIHACGKBAEA1QcAIYsEAQDVBwAhjAQQAPYHACECAAAARAAgMwAAhwUAIAvZAwEA1QcAIdoDAQDVBwAh2wMBANUHACHfA0AA1wcAIeADQADXBwAh8wMAAPcHjgQi9gMBANUHACGDBAEA4gcAIYoEAQDVBwAhiwQBANUHACGMBBAA9gcAIQIAAABCACAzAACJBQAgAgAAAEIAIDMAAIkFACADAAAARAAgOgAAggUAIDsAAIcFACABAAAARAAgAQAAAEIAIAYNAADwCQAgQAAA8wkAIEEAAPIJACCSAQAA8QkAIJMBAAD0CQAggwQAAN4HACAO1gMAAKkGADDXAwAAkAUAENgDAACpBgAw2QMBAIIGACHaAwEAggYAIdsDAQCCBgAh3wNAAIQGACHgA0AAhAYAIfMDAACqBo4EIvYDAQCCBgAhgwQBAI0GACGKBAEAggYAIYsEAQCCBgAhjAQQAJkGACEDAAAAQgAgAQAAjwUAMD8AAJAFACADAAAAQgAgAQAAQwAwAgAARAAgAQAAADcAIAEAAAA3ACADAAAANQAgAQAANgAwAgAANwAgAwAAADUAIAEAADYAMAIAADcAIAMAAAA1ACABAAA2ADACAAA3ACALEAAAjggAIBUAAPAIACAWAACNCAAg2QMBAAAAAd8DQAAAAAH3AwEAAAAB-AMCAAAAAfkDEAAAAAH6AxAAAAABiAQBAAAAAYkEAQAAAAEBMwAAmAUAIAjZAwEAAAAB3wNAAAAAAfcDAQAAAAH4AwIAAAAB-QMQAAAAAfoDEAAAAAGIBAEAAAABiQQBAAAAAQEzAACaBQAwATMAAJoFADALEAAAiwgAIBUAAO4IACAWAACKCAAg2QMBANUHACHfA0AA1wcAIfcDAQDVBwAh-AMCAIgIACH5AxAA9gcAIfoDEAD2BwAhiAQBANUHACGJBAEA1QcAIQIAAAA3ACAzAACdBQAgCNkDAQDVBwAh3wNAANcHACH3AwEA1QcAIfgDAgCICAAh-QMQAPYHACH6AxAA9gcAIYgEAQDVBwAhiQQBANUHACECAAAANQAgMwAAnwUAIAIAAAA1ACAzAACfBQAgAwAAADcAIDoAAJgFACA7AACdBQAgAQAAADcAIAEAAAA1ACAFDQAA6wkAIEAAAO4JACBBAADtCQAgkgEAAOwJACCTAQAA7wkAIAvWAwAAqAYAMNcDAACmBQAQ2AMAAKgGADDZAwEAggYAId8DQACEBgAh9wMBAIIGACH4AwIAmAYAIfkDEACZBgAh-gMQAJkGACGIBAEAggYAIYkEAQCCBgAhAwAAADUAIAEAAKUFADA_AACmBQAgAwAAADUAIAEAADYAMAIAADcAIAEAAABYACABAAAAWAAgAwAAAC8AIAEAAFcAMAIAAFgAIAMAAAAvACABAABXADACAABYACADAAAALwAgAQAAVwAwAgAAWAAgFwgAAPUIACAJAADqCQAgEQAA9ggAIBQAAPcIACAYAAD4CAAgGgAA-QgAIBsAAPoIACDZAwEAAAAB2gMBAAAAAdsDAQAAAAHfA0AAAAAB4ANAAAAAAfMDAAAAgwQC-wMBAAAAAfwDAQAAAAH9AxAAAAAB_gMQAAAAAf8DEAAAAAGBBAAAAIEEAoMEAQAAAAGFBAAAAIUEAoYEEAAAAAGHBBAAAAABATMAAK4FACAQ2QMBAAAAAdoDAQAAAAHbAwEAAAAB3wNAAAAAAeADQAAAAAHzAwAAAIMEAvsDAQAAAAH8AwEAAAAB_QMQAAAAAf4DEAAAAAH_AxAAAAABgQQAAACBBAKDBAEAAAABhQQAAACFBAKGBBAAAAABhwQQAAAAAQEzAACwBQAwATMAALAFADAXCAAAowgAIAkAAOkJACARAACkCAAgFAAApQgAIBgAAKYIACAaAACnCAAgGwAAqAgAINkDAQDVBwAh2gMBANUHACHbAwEA1QcAId8DQADXBwAh4ANAANcHACHzAwAAoAiDBCL7AwEA1QcAIfwDAQDVBwAh_QMQAPYHACH-AxAA9gcAIf8DEAD2BwAhgQQAAJ8IgQQigwQBAOIHACGFBAAAoQiFBCKGBBAA9gcAIYcEEAD2BwAhAgAAAFgAIDMAALMFACAQ2QMBANUHACHaAwEA1QcAIdsDAQDVBwAh3wNAANcHACHgA0AA1wcAIfMDAACgCIMEIvsDAQDVBwAh_AMBANUHACH9AxAA9gcAIf4DEAD2BwAh_wMQAPYHACGBBAAAnwiBBCKDBAEA4gcAIYUEAAChCIUEIoYEEAD2BwAhhwQQAPYHACECAAAALwAgMwAAtQUAIAIAAAAvACAzAAC1BQAgAwAAAFgAIDoAAK4FACA7AACzBQAgAQAAAFgAIAEAAAAvACAGDQAA5AkAIEAAAOcJACBBAADmCQAgkgEAAOUJACCTAQAA6AkAIIMEAADeBwAgE9YDAACeBgAw1wMAALwFABDYAwAAngYAMNkDAQCCBgAh2gMBAIIGACHbAwEAggYAId8DQACEBgAh4ANAAIQGACHzAwAAoAaDBCL7AwEAggYAIfwDAQCCBgAh_QMQAJkGACH-AxAAmQYAIf8DEACZBgAhgQQAAJ8GgQQigwQBAI0GACGFBAAAoQaFBCKGBBAAmQYAIYcEEACZBgAhAwAAAC8AIAEAALsFADA_AAC8BQAgAwAAAC8AIAEAAFcAMAIAAFgAIAEAAAAzACABAAAAMwAgAwAAADEAIAEAADIAMAIAADMAIAMAAAAxACABAAAyADACAAAzACADAAAAMQAgAQAAMgAwAgAAMwAgChAAAPIIACASAADjCQAgFwAA8wgAINkDAQAAAAHfA0AAAAAB9gMBAAAAAfcDAQAAAAH4AwIAAAAB-QMQAAAAAfoDEAAAAAEBMwAAxAUAIAfZAwEAAAAB3wNAAAAAAfYDAQAAAAH3AwEAAAAB-AMCAAAAAfkDEAAAAAH6AxAAAAABATMAAMYFADABMwAAxgUAMAoQAADkCAAgEgAA4gkAIBcAAOUIACDZAwEA1QcAId8DQADXBwAh9gMBANUHACH3AwEA1QcAIfgDAgCICAAh-QMQAPYHACH6AxAA9gcAIQIAAAAzACAzAADJBQAgB9kDAQDVBwAh3wNAANcHACH2AwEA1QcAIfcDAQDVBwAh-AMCAIgIACH5AxAA9gcAIfoDEAD2BwAhAgAAADEAIDMAAMsFACACAAAAMQAgMwAAywUAIAMAAAAzACA6AADEBQAgOwAAyQUAIAEAAAAzACABAAAAMQAgBQ0AAN0JACBAAADgCQAgQQAA3wkAIJIBAADeCQAgkwEAAOEJACAK1gMAAJcGADDXAwAA0gUAENgDAACXBgAw2QMBAIIGACHfA0AAhAYAIfYDAQCCBgAh9wMBAIIGACH4AwIAmAYAIfkDEACZBgAh-gMQAJkGACEDAAAAMQAgAQAA0QUAMD8AANIFACADAAAAMQAgAQAAMgAwAgAAMwAgAQAAABcAIAEAAAAXACADAAAAFQAgAQAAFgAwAgAAFwAgAwAAABUAIAEAABYAMAIAABcAIAMAAAAVACABAAAWADACAAAXACAUCAAA1gkAIAoAANcJACAPAADZCQAgGAAA2gkAIB0AANgJACAeAADbCQAgHwAA3AkAINkDAQAAAAHaAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7QMBAAAAAe4DAQAAAAHvAwEAAAAB8AMBAAAAAfEDAQAAAAHzAwAAAPMDAvQDIAAAAAH1A0AAAAABATMAANoFACAN2QMBAAAAAdoDAQAAAAHfA0AAAAAB4ANAAAAAAewDAQAAAAHtAwEAAAAB7gMBAAAAAe8DAQAAAAHwAwEAAAAB8QMBAAAAAfMDAAAA8wMC9AMgAAAAAfUDQAAAAAEBMwAA3AUAMAEzAADcBQAwFAgAAOUHACAKAADmBwAgDwAA6AcAIBgAAOkHACAdAADnBwAgHgAA6gcAIB8AAOsHACDZAwEA1QcAIdoDAQDVBwAh3wNAANcHACHgA0AA1wcAIewDAQDVBwAh7QMBANUHACHuAwEA4gcAIe8DAQDiBwAh8AMBAOIHACHxAwEA4gcAIfMDAADjB_MDIvQDIADWBwAh9QNAAOQHACECAAAAFwAgMwAA3wUAIA3ZAwEA1QcAIdoDAQDVBwAh3wNAANcHACHgA0AA1wcAIewDAQDVBwAh7QMBANUHACHuAwEA4gcAIe8DAQDiBwAh8AMBAOIHACHxAwEA4gcAIfMDAADjB_MDIvQDIADWBwAh9QNAAOQHACECAAAAFQAgMwAA4QUAIAIAAAAVACAzAADhBQAgAwAAABcAIDoAANoFACA7AADfBQAgAQAAABcAIAEAAAAVACAIDQAA3wcAIEAAAOEHACBBAADgBwAg7gMAAN4HACDvAwAA3gcAIPADAADeBwAg8QMAAN4HACD1AwAA3gcAIBDWAwAAjAYAMNcDAADoBQAQ2AMAAIwGADDZAwEAggYAIdoDAQCCBgAh3wNAAIQGACHgA0AAhAYAIewDAQCCBgAh7QMBAIIGACHuAwEAjQYAIe8DAQCNBgAh8AMBAI0GACHxAwEAjQYAIfMDAACOBvMDIvQDIACDBgAh9QNAAI8GACEDAAAAFQAgAQAA5wUAMD8AAOgFACADAAAAFQAgAQAAFgAwAgAAFwAgAQAAABsAIAEAAAAbACADAAAAGQAgAQAAGgAwAgAAGwAgAwAAABkAIAEAABoAMAIAABsAIAMAAAAZACABAAAaADACAAAbACALAwAA3QcAIAgAANsHACAJAADcBwAg2QMBAAAAAdoDAQAAAAHbAwEAAAAB3AMBAAAAAd0DIAAAAAHeA0AAAAAB3wNAAAAAAeADQAAAAAEBMwAA8AUAIAjZAwEAAAAB2gMBAAAAAdsDAQAAAAHcAwEAAAAB3QMgAAAAAd4DQAAAAAHfA0AAAAAB4ANAAAAAAQEzAADyBQAwATMAAPIFADALAwAA2gcAIAgAANgHACAJAADZBwAg2QMBANUHACHaAwEA1QcAIdsDAQDVBwAh3AMBANUHACHdAyAA1gcAId4DQADXBwAh3wNAANcHACHgA0AA1wcAIQIAAAAbACAzAAD1BQAgCNkDAQDVBwAh2gMBANUHACHbAwEA1QcAIdwDAQDVBwAh3QMgANYHACHeA0AA1wcAId8DQADXBwAh4ANAANcHACECAAAAGQAgMwAA9wUAIAIAAAAZACAzAAD3BQAgAwAAABsAIDoAAPAFACA7AAD1BQAgAQAAABsAIAEAAAAZACADDQAA0gcAIEAAANQHACBBAADTBwAgC9YDAACBBgAw1wMAAP4FABDYAwAAgQYAMNkDAQCCBgAh2gMBAIIGACHbAwEAggYAIdwDAQCCBgAh3QMgAIMGACHeA0AAhAYAId8DQACEBgAh4ANAAIQGACEDAAAAGQAgAQAA_QUAMD8AAP4FACADAAAAGQAgAQAAGgAwAgAAGwAgC9YDAACBBgAw1wMAAP4FABDYAwAAgQYAMNkDAQCCBgAh2gMBAIIGACHbAwEAggYAIdwDAQCCBgAh3QMgAIMGACHeA0AAhAYAId8DQACEBgAh4ANAAIQGACEODQAAhgYAIEAAAIsGACBBAACLBgAg4QMBAAAAAeIDAQAAAATjAwEAAAAE5AMBAAAAAeUDAQAAAAHmAwEAAAAB5wMBAAAAAegDAQCKBgAh6QMBAAAAAeoDAQAAAAHrAwEAAAABBQ0AAIYGACBAAACJBgAgQQAAiQYAIOEDIAAAAAHoAyAAiAYAIQsNAACGBgAgQAAAhwYAIEEAAIcGACDhA0AAAAAB4gNAAAAABOMDQAAAAATkA0AAAAAB5QNAAAAAAeYDQAAAAAHnA0AAAAAB6ANAAIUGACELDQAAhgYAIEAAAIcGACBBAACHBgAg4QNAAAAAAeIDQAAAAATjA0AAAAAE5ANAAAAAAeUDQAAAAAHmA0AAAAAB5wNAAAAAAegDQACFBgAhCOEDAgAAAAHiAwIAAAAE4wMCAAAABOQDAgAAAAHlAwIAAAAB5gMCAAAAAecDAgAAAAHoAwIAhgYAIQjhA0AAAAAB4gNAAAAABOMDQAAAAATkA0AAAAAB5QNAAAAAAeYDQAAAAAHnA0AAAAAB6ANAAIcGACEFDQAAhgYAIEAAAIkGACBBAACJBgAg4QMgAAAAAegDIACIBgAhAuEDIAAAAAHoAyAAiQYAIQ4NAACGBgAgQAAAiwYAIEEAAIsGACDhAwEAAAAB4gMBAAAABOMDAQAAAATkAwEAAAAB5QMBAAAAAeYDAQAAAAHnAwEAAAAB6AMBAIoGACHpAwEAAAAB6gMBAAAAAesDAQAAAAEL4QMBAAAAAeIDAQAAAATjAwEAAAAE5AMBAAAAAeUDAQAAAAHmAwEAAAAB5wMBAAAAAegDAQCLBgAh6QMBAAAAAeoDAQAAAAHrAwEAAAABENYDAACMBgAw1wMAAOgFABDYAwAAjAYAMNkDAQCCBgAh2gMBAIIGACHfA0AAhAYAIeADQACEBgAh7AMBAIIGACHtAwEAggYAIe4DAQCNBgAh7wMBAI0GACHwAwEAjQYAIfEDAQCNBgAh8wMAAI4G8wMi9AMgAIMGACH1A0AAjwYAIQ4NAACRBgAgQAAAlgYAIEEAAJYGACDhAwEAAAAB4gMBAAAABeMDAQAAAAXkAwEAAAAB5QMBAAAAAeYDAQAAAAHnAwEAAAAB6AMBAJUGACHpAwEAAAAB6gMBAAAAAesDAQAAAAEHDQAAhgYAIEAAAJQGACBBAACUBgAg4QMAAADzAwLiAwAAAPMDCOMDAAAA8wMI6AMAAJMG8wMiCw0AAJEGACBAAACSBgAgQQAAkgYAIOEDQAAAAAHiA0AAAAAF4wNAAAAABeQDQAAAAAHlA0AAAAAB5gNAAAAAAecDQAAAAAHoA0AAkAYAIQsNAACRBgAgQAAAkgYAIEEAAJIGACDhA0AAAAAB4gNAAAAABeMDQAAAAAXkA0AAAAAB5QNAAAAAAeYDQAAAAAHnA0AAAAAB6ANAAJAGACEI4QMCAAAAAeIDAgAAAAXjAwIAAAAF5AMCAAAAAeUDAgAAAAHmAwIAAAAB5wMCAAAAAegDAgCRBgAhCOEDQAAAAAHiA0AAAAAF4wNAAAAABeQDQAAAAAHlA0AAAAAB5gNAAAAAAecDQAAAAAHoA0AAkgYAIQcNAACGBgAgQAAAlAYAIEEAAJQGACDhAwAAAPMDAuIDAAAA8wMI4wMAAADzAwjoAwAAkwbzAyIE4QMAAADzAwLiAwAAAPMDCOMDAAAA8wMI6AMAAJQG8wMiDg0AAJEGACBAAACWBgAgQQAAlgYAIOEDAQAAAAHiAwEAAAAF4wMBAAAABeQDAQAAAAHlAwEAAAAB5gMBAAAAAecDAQAAAAHoAwEAlQYAIekDAQAAAAHqAwEAAAAB6wMBAAAAAQvhAwEAAAAB4gMBAAAABeMDAQAAAAXkAwEAAAAB5QMBAAAAAeYDAQAAAAHnAwEAAAAB6AMBAJYGACHpAwEAAAAB6gMBAAAAAesDAQAAAAEK1gMAAJcGADDXAwAA0gUAENgDAACXBgAw2QMBAIIGACHfA0AAhAYAIfYDAQCCBgAh9wMBAIIGACH4AwIAmAYAIfkDEACZBgAh-gMQAJkGACENDQAAhgYAIEAAAIYGACBBAACGBgAgkgEAAJ0GACCTAQAAhgYAIOEDAgAAAAHiAwIAAAAE4wMCAAAABOQDAgAAAAHlAwIAAAAB5gMCAAAAAecDAgAAAAHoAwIAnAYAIQ0NAACGBgAgQAAAmwYAIEEAAJsGACCSAQAAmwYAIJMBAACbBgAg4QMQAAAAAeIDEAAAAATjAxAAAAAE5AMQAAAAAeUDEAAAAAHmAxAAAAAB5wMQAAAAAegDEACaBgAhDQ0AAIYGACBAAACbBgAgQQAAmwYAIJIBAACbBgAgkwEAAJsGACDhAxAAAAAB4gMQAAAABOMDEAAAAATkAxAAAAAB5QMQAAAAAeYDEAAAAAHnAxAAAAAB6AMQAJoGACEI4QMQAAAAAeIDEAAAAATjAxAAAAAE5AMQAAAAAeUDEAAAAAHmAxAAAAAB5wMQAAAAAegDEACbBgAhDQ0AAIYGACBAAACGBgAgQQAAhgYAIJIBAACdBgAgkwEAAIYGACDhAwIAAAAB4gMCAAAABOMDAgAAAATkAwIAAAAB5QMCAAAAAeYDAgAAAAHnAwIAAAAB6AMCAJwGACEI4QMIAAAAAeIDCAAAAATjAwgAAAAE5AMIAAAAAeUDCAAAAAHmAwgAAAAB5wMIAAAAAegDCACdBgAhE9YDAACeBgAw1wMAALwFABDYAwAAngYAMNkDAQCCBgAh2gMBAIIGACHbAwEAggYAId8DQACEBgAh4ANAAIQGACHzAwAAoAaDBCL7AwEAggYAIfwDAQCCBgAh_QMQAJkGACH-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_QYAIOEDAAAAugQC4gMAAAC6BAjjAwAAALoECOgDAAD8BroEIgThAwAAALoEAuIDAAAAugQI4wMAAAC6BAjoAwAA_Qa6BCIJ1gMAAP4GADDXAwAAmQIAENgDAAD-BgAw2QMBAIIGACHfA0AAhAYAIeADQACEBgAhuwQBAIIGACG8BAEAggYAIb0EQACEBgAhCdYDAAD_BgAw1wMAAIYCABDYAwAA_wYAMNkDAQC3BgAh3wNAALwGACHgA0AAvAYAIbsEAQC3BgAhvAQBALcGACG9BEAAvAYAIRDWAwAAgAcAMNcDAACAAgAQ2AMAAIAHADDZAwEAggYAIdwDAQCCBgAh3wNAAIQGACHgA0AAhAYAIb4EAQCCBgAhvwQBAIIGACHABAEAjQYAIcEEAQCNBgAhwgQBAI0GACHDBEAAjwYAIcQEQACPBgAhxQQBAI0GACHGBAEAjQYAIQvWAwAAgQcAMNcDAADqAQAQ2AMAAIEHADDZAwEAggYAIdwDAQCCBgAh3wNAAIQGACHgA0AAhAYAIb0EQACEBgAhxwQBAIIGACHIBAEAjQYAIckEAQCNBgAhD9YDAACCBwAw1wMAANQBABDYAwAAggcAMNkDAQCCBgAh3wNAAIQGACHgA0AAhAYAIewDAQCCBgAh7gMBAIIGACHvAwEAjQYAIfEDAQCNBgAh8wMAAIMHzAQi9AMgAIMGACH1A0AAjwYAIcoEIACDBgAhzQQAAIQHzQQjBw0AAIYGACBAAACIBwAgQQAAiAcAIOEDAAAAzAQC4gMAAADMBAjjAwAAAMwECOgDAACHB8wEIgcNAACRBgAgQAAAhgcAIEEAAIYHACDhAwAAAM0EA-IDAAAAzQQJ4wMAAADNBAnoAwAAhQfNBCMHDQAAkQYAIEAAAIYHACBBAACGBwAg4QMAAADNBAPiAwAAAM0ECeMDAAAAzQQJ6AMAAIUHzQQjBOEDAAAAzQQD4gMAAADNBAnjAwAAAM0ECegDAACGB80EIwcNAACGBgAgQAAAiAcAIEEAAIgHACDhAwAAAMwEAuIDAAAAzAQI4wMAAADMBAjoAwAAhwfMBCIE4QMAAADMBALiAwAAAMwECOMDAAAAzAQI6AMAAIgHzAQiGQQAAIwHACAFAACNBwAgBgAAyQYAIB8AAMoGACAnAADIBgAgKQAAvQYAICoAAMQGACArAADDBgAgLAAAxwYAIC0AAI4HACDWAwAAiQcAMNcDAAADABDYAwAAiQcAMNkDAQC3BgAh3wNAALwGACHgA0AAvAYAIewDAQC3BgAh7gMBALcGACHvAwEAuAYAIfEDAQC4BgAh8wMAAIoHzAQi9AMgALoGACH1A0AAuwYAIcoEIAC6BgAhzQQAAIsHzQQjBOEDAAAAzAQC4gMAAADMBAjjAwAAAMwECOgDAACIB8wEIgThAwAAAM0EA-IDAAAAzQQJ4wMAAADNBAnoAwAAhgfNBCMDlgQAAAUAIJcEAAAFACCYBAAABQAgA5YEAAAJACCXBAAACQAgmAQAAAkAIAOWBAAAPQAglwQAAD0AIJgEAAA9ACAM1gMAAI8HADDXAwAAvAEAENgDAACPBwAw2QMBAIIGACHaAwEAjQYAIdwDAQCNBgAh3wNAAIQGACGcBAEAjQYAIc4EAQCCBgAhzwQBAIIGACHQBAEAjQYAIdEEAACQBwAgDw0AAJEGACBAAACRBwAgQQAAkQcAIOEDgAAAAAHkA4AAAAAB5QOAAAAAAeYDgAAAAAHnA4AAAAAB6AOAAAAAAdIEAQAAAAHTBAEAAAAB1AQBAAAAAdUEgAAAAAHWBIAAAAAB1wSAAAAAAQzhA4AAAAAB5AOAAAAAAeUDgAAAAAHmA4AAAAAB5wOAAAAAAegDgAAAAAHSBAEAAAAB0wQBAAAAAdQEAQAAAAHVBIAAAAAB1gSAAAAAAdcEgAAAAAEPCAAAlQcAIA4BALcGACHWAwAAkgcAMNcDAACBAQAQ2AMAAJIHADDZAwEAtwYAIdoDAQC4BgAh3wNAALwGACHgA0AAvAYAIewDAQC3BgAh7gMBALcGACHzAwAAlAejBCKeBAEAtwYAIaAEAACTB6AEIqEEAQC3BgAhBOEDAAAAoAQC4gMAAACgBAjjAwAAAKAECOgDAADbBqAEIgThAwAAAKMEAuIDAAAAowQI4wMAAACjBAjoAwAA2QajBCIhBgAAyQYAIAcAAL0GACAMAADABgAgDwAAwgYAIBgAAMMGACAbAADKBgAgHQAAwQYAIB4AAMQGACAgAAC-BgAgIQAAvwYAICQAAMYGACAlAADFBgAgJgAAxwYAICcAAMgGACAoAADLBgAg1gMAALYGADDXAwAAbgAQ2AMAALYGADDZAwEAtwYAId8DQAC8BgAh4ANAALwGACHsAwEAtwYAIe0DAQC3BgAh7gMBALgGACHvAwEAuAYAIfADAQC4BgAh8wMAALkGlQQi9AMgALoGACH1A0AAuwYAIZMEAQC4BgAhlQRAALsGACHgBAAAbgAg4QQAAG4AIBIIAACZBwAgEQAAmwcAICMAAJoHACDWAwAAlgcAMNcDAAB0ABDYAwAAlgcAMNkDAQC3BgAh2gMBALcGACHfA0AAvAYAIeADQAC8BgAh8wMAAJgHsQQi-wMBALgGACGDBAEAuAYAIY8EEACXBwAhrgQBALgGACGvBAEAtwYAIbEEAQC4BgAhsgQBALgGACEI4QMQAAAAAeIDEAAAAATjAxAAAAAE5AMQAAAAAeUDEAAAAAHmAxAAAAAB5wMQAAAAAegDEACbBgAhBOEDAAAAsQQC4gMAAACxBAjjAwAAALEECOgDAAD1BrEEIiEGAADJBgAgBwAAvQYAIAwAAMAGACAPAADCBgAgGAAAwwYAIBsAAMoGACAdAADBBgAgHgAAxAYAICAAAL4GACAhAAC_BgAgJAAAxgYAICUAAMUGACAmAADHBgAgJwAAyAYAICgAAMsGACDWAwAAtgYAMNcDAABuABDYAwAAtgYAMNkDAQC3BgAh3wNAALwGACHgA0AAvAYAIewDAQC3BgAh7QMBALcGACHuAwEAuAYAIe8DAQC4BgAh8AMBALgGACHzAwAAuQaVBCL0AyAAugYAIfUDQAC7BgAhkwQBALgGACGVBEAAuwYAIeAEAABuACDhBAAAbgAgEggAAJkHACAaAADHBgAgIgAAngcAINYDAACcBwAw1wMAAHAAENgDAACcBwAw2QMBALcGACHaAwEAtwYAId8DQAC8BgAh4ANAALwGACHzAwAAnQe1BCKzBAEAtwYAIbUEAQC4BgAhtgQBALgGACG3BEAAuwYAIbgEQAC7BgAh4AQAAHAAIOEEAABwACAbBAAAjAcAIAUAAI0HACAGAADJBgAgHwAAygYAICcAAMgGACApAAC9BgAgKgAAxAYAICsAAMMGACAsAADHBgAgLQAAjgcAINYDAACJBwAw1wMAAAMAENgDAACJBwAw2QMBALcGACHfA0AAvAYAIeADQAC8BgAh7AMBALcGACHuAwEAtwYAIe8DAQC4BgAh8QMBALgGACHzAwAAigfMBCL0AyAAugYAIfUDQAC7BgAhygQgALoGACHNBAAAiwfNBCPgBAAAAwAg4QQAAAMAIBAIAACZBwAgGgAAxwYAICIAAJ4HACDWAwAAnAcAMNcDAABwABDYAwAAnAcAMNkDAQC3BgAh2gMBALcGACHfA0AAvAYAIeADQAC8BgAh8wMAAJ0HtQQiswQBALcGACG1BAEAuAYAIbYEAQC4BgAhtwRAALsGACG4BEAAuwYAIQThAwAAALUEAuIDAAAAtQQI4wMAAAC1BAjoAwAA-Qa1BCISCAAAlQcAICQAAMYGACDWAwAAnwcAMNcDAABqABDYAwAAnwcAMNkDAQC3BgAh2gMBALgGACHdAyAAugYAId8DQAC8BgAh4ANAALwGACHsAwEAtwYAIe0DAQC3BgAhjwQQAJcHACGcBAEAuAYAIa8EAQC3BgAhugQAAKAHugQi4AQAAGoAIOEEAABqACAQCAAAlQcAICQAAMYGACDWAwAAnwcAMNcDAABqABDYAwAAnwcAMNkDAQC3BgAh2gMBALgGACHdAyAAugYAId8DQAC8BgAh4ANAALwGACHsAwEAtwYAIe0DAQC3BgAhjwQQAJcHACGcBAEAuAYAIa8EAQC3BgAhugQAAKAHugQiBOEDAAAAugQC4gMAAAC6BAjjAwAAALoECOgDAAD9BroEIgLaAwEAAAAB7QMBAAAAAQ8IAACZBwAgDAAAwAYAINYDAACiBwAw1wMAAGEAENgDAACiBwAw2QMBALcGACHaAwEAtwYAId8DQAC8BgAh4ANAALwGACHsAwEAtwYAIe0DAQC3BgAh8wMAAKMHrgQi9AMgALoGACH1A0AAuwYAIZwEAQC4BgAhBOEDAAAArgQC4gMAAACuBAjjAwAAAK4ECOgDAADxBq4EIgLaAwEAAAAB_AMBAAAAARoIAACZBwAgCQAAqQcAIBEAAKoHACAUAACrBwAgGAAAwwYAIBoAAI4HACAbAADKBgAg1gMAAKUHADDXAwAALwAQ2AMAAKUHADDZAwEAtwYAIdoDAQC3BgAh2wMBALcGACHfA0AAvAYAIeADQAC8BgAh8wMAAKcHgwQi-wMBALcGACH8AwEAtwYAIf0DEACXBwAh_gMQAJcHACH_AxAAlwcAIYEEAACmB4EEIoMEAQC4BgAhhQQAAKgHhQQihgQQAJcHACGHBBAAlwcAIQThAwAAAIEEAuIDAAAAgQQI4wMAAACBBAjoAwAApwaBBCIE4QMAAACDBALiAwAAAIMECOMDAAAAgwQI6AMAAKUGgwQiBOEDAAAAhQQC4gMAAACFBAjjAwAAAIUECOgDAACjBoUEIhkIAACZBwAgCgAAyAYAIA8AAMIGACAYAADDBgAgHQAAwQYAIB4AAMQGACAfAADKBgAg1gMAAMgHADDXAwAAFQAQ2AMAAMgHADDZAwEAtwYAIdoDAQC3BgAh3wNAALwGACHgA0AAvAYAIewDAQC3BgAh7QMBALcGACHuAwEAuAYAIe8DAQC4BgAh8AMBALgGACHxAwEAuAYAIfMDAADJB_MDIvQDIAC6BgAh9QNAALsGACHgBAAAFQAg4QQAABUAIBsEAACMBwAgBQAAjQcAIAYAAMkGACAfAADKBgAgJwAAyAYAICkAAL0GACAqAADEBgAgKwAAwwYAICwAAMcGACAtAACOBwAg1gMAAIkHADDXAwAAAwAQ2AMAAIkHADDZAwEAtwYAId8DQAC8BgAh4ANAALwGACHsAwEAtwYAIe4DAQC3BgAh7wMBALgGACHxAwEAuAYAIfMDAACKB8wEIvQDIAC6BgAh9QNAALsGACHKBCAAugYAIc0EAACLB80EI-AEAAADACDhBAAAAwAgA5YEAAAxACCXBAAAMQAgmAQAADEAIBQIAACZBwAgCQAAqQcAIAsAAK8HACASAACuBwAgEwAAqgcAIBQAALAHACDWAwAArAcAMNcDAABCABDYAwAArAcAMNkDAQC3BgAh2gMBALcGACHbAwEAtwYAId8DQAC8BgAh4ANAALwGACHzAwAArQeOBCL2AwEAtwYAIYMEAQC4BgAhigQBALcGACGLBAEAtwYAIYwEEACXBwAhBOEDAAAAjgQC4gMAAACOBAjjAwAAAI4ECOgDAACsBo4EIhwIAACZBwAgCQAAqQcAIBEAAKoHACAUAACrBwAgGAAAwwYAIBoAAI4HACAbAADKBgAg1gMAAKUHADDXAwAALwAQ2AMAAKUHADDZAwEAtwYAIdoDAQC3BgAh2wMBALcGACHfA0AAvAYAIeADQAC8BgAh8wMAAKcHgwQi-wMBALcGACH8AwEAtwYAIf0DEACXBwAh_gMQAJcHACH_AxAAlwcAIYEEAACmB4EEIoMEAQC4BgAhhQQAAKgHhQQihgQQAJcHACGHBBAAlwcAIeAEAAAvACDhBAAALwAgFAgAAJkHACAJAACpBwAgDwAAwgYAIBgAAMMGACAbAADKBgAg1gMAAMMHADDXAwAAHQAQ2AMAAMMHADDZAwEAtwYAIdoDAQC3BgAh2wMBALcGACHfA0AAvAYAIeADQAC8BgAh7AMBALcGACHzAwAAxAeeBCL0AyAAugYAIfUDQAC7BgAhnAQBALgGACHgBAAAHQAg4QQAAB0AIAOWBAAANQAglwQAADUAIJgEAAA1ACANEgAArgcAIBkAAJsHACDWAwAAsQcAMNcDAAA9ABDYAwAAsQcAMNkDAQC3BgAh3wNAALwGACHgA0AAvAYAIfYDAQC3BgAhgQQAAKYHgQQigwQBALgGACGOBAEAuAYAIY8EEACXBwAhDhAAALYHACAVAAC0BwAgFgAAtQcAINYDAACyBwAw1wMAADUAENgDAACyBwAw2QMBALcGACHfA0AAvAYAIfcDAQC3BgAh-AMCALMHACH5AxAAlwcAIfoDEACXBwAhiAQBALcGACGJBAEAtwYAIQjhAwIAAAAB4gMCAAAABOMDAgAAAATkAwIAAAAB5QMCAAAAAeYDAgAAAAHnAwIAAAAB6AMCAIYGACEWCAAAmQcAIAkAAKkHACALAACvBwAgEgAArgcAIBMAAKoHACAUAACwBwAg1gMAAKwHADDXAwAAQgAQ2AMAAKwHADDZAwEAtwYAIdoDAQC3BgAh2wMBALcGACHfA0AAvAYAIeADQAC8BgAh8wMAAK0HjgQi9gMBALcGACGDBAEAuAYAIYoEAQC3BgAhiwQBALcGACGMBBAAlwcAIeAEAABCACDhBAAAQgAgDxAAALYHACASAACuBwAgFwAAsAcAINYDAAC3BwAw1wMAADEAENgDAAC3BwAw2QMBALcGACHfA0AAvAYAIfYDAQC3BgAh9wMBALcGACH4AwIAswcAIfkDEACXBwAh-gMQAJcHACHgBAAAMQAg4QQAADEAIBkIAACZBwAgDgAAvwcAIA8AAMIGACAUAACwBwAgGAAAwwYAIBwAAKsHACDWAwAAvQcAMNcDAAAlABDYAwAAvQcAMNkDAQC3BgAh2gMBALcGACHfA0AAvAYAIeADQAC8BgAh7AMBALcGACHtAwEAtwYAIfEDAQC4BgAh8wMAAL4HrQQi9AMgALoGACH1A0AAuwYAIZwEAQC4BgAhqQQBALcGACGqBAEAtwYAIasEEACXBwAh4AQAACUAIOEEAAAlACANEAAAtgcAIBIAAK4HACAXAACwBwAg1gMAALcHADDXAwAAMQAQ2AMAALcHADDZAwEAtwYAId8DQAC8BgAh9gMBALcGACH3AwEAtwYAIfgDAgCzBwAh-QMQAJcHACH6AxAAlwcAIRQIAACZBwAgCQAAqQcAIAsAAK8HACAQAAC2BwAgEQAAqgcAIBIAALoHACDWAwAAuAcAMNcDAAArABDYAwAAuAcAMNkDAQC3BgAh2gMBALcGACHbAwEAtwYAId8DQAC8BgAh9gMBALgGACH3AwEAtwYAIfgDAgCzBwAh-wMBALcGACGDBAEAuAYAIYoEAQC3BgAhmgQAALkHmgQiBOEDAAAAmgQC4gMAAACaBAjjAwAAAJoECOgDAADPBpoEIhwIAACZBwAgCQAAqQcAIBEAAKoHACAUAACrBwAgGAAAwwYAIBoAAI4HACAbAADKBgAg1gMAAKUHADDXAwAALwAQ2AMAAKUHADDZAwEAtwYAIdoDAQC3BgAh2wMBALcGACHfA0AAvAYAIeADQAC8BgAh8wMAAKcHgwQi-wMBALcGACH8AwEAtwYAIf0DEACXBwAh_gMQAJcHACH_AxAAlwcAIYEEAACmB4EEIoMEAQC4BgAhhQQAAKgHhQQihgQQAJcHACGHBBAAlwcAIeAEAAAvACDhBAAALwAgAtoDAQAAAAHtAwEAAAABAtoDAQAAAAGqBAEAAAABFwgAAJkHACAOAAC_BwAgDwAAwgYAIBQAALAHACAYAADDBgAgHAAAqwcAINYDAAC9BwAw1wMAACUAENgDAAC9BwAw2QMBALcGACHaAwEAtwYAId8DQAC8BgAh4ANAALwGACHsAwEAtwYAIe0DAQC3BgAh8QMBALgGACHzAwAAvgetBCL0AyAAugYAIfUDQAC7BgAhnAQBALgGACGpBAEAtwYAIaoEAQC3BgAhqwQQAJcHACEE4QMAAACtBALiAwAAAK0ECOMDAAAArQQI6AMAAO0GrQQiEQgAAJkHACAMAADABgAg1gMAAKIHADDXAwAAYQAQ2AMAAKIHADDZAwEAtwYAIdoDAQC3BgAh3wNAALwGACHgA0AAvAYAIewDAQC3BgAh7QMBALcGACHzAwAAoweuBCL0AyAAugYAIfUDQAC7BgAhnAQBALgGACHgBAAAYQAg4QQAAGEAIAPbAwEAAAAB9wMBAAAAAYoEAQAAAAEQCAAAmQcAIAkAAKkHACALAACvBwAgEAAAtgcAINYDAADBBwAw1wMAACEAENgDAADBBwAw2QMBALcGACHaAwEAtwYAIdsDAQC3BgAh3wNAALwGACHgA0AAvAYAIfcDAQC3BgAh-AMCALMHACGKBAEAtwYAIZsEAgCzBwAhAtsDAQAAAAHsAwEAAAABEggAAJkHACAJAACpBwAgDwAAwgYAIBgAAMMGACAbAADKBgAg1gMAAMMHADDXAwAAHQAQ2AMAAMMHADDZAwEAtwYAIdoDAQC3BgAh2wMBALcGACHfA0AAvAYAIeADQAC8BgAh7AMBALcGACHzAwAAxAeeBCL0AyAAugYAIfUDQAC7BgAhnAQBALgGACEE4QMAAACeBALiAwAAAJ4ECOMDAAAAngQI6AMAANQGngQiAtsDAQAAAAHcAwEAAAABDgMAAKoHACAIAACZBwAgCQAAqQcAINYDAADGBwAw1wMAABkAENgDAADGBwAw2QMBALcGACHaAwEAtwYAIdsDAQC3BgAh3AMBALcGACHdAyAAugYAId4DQAC8BgAh3wNAALwGACHgA0AAvAYAIQLaAwEAAAAB7QMBAAAAARcIAACZBwAgCgAAyAYAIA8AAMIGACAYAADDBgAgHQAAwQYAIB4AAMQGACAfAADKBgAg1gMAAMgHADDXAwAAFQAQ2AMAAMgHADDZAwEAtwYAIdoDAQC3BgAh3wNAALwGACHgA0AAvAYAIewDAQC3BgAh7QMBALcGACHuAwEAuAYAIe8DAQC4BgAh8AMBALgGACHxAwEAuAYAIfMDAADJB_MDIvQDIAC6BgAh9QNAALsGACEE4QMAAADzAwLiAwAAAPMDCOMDAAAA8wMI6AMAAJQG8wMiAtoDAQAAAAHcAwEAAAABDQMAAKoHACAIAACZBwAg1gMAAMsHADDXAwAAEAAQ2AMAAMsHADDZAwEAtwYAIdoDAQC3BgAh3AMBALcGACHdAyAAugYAId8DQAC8BgAh4ANAALwGACGRBAAAzAeRBCKSBEAAvAYAIQThAwAAAJEEAuIDAAAAkQQI4wMAAACRBAjoAwAAsQaRBCIOAwAAmwcAIAgAAJUHACDWAwAAzQcAMNcDAAANABDYAwAAzQcAMNkDAQC3BgAh2gMBALgGACHcAwEAuAYAId8DQAC8BgAhnAQBALgGACHOBAEAtwYAIc8EAQC3BgAh0AQBALgGACHRBAAAzgcAIAzhA4AAAAAB5AOAAAAAAeUDgAAAAAHmA4AAAAAB5wOAAAAAAegDgAAAAAHSBAEAAAAB0wQBAAAAAdQEAQAAAAHVBIAAAAAB1gSAAAAAAdcEgAAAAAECvgQBAAAAAb8EAQAAAAERAwAAqgcAINYDAADQBwAw1wMAAAkAENgDAADQBwAw2QMBALcGACHcAwEAtwYAId8DQAC8BgAh4ANAALwGACG-BAEAtwYAIb8EAQC3BgAhwAQBALgGACHBBAEAuAYAIcIEAQC4BgAhwwRAALsGACHEBEAAuwYAIcUEAQC4BgAhxgQBALgGACEMAwAAqgcAINYDAADRBwAw1wMAAAUAENgDAADRBwAw2QMBALcGACHcAwEAtwYAId8DQAC8BgAh4ANAALwGACG9BEAAvAYAIccEAQC3BgAhyAQBALgGACHJBAEAuAYAIQAAAAHlBAEAAAABAeUEIAAAAAEB5QRAAAAAAQU6AACdEAAgOwAAphAAIOIEAACeEAAg4wQAAKUQACDoBAAAtwQAIAU6AACbEAAgOwAAoxAAIOIEAACcEAAg4wQAAKIQACDoBAAAFwAgBToAAJkQACA7AACgEAAg4gQAAJoQACDjBAAAnxAAIOgEAAC_AQAgAzoAAJ0QACDiBAAAnhAAIOgEAAC3BAAgAzoAAJsQACDiBAAAnBAAIOgEAAAXACADOgAAmRAAIOIEAACaEAAg6AQAAL8BACAAAAAAAeUEAQAAAAEB5QQAAADzAwIB5QRAAAAAAQU6AACSDwAgOwAAlxAAIOIEAACTDwAg4wQAAJYQACDoBAAAtwQAIAs6AADKCQAwOwAAzwkAMOIEAADLCQAw4wQAAMwJADDkBAAAzQkAIOUEAADOCQAw5gQAAM4JADDnBAAAzgkAMOgEAADOCQAw6QQAANAJADDqBAAA0QkAMAs6AACYCQAwOwAAnQkAMOIEAACZCQAw4wQAAJoJADDkBAAAmwkAIOUEAACcCQAw5gQAAJwJADDnBAAAnAkAMOgEAACcCQAw6QQAAJ4JADDqBAAAnwkAMAs6AACGCQAwOwAAiwkAMOIEAACHCQAw4wQAAIgJADDkBAAAiQkAIOUEAACKCQAw5gQAAIoJADDnBAAAigkAMOgEAACKCQAw6QQAAIwJADDqBAAAjQkAMAs6AAD7CAAwOwAA_wgAMOIEAAD8CAAw4wQAAP0IADDkBAAA_ggAIOUEAADGCAAw5gQAAMYIADDnBAAAxggAMOgEAADGCAAw6QQAAIAJADDqBAAAyQgAMAs6AACVCAAwOwAAmggAMOIEAACWCAAw4wQAAJcIADDkBAAAmAgAIOUEAACZCAAw5gQAAJkIADDnBAAAmQgAMOgEAACZCAAw6QQAAJsIADDqBAAAnAgAMAs6AADsBwAwOwAA8QcAMOIEAADtBwAw4wQAAO4HADDkBAAA7wcAIOUEAADwBwAw5gQAAPAHADDnBAAA8AcAMOgEAADwBwAw6QQAAPIHADDqBAAA8wcAMA8IAACRCAAgCwAAkggAIBIAAJAIACATAACTCAAgFAAAlAgAINkDAQAAAAHaAwEAAAAB3wNAAAAAAeADQAAAAAHzAwAAAI4EAvYDAQAAAAGDBAEAAAABigQBAAAAAYsEAQAAAAGMBBAAAAABAgAAAEQAIDoAAI8IACADAAAARAAgOgAAjwgAIDsAAPgHACABMwAAlRAAMBQIAACZBwAgCQAAqQcAIAsAAK8HACASAACuBwAgEwAAqgcAIBQAALAHACDWAwAArAcAMNcDAABCABDYAwAArAcAMNkDAQAAAAHaAwEAtwYAIdsDAQC3BgAh3wNAALwGACHgA0AAvAYAIfMDAACtB44EIvYDAQC3BgAhgwQBALgGACGKBAEAtwYAIYsEAQC3BgAhjAQQAJcHACECAAAARAAgMwAA-AcAIAIAAAD0BwAgMwAA9QcAIA7WAwAA8wcAMNcDAAD0BwAQ2AMAAPMHADDZAwEAtwYAIdoDAQC3BgAh2wMBALcGACHfA0AAvAYAIeADQAC8BgAh8wMAAK0HjgQi9gMBALcGACGDBAEAuAYAIYoEAQC3BgAhiwQBALcGACGMBBAAlwcAIQ7WAwAA8wcAMNcDAAD0BwAQ2AMAAPMHADDZAwEAtwYAIdoDAQC3BgAh2wMBALcGACHfA0AAvAYAIeADQAC8BgAh8wMAAK0HjgQi9gMBALcGACGDBAEAuAYAIYoEAQC3BgAhiwQBALcGACGMBBAAlwcAIQrZAwEA1QcAIdoDAQDVBwAh3wNAANcHACHgA0AA1wcAIfMDAAD3B44EIvYDAQDVBwAhgwQBAOIHACGKBAEA1QcAIYsEAQDVBwAhjAQQAPYHACEF5QQQAAAAAesEEAAAAAHsBBAAAAAB7QQQAAAAAe4EEAAAAAEB5QQAAACOBAIPCAAA-gcAIAsAAPsHACASAAD5BwAgEwAA_AcAIBQAAP0HACDZAwEA1QcAIdoDAQDVBwAh3wNAANcHACHgA0AA1wcAIfMDAAD3B44EIvYDAQDVBwAhgwQBAOIHACGKBAEA1QcAIYsEAQDVBwAhjAQQAPYHACEFOgAA_A8AIDsAAJMQACDiBAAA_Q8AIOMEAACSEAAg6AQAAFgAIAU6AAD6DwAgOwAAkBAAIOIEAAD7DwAg4wQAAI8QACDoBAAAtwQAIAU6AAD4DwAgOwAAjRAAIOIEAAD5DwAg4wQAAIwQACDoBAAAHwAgBToAAPYPACA7AACKEAAg4gQAAPcPACDjBAAAiRAAIOgEAAC_AQAgCzoAAP4HADA7AACDCAAw4gQAAP8HADDjBAAAgAgAMOQEAACBCAAg5QQAAIIIADDmBAAAgggAMOcEAACCCAAw6AQAAIIIADDpBAAAhAgAMOoEAACFCAAwCRAAAI4IACAWAACNCAAg2QMBAAAAAd8DQAAAAAH3AwEAAAAB-AMCAAAAAfkDEAAAAAH6AxAAAAABiQQBAAAAAQIAAAA3ACA6AACMCAAgAwAAADcAIDoAAIwIACA7AACJCAAgATMAAIgQADAOEAAAtgcAIBUAALQHACAWAAC1BwAg1gMAALIHADDXAwAANQAQ2AMAALIHADDZAwEAAAAB3wNAALwGACH3AwEAtwYAIfgDAgCzBwAh-QMQAJcHACH6AxAAlwcAIYgEAQC3BgAhiQQBALcGACECAAAANwAgMwAAiQgAIAIAAACGCAAgMwAAhwgAIAvWAwAAhQgAMNcDAACGCAAQ2AMAAIUIADDZAwEAtwYAId8DQAC8BgAh9wMBALcGACH4AwIAswcAIfkDEACXBwAh-gMQAJcHACGIBAEAtwYAIYkEAQC3BgAhC9YDAACFCAAw1wMAAIYIABDYAwAAhQgAMNkDAQC3BgAh3wNAALwGACH3AwEAtwYAIfgDAgCzBwAh-QMQAJcHACH6AxAAlwcAIYgEAQC3BgAhiQQBALcGACEH2QMBANUHACHfA0AA1wcAIfcDAQDVBwAh-AMCAIgIACH5AxAA9gcAIfoDEAD2BwAhiQQBANUHACEF5QQCAAAAAesEAgAAAAHsBAIAAAAB7QQCAAAAAe4EAgAAAAEJEAAAiwgAIBYAAIoIACDZAwEA1QcAId8DQADXBwAh9wMBANUHACH4AwIAiAgAIfkDEAD2BwAh-gMQAPYHACGJBAEA1QcAIQU6AACAEAAgOwAAhhAAIOIEAACBEAAg4wQAAIUQACDoBAAAMwAgBToAAP4PACA7AACDEAAg4gQAAP8PACDjBAAAghAAIOgEAAAnACAJEAAAjggAIBYAAI0IACDZAwEAAAAB3wNAAAAAAfcDAQAAAAH4AwIAAAAB-QMQAAAAAfoDEAAAAAGJBAEAAAABAzoAAIAQACDiBAAAgRAAIOgEAAAzACADOgAA_g8AIOIEAAD_DwAg6AQAACcAIA8IAACRCAAgCwAAkggAIBIAAJAIACATAACTCAAgFAAAlAgAINkDAQAAAAHaAwEAAAAB3wNAAAAAAeADQAAAAAHzAwAAAI4EAvYDAQAAAAGDBAEAAAABigQBAAAAAYsEAQAAAAGMBBAAAAABAzoAAPwPACDiBAAA_Q8AIOgEAABYACADOgAA-g8AIOIEAAD7DwAg6AQAALcEACADOgAA-A8AIOIEAAD5DwAg6AQAAB8AIAM6AAD2DwAg4gQAAPcPACDoBAAAvwEAIAQ6AAD-BwAw4gQAAP8HADDkBAAAgQgAIOgEAACCCAAwFQgAAPUIACARAAD2CAAgFAAA9wgAIBgAAPgIACAaAAD5CAAgGwAA-ggAINkDAQAAAAHaAwEAAAAB3wNAAAAAAeADQAAAAAHzAwAAAIMEAvsDAQAAAAH8AwEAAAAB_QMQAAAAAf4DEAAAAAH_AxAAAAABgQQAAACBBAKDBAEAAAABhQQAAACFBAKGBBAAAAABhwQQAAAAAQIAAABYACA6AAD0CAAgAwAAAFgAIDoAAPQIACA7AACiCAAgATMAAPUPADAbCAAAmQcAIAkAAKkHACARAACqBwAgFAAAqwcAIBgAAMMGACAaAACOBwAgGwAAygYAINYDAAClBwAw1wMAAC8AENgDAAClBwAw2QMBAAAAAdoDAQC3BgAh2wMBALcGACHfA0AAvAYAIeADQAC8BgAh8wMAAKcHgwQi-wMBALcGACH8AwEAtwYAIf0DEACXBwAh_gMQAJcHACH_AxAAlwcAIYEEAACmB4EEIoMEAQC4BgAhhQQAAKgHhQQihgQQAJcHACGHBBAAlwcAIdkEAACkBwAgAgAAAFgAIDMAAKIIACACAAAAnQgAIDMAAJ4IACAT1gMAAJwIADDXAwAAnQgAENgDAACcCAAw2QMBALcGACHaAwEAtwYAIdsDAQC3BgAh3wNAALwGACHgA0AAvAYAIfMDAACnB4MEIvsDAQC3BgAh_AMBALcGACH9AxAAlwcAIf4DEACXBwAh_wMQAJcHACGBBAAApgeBBCKDBAEAuAYAIYUEAACoB4UEIoYEEACXBwAhhwQQAJcHACET1gMAAJwIADDXAwAAnQgAENgDAACcCAAw2QMBALcGACHaAwEAtwYAIdsDAQC3BgAh3wNAALwGACHgA0AAvAYAIfMDAACnB4MEIvsDAQC3BgAh_AMBALcGACH9AxAAlwcAIf4DEACXBwAh_wMQAJcHACGBBAAApgeBBCKDBAEAuAYAIYUEAACoB4UEIoYEEACXBwAhhwQQAJcHACEP2QMBANUHACHaAwEA1QcAId8DQADXBwAh4ANAANcHACHzAwAAoAiDBCL7AwEA1QcAIfwDAQDVBwAh_QMQAPYHACH-AxAA9gcAIf8DEAD2BwAhgQQAAJ8IgQQigwQBAOIHACGFBAAAoQiFBCKGBBAA9gcAIYcEEAD2BwAhAeUEAAAAgQQCAeUEAAAAgwQCAeUEAAAAhQQCFQgAAKMIACARAACkCAAgFAAApQgAIBgAAKYIACAaAACnCAAgGwAAqAgAINkDAQDVBwAh2gMBANUHACHfA0AA1wcAIeADQADXBwAh8wMAAKAIgwQi-wMBANUHACH8AwEA1QcAIf0DEAD2BwAh_gMQAPYHACH_AxAA9gcAIYEEAACfCIEEIoMEAQDiBwAhhQQAAKEIhQQihgQQAPYHACGHBBAA9gcAIQU6AAC7DwAgOwAA8w8AIOIEAAC8DwAg4wQAAPIPACDoBAAAtwQAIAU6AAC5DwAgOwAA8A8AIOIEAAC6DwAg4wQAAO8PACDoBAAAvwEAIAs6AADZCAAwOwAA3ggAMOIEAADaCAAw4wQAANsIADDkBAAA3AgAIOUEAADdCAAw5gQAAN0IADDnBAAA3QgAMOgEAADdCAAw6QQAAN8IADDqBAAA4AgAMAs6AADCCAAwOwAAxwgAMOIEAADDCAAw4wQAAMQIADDkBAAAxQgAIOUEAADGCAAw5gQAAMYIADDnBAAAxggAMOgEAADGCAAw6QQAAMgIADDqBAAAyQgAMAs6AAC0CAAwOwAAuQgAMOIEAAC1CAAw4wQAALYIADDkBAAAtwgAIOUEAAC4CAAw5gQAALgIADDnBAAAuAgAMOgEAAC4CAAw6QQAALoIADDqBAAAuwgAMAs6AACpCAAwOwAArQgAMOIEAACqCAAw4wQAAKsIADDkBAAArAgAIOUEAADwBwAw5gQAAPAHADDnBAAA8AcAMOgEAADwBwAw6QQAAK4IADDqBAAA8wcAMA8IAACRCAAgCQAAswgAIAsAAJIIACATAACTCAAgFAAAlAgAINkDAQAAAAHaAwEAAAAB2wMBAAAAAd8DQAAAAAHgA0AAAAAB8wMAAACOBAKDBAEAAAABigQBAAAAAYsEAQAAAAGMBBAAAAABAgAAAEQAIDoAALIIACADAAAARAAgOgAAsggAIDsAALAIACABMwAA7g8AMAIAAABEACAzAACwCAAgAgAAAPQHACAzAACvCAAgCtkDAQDVBwAh2gMBANUHACHbAwEA1QcAId8DQADXBwAh4ANAANcHACHzAwAA9weOBCKDBAEA4gcAIYoEAQDVBwAhiwQBANUHACGMBBAA9gcAIQ8IAAD6BwAgCQAAsQgAIAsAAPsHACATAAD8BwAgFAAA_QcAINkDAQDVBwAh2gMBANUHACHbAwEA1QcAId8DQADXBwAh4ANAANcHACHzAwAA9weOBCKDBAEA4gcAIYoEAQDVBwAhiwQBANUHACGMBBAA9gcAIQU6AADpDwAgOwAA7A8AIOIEAADqDwAg4wQAAOsPACDoBAAAFwAgDwgAAJEIACAJAACzCAAgCwAAkggAIBMAAJMIACAUAACUCAAg2QMBAAAAAdoDAQAAAAHbAwEAAAAB3wNAAAAAAeADQAAAAAHzAwAAAI4EAoMEAQAAAAGKBAEAAAABiwQBAAAAAYwEEAAAAAEDOgAA6Q8AIOIEAADqDwAg6AQAABcAIAgZAADBCAAg2QMBAAAAAd8DQAAAAAHgA0AAAAABgQQAAACBBAKDBAEAAAABjgQBAAAAAY8EEAAAAAECAAAAPwAgOgAAwAgAIAMAAAA_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_AQAgDwgAANQIACAJAADVCAAgCwAA1ggAIBAAANcIACARAADYCAAg2QMBAAAAAdoDAQAAAAHbAwEAAAAB3wNAAAAAAfcDAQAAAAH4AwIAAAAB-wMBAAAAAYMEAQAAAAGKBAEAAAABmgQAAACaBAIDOgAA0Q8AIOIEAADSDwAg6AQAALcEACADOgAAzw8AIOIEAADQDwAg6AQAABcAIAM6AADNDwAg4gQAAM4PACDoBAAAHwAgAzoAAMsPACDiBAAAzA8AIOgEAAAnACADOgAAyQ8AIOIEAADKDwAg6AQAAL8BACAIEAAA8ggAIBcAAPMIACDZAwEAAAAB3wNAAAAAAfcDAQAAAAH4AwIAAAAB-QMQAAAAAfoDEAAAAAECAAAAMwAgOgAA8QgAIAMAAAAzACA6AADxCAAgOwAA4wgAIAEzAADIDwAwDRAAALYHACASAACuBwAgFwAAsAcAINYDAAC3BwAw1wMAADEAENgDAAC3BwAw2QMBAAAAAd8DQAC8BgAh9gMBALcGACH3AwEAtwYAIfgDAgCzBwAh-QMQAJcHACH6AxAAlwcAIQIAAAAzACAzAADjCAAgAgAAAOEIACAzAADiCAAgCtYDAADgCAAw1wMAAOEIABDYAwAA4AgAMNkDAQC3BgAh3wNAALwGACH2AwEAtwYAIfcDAQC3BgAh-AMCALMHACH5AxAAlwcAIfoDEACXBwAhCtYDAADgCAAw1wMAAOEIABDYAwAA4AgAMNkDAQC3BgAh3wNAALwGACH2AwEAtwYAIfcDAQC3BgAh-AMCALMHACH5AxAAlwcAIfoDEACXBwAhBtkDAQDVBwAh3wNAANcHACH3AwEA1QcAIfgDAgCICAAh-QMQAPYHACH6AxAA9gcAIQgQAADkCAAgFwAA5QgAINkDAQDVBwAh3wNAANcHACH3AwEA1QcAIfgDAgCICAAh-QMQAPYHACH6AxAA9gcAIQU6AAC9DwAgOwAAxg8AIOIEAAC-DwAg4wQAAMUPACDoBAAAJwAgCzoAAOYIADA7AADqCAAw4gQAAOcIADDjBAAA6AgAMOQEAADpCAAg5QQAAIIIADDmBAAAgggAMOcEAACCCAAw6AQAAIIIADDpBAAA6wgAMOoEAACFCAAwCRAAAI4IACAVAADwCAAg2QMBAAAAAd8DQAAAAAH3AwEAAAAB-AMCAAAAAfkDEAAAAAH6AxAAAAABiAQBAAAAAQIAAAA3ACA6AADvCAAgAwAAADcAIDoAAO8IACA7AADtCAAgATMAAMQPADACAAAANwAgMwAA7QgAIAIAAACGCAAgMwAA7AgAIAfZAwEA1QcAId8DQADXBwAh9wMBANUHACH4AwIAiAgAIfkDEAD2BwAh-gMQAPYHACGIBAEA1QcAIQkQAACLCAAgFQAA7ggAINkDAQDVBwAh3wNAANcHACH3AwEA1QcAIfgDAgCICAAh-QMQAPYHACH6AxAA9gcAIYgEAQDVBwAhBToAAL8PACA7AADCDwAg4gQAAMAPACDjBAAAwQ8AIOgEAABEACAJEAAAjggAIBUAAPAIACDZAwEAAAAB3wNAAAAAAfcDAQAAAAH4AwIAAAAB-QMQAAAAAfoDEAAAAAGIBAEAAAABAzoAAL8PACDiBAAAwA8AIOgEAABEACAIEAAA8ggAIBcAAPMIACDZAwEAAAAB3wNAAAAAAfcDAQAAAAH4AwIAAAAB-QMQAAAAAfoDEAAAAAEDOgAAvQ8AIOIEAAC-DwAg6AQAACcAIAQ6AADmCAAw4gQAAOcIADDkBAAA6QgAIOgEAACCCAAwFQgAAPUIACARAAD2CAAgFAAA9wgAIBgAAPgIACAaAAD5CAAgGwAA-ggAINkDAQAAAAHaAwEAAAAB3wNAAAAAAeADQAAAAAHzAwAAAIMEAvsDAQAAAAH8AwEAAAAB_QMQAAAAAf4DEAAAAAH_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_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gkAMOIEAADLCQAw5AQAAM0JACDoBAAAzgkAMAQ6AACYCQAw4gQAAJkJADDkBAAAmwkAIOgEAACcCQAwBDoAAIYJADDiBAAAhwkAMOQEAACJCQAg6AQAAIoJADAEOgAA-wgAMOIEAAD8CAAw5AQAAP4IACDoBAAAxggAMAQ6AACVCAAw4gQAAJYIADDkBAAAmAgAIOgEAACZCAAwBDoAAOwHADDiBAAA7QcAMOQEAADvBwAg6AQAAPAHADAAAAAAAAU6AACNDwAgOwAAkA8AIOIEAACODwAg4wQAAI8PACDoBAAAWAAgAzoAAI0PACDiBAAAjg8AIOgEAABYACAAAAAAAAU6AACIDwAgOwAAiw8AIOIEAACJDwAg4wQAAIoPACDoBAAAFwAgAzoAAIgPACDiBAAAiQ8AIOgEAAAXACAAAAAAAAAAAAAAAAAAAAAFOgAAgw8AIDsAAIYPACDiBAAAhA8AIOMEAACFDwAg6AQAAFgAIAM6AACDDwAg4gQAAIQPACDoBAAAWAAgAAAAAeUEAAAAkQQCBToAAPsOACA7AACBDwAg4gQAAPwOACDjBAAAgA8AIOgEAAC3BAAgBToAAPkOACA7AAD-DgAg4gQAAPoOACDjBAAA_Q4AIOgEAAC_AQAgAzoAAPsOACDiBAAA_A4AIOgEAAC3BAAgAzoAAPkOACDiBAAA-g4AIOgEAAC_AQAgAAAAAeUEAAAAlQQCCzoAAJMMADA7AACYDAAw4gQAAJQMADDjBAAAlQwAMOQEAACWDAAg5QQAAJcMADDmBAAAlwwAMOcEAACXDAAw6AQAAJcMADDpBAAAmQwAMOoEAACaDAAwCzoAAIcMADA7AACMDAAw4gQAAIgMADDjBAAAiQwAMOQEAACKDAAg5QQAAIsMADDmBAAAiwwAMOcEAACLDAAw6AQAAIsMADDpBAAAjQwAMOoEAACODAAwCzoAAO0LADA7AADyCwAw4gQAAO4LADDjBAAA7wsAMOQEAADwCwAg5QQAAPELADDmBAAA8QsAMOcEAADxCwAw6AQAAPELADDpBAAA8wsAMOoEAAD0CwAwCzoAALILADA7AAC3CwAw4gQAALMLADDjBAAAtAsAMOQEAAC1CwAg5QQAALYLADDmBAAAtgsAMOcEAAC2CwAw6AQAALYLADDpBAAAuAsAMOoEAAC5CwAwCzoAAKcLADA7AACrCwAw4gQAAKgLADDjBAAAqQsAMOQEAACqCwAg5QQAAJwJADDmBAAAnAkAMOcEAACcCQAw6AQAAJwJADDpBAAArAsAMOoEAACfCQAwCzoAAJ4LADA7AACiCwAw4gQAAJ8LADDjBAAAoAsAMOQEAAChCwAg5QQAAIoJADDmBAAAigkAMOcEAACKCQAw6AQAAIoJADDpBAAAowsAMOoEAACNCQAwCzoAAJULADA7AACZCwAw4gQAAJYLADDjBAAAlwsAMOQEAACYCwAg5QQAAMYIADDmBAAAxggAMOcEAADGCAAw6AQAAMYIADDpBAAAmgsAMOoEAADJCAAwCzoAAIwLADA7AACQCwAw4gQAAI0LADDjBAAAjgsAMOQEAACPCwAg5QQAAJkIADDmBAAAmQgAMOcEAACZCAAw6AQAAJkIADDpBAAAkQsAMOoEAACcCAAwCzoAAPIKADA7AAD3CgAw4gQAAPMKADDjBAAA9AoAMOQEAAD1CgAg5QQAAPYKADDmBAAA9goAMOcEAAD2CgAw6AQAAPYKADDpBAAA-AoAMOoEAAD5CgAwCzoAANYKADA7AADbCgAw4gQAANcKADDjBAAA2AoAMOQEAADZCgAg5QQAANoKADDmBAAA2goAMOcEAADaCgAw6AQAANoKADDpBAAA3AoAMOoEAADdCgAwCzoAAMUKADA7AADKCgAw4gQAAMYKADDjBAAAxwoAMOQEAADICgAg5QQAAMkKADDmBAAAyQoAMOcEAADJCgAw6AQAAMkKADDpBAAAywoAMOoEAADMCgAwCzoAALwKADA7AADACgAw4gQAAL0KADDjBAAAvgoAMOQEAAC_CgAg5QQAAM4JADDmBAAAzgkAMOcEAADOCQAw6AQAAM4JADDpBAAAwQoAMOoEAADRCQAwCzoAAK4KADA7AACzCgAw4gQAAK8KADDjBAAAsAoAMOQEAACxCgAg5QQAALIKADDmBAAAsgoAMOcEAACyCgAw6AQAALIKADDpBAAAtAoAMOoEAAC1CgAwCzoAAKUKADA7AACpCgAw4gQAAKYKADDjBAAApwoAMOQEAACoCgAg5QQAAPAHADDmBAAA8AcAMOcEAADwBwAw6AQAAPAHADDpBAAAqgoAMOoEAADzBwAwCzoAAJcKADA7AACcCgAw4gQAAJgKADDjBAAAmQoAMOQEAACaCgAg5QQAAJsKADDmBAAAmwoAMOcEAACbCgAw6AQAAJsKADDpBAAAnQoAMOoEAACeCgAwCg4BAAAAAdkDAQAAAAHfA0AAAAAB4ANAAAAAAewDAQAAAAHuAwEAAAAB8wMAAACjBAKeBAEAAAABoAQAAACgBAKhBAEAAAABAgAAAIMBACA6AACkCgAgAwAAAIMBACA6AACkCgAgOwAAowoAIAEzAAD4DgAwDwgAAJUHACAOAQC3BgAh1gMAAJIHADDXAwAAgQEAENgDAACSBwAw2QMBAAAAAdoDAQC4BgAh3wNAALwGACHgA0AAvAYAIewDAQC3BgAh7gMBALcGACHzAwAAlAejBCKeBAEAtwYAIaAEAACTB6AEIqEEAQC3BgAhAgAAAIMBACAzAACjCgAgAgAAAJ8KACAzAACgCgAgDg4BALcGACHWAwAAngoAMNcDAACfCgAQ2AMAAJ4KADDZAwEAtwYAIdoDAQC4BgAh3wNAALwGACHgA0AAvAYAIewDAQC3BgAh7gMBALcGACHzAwAAlAejBCKeBAEAtwYAIaAEAACTB6AEIqEEAQC3BgAhDg4BALcGACHWAwAAngoAMNcDAACfCgAQ2AMAAJ4KADDZAwEAtwYAIdoDAQC4BgAh3wNAALwGACHgA0AAvAYAIewDAQC3BgAh7gMBALcGACHzAwAAlAejBCKeBAEAtwYAIaAEAACTB6AEIqEEAQC3BgAhCg4BANUHACHZAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIe4DAQDVBwAh8wMAAKIKowQingQBANUHACGgBAAAoQqgBCKhBAEA1QcAIQHlBAAAAKAEAgHlBAAAAKMEAgoOAQDVBwAh2QMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHuAwEA1QcAIfMDAACiCqMEIp4EAQDVBwAhoAQAAKEKoAQioQQBANUHACEKDgEAAAAB2QMBAAAAAd8DQAAAAAHgA0AAAAAB7AMBAAAAAe4DAQAAAAHzAwAAAKMEAp4EAQAAAAGgBAAAAKAEAqEEAQAAAAEPCQAAswgAIAsAAJIIACASAACQCAAgEwAAkwgAIBQAAJQIACDZAwEAAAAB2wMBAAAAAd8DQAAAAAHgA0AAAAAB8wMAAACOBAL2AwEAAAABgwQBAAAAAYoEAQAAAAGLBAEAAAABjAQQAAAAAQIAAABEACA6AACtCgAgAwAAAEQAIDoAAK0KACA7AACsCgAgATMAAPcOADACAAAARAAgMwAArAoAIAIAAAD0BwAgMwAAqwoAIArZAwEA1QcAIdsDAQDVBwAh3wNAANcHACHgA0AA1wcAIfMDAAD3B44EIvYDAQDVBwAhgwQBAOIHACGKBAEA1QcAIYsEAQDVBwAhjAQQAPYHACEPCQAAsQgAIAsAAPsHACASAAD5BwAgEwAA_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_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-wMBAAAAAfwDAQAAAAH9AxAAAAAB_gMQAAAAAf8DEAAAAAGBBAAAAIEEAoMEAQAAAAGFBAAAAIUEAoYEEAAAAAGHBBAAAAABAgAAAFgAIDoAAJQLACADAAAAWAAgOgAAlAsAIDsAAJMLACABMwAA0Q4AMAIAAABYACAzAACTCwAgAgAAAJ0IACAzAACSCwAgD9kDAQDVBwAh2wMBANUHACHfA0AA1wcAIeADQADXBwAh8wMAAKAIgwQi-wMBANUHACH8AwEA1QcAIf0DEAD2BwAh_gMQAPYHACH_AxAA9gcAIYEEAACfCIEEIoMEAQDiBwAhhQQAAKEIhQQihgQQAPYHACGHBBAA9gcAIRUJAADpCQAgEQAApAgAIBQAAKUIACAYAACmCAAgGgAApwgAIBsAAKgIACDZAwEA1QcAIdsDAQDVBwAh3wNAANcHACHgA0AA1wcAIfMDAACgCIMEIvsDAQDVBwAh_AMBANUHACH9AxAA9gcAIf4DEAD2BwAh_wMQAPYHACGBBAAAnwiBBCKDBAEA4gcAIYUEAAChCIUEIoYEEAD2BwAhhwQQAPYHACEVCQAA6gkAIBEAAPYIACAUAAD3CAAgGAAA-AgAIBoAAPkIACAbAAD6CAAg2QMBAAAAAdsDAQAAAAHfA0AAAAAB4ANAAAAAAfMDAAAAgwQC-wMBAAAAAfwDAQAAAAH9AxAAAAAB_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_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_gsAMOIEAAD7CwAw4wQAAPwLADDkBAAA_QsAIOUEAAC2CwAw5gQAALYLADDnBAAAtgsAMOgEAAC2CwAw6QQAAP8LADDqBAAAuQsAMBIIAACEDAAgDwAA6QsAIBQAAOwLACAYAADqCwAgHAAA6wsAINkDAQAAAAHaAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7QMBAAAAAfEDAQAAAAHzAwAAAK0EAvQDIAAAAAH1A0AAAAABnAQBAAAAAaoEAQAAAAGrBBAAAAABAgAAACcAIDoAAIMMACADAAAAJwAgOgAAgwwAIDsAAIEMACABMwAAvQ4AMAIAAAAnACAzAACBDAAgAgAAALoLACAzAACADAAgDdkDAQDVBwAh2gMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHtAwEA1QcAIfEDAQDiBwAh8wMAALwLrQQi9AMgANYHACH1A0AA5AcAIZwEAQDiBwAhqgQBANUHACGrBBAA9gcAIRIIAACCDAAgDwAAvwsAIBQAAMILACAYAADACwAgHAAAwQsAINkDAQDVBwAh2gMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHtAwEA1QcAIfEDAQDiBwAh8wMAALwLrQQi9AMgANYHACH1A0AA5AcAIZwEAQDiBwAhqgQBANUHACGrBBAA9gcAIQU6AAC4DgAgOwAAuw4AIOIEAAC5DgAg4wQAALoOACDoBAAAtwQAIBIIAACEDAAgDwAA6QsAIBQAAOwLACAYAADqCwAgHAAA6wsAINkDAQAAAAHaAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7QMBAAAAAfEDAQAAAAHzAwAAAK0EAvQDIAAAAAH1A0AAAAABnAQBAAAAAaoEAQAAAAGrBBAAAAABAzoAALgOACDiBAAAuQ4AIOgEAAC3BAAgCgwAAIYMACDZAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7QMBAAAAAfMDAAAArgQC9AMgAAAAAfUDQAAAAAGcBAEAAAABBDoAAPoLADDiBAAA-wsAMOQEAAD9CwAg6AQAALYLADASCgAA1wkAIA8AANkJACAYAADaCQAgHQAA2AkAIB4AANsJACAfAADcCQAg2QMBAAAAAd8DQAAAAAHgA0AAAAAB7AMBAAAAAe0DAQAAAAHuAwEAAAAB7wMBAAAAAfADAQAAAAHxAwEAAAAB8wMAAADzAwL0AyAAAAAB9QNAAAAAAQIAAAAXACA6AACSDAAgAwAAABcAIDoAAJIMACA7AACRDAAgATMAALcOADAYCAAAmQcAIAoAAMgGACAPAADCBgAgGAAAwwYAIB0AAMEGACAeAADEBgAgHwAAygYAINYDAADIBwAw1wMAABUAENgDAADIBwAw2QMBAAAAAdoDAQC3BgAh3wNAALwGACHgA0AAvAYAIewDAQC3BgAh7QMBALcGACHuAwEAuAYAIe8DAQC4BgAh8AMBALgGACHxAwEAuAYAIfMDAADJB_MDIvQDIAC6BgAh9QNAALsGACHYBAAAxwcAIAIAAAAXACAzAACRDAAgAgAAAI8MACAzAACQDAAgENYDAACODAAw1wMAAI8MABDYAwAAjgwAMNkDAQC3BgAh2gMBALcGACHfA0AAvAYAIeADQAC8BgAh7AMBALcGACHtAwEAtwYAIe4DAQC4BgAh7wMBALgGACHwAwEAuAYAIfEDAQC4BgAh8wMAAMkH8wMi9AMgALoGACH1A0AAuwYAIRDWAwAAjgwAMNcDAACPDAAQ2AMAAI4MADDZAwEAtwYAIdoDAQC3BgAh3wNAALwGACHgA0AAvAYAIewDAQC3BgAh7QMBALcGACHuAwEAuAYAIe8DAQC4BgAh8AMBALgGACHxAwEAuAYAIfMDAADJB_MDIvQDIAC6BgAh9QNAALsGACEM2QMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHtAwEA1QcAIe4DAQDiBwAh7wMBAOIHACHwAwEA4gcAIfEDAQDiBwAh8wMAAOMH8wMi9AMgANYHACH1A0AA5AcAIRIKAADmBwAgDwAA6AcAIBgAAOkHACAdAADnBwAgHgAA6gcAIB8AAOsHACDZAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIe0DAQDVBwAh7gMBAOIHACHvAwEA4gcAIfADAQDiBwAh8QMBAOIHACHzAwAA4wfzAyL0AyAA1gcAIfUDQADkBwAhEgoAANcJACAPAADZCQAgGAAA2gkAIB0AANgJACAeAADbCQAgHwAA3AkAINkDAQAAAAHfA0AAAAAB4ANAAAAAAewDAQAAAAHtAwEAAAAB7gMBAAAAAe8DAQAAAAHwAwEAAAAB8QMBAAAAAfMDAAAA8wMC9AMgAAAAAfUDQAAAAAEIAwAAgwoAINkDAQAAAAHcAwEAAAAB3QMgAAAAAd8DQAAAAAHgA0AAAAABkQQAAACRBAKSBEAAAAABAgAAABIAIDoAAJ4MACADAAAAEgAgOgAAngwAIDsAAJ0MACABMwAAtg4AMA4DAACqBwAgCAAAmQcAINYDAADLBwAw1wMAABAAENgDAADLBwAw2QMBAAAAAdoDAQC3BgAh3AMBALcGACHdAyAAugYAId8DQAC8BgAh4ANAALwGACGRBAAAzAeRBCKSBEAAvAYAId4EAADKBwAgAgAAABIAIDMAAJ0MACACAAAAmwwAIDMAAJwMACAL1gMAAJoMADDXAwAAmwwAENgDAACaDAAw2QMBALcGACHaAwEAtwYAIdwDAQC3BgAh3QMgALoGACHfA0AAvAYAIeADQAC8BgAhkQQAAMwHkQQikgRAALwGACEL1gMAAJoMADDXAwAAmwwAENgDAACaDAAw2QMBALcGACHaAwEAtwYAIdwDAQC3BgAh3QMgALoGACHfA0AAvAYAIeADQAC8BgAhkQQAAMwHkQQikgRAALwGACEH2QMBANUHACHcAwEA1QcAId0DIADWBwAh3wNAANcHACHgA0AA1wcAIZEEAAD_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-gcAIAkAALEIACALAAD7BwAgEgAA-QcAIBQAAP0HACDZAwEA1QcAIdoDAQDVBwAh2wMBANUHACHfA0AA1wcAIeADQADXBwAh8wMAAPcHjgQi9gMBANUHACGDBAEA4gcAIYoEAQDVBwAhjAQQAPYHACEPCAAAkQgAIAkAALMIACALAACSCAAgEgAAkAgAIBQAAJQIACDZAwEAAAAB2gMBAAAAAdsDAQAAAAHfA0AAAAAB4ANAAAAAAfMDAAAAjgQC9gMBAAAAAYMEAQAAAAGKBAEAAAABjAQQAAAAAQgSAAD7CQAg2QMBAAAAAd8DQAAAAAHgA0AAAAAB9gMBAAAAAYEEAAAAgQQCgwQBAAAAAY8EEAAAAAECAAAAPwAgOgAAoA0AIAMAAAA_ACA6AACgDQAgOwAAnw0AIAEzAACbDgAwAgAAAD8AIDMAAJ8NACACAAAAvAgAIDMAAJ4NACAH2QMBANUHACHfA0AA1wcAIeADQADXBwAh9gMBANUHACGBBAAAnwiBBCKDBAEA4gcAIY8EEAD2BwAhCBIAAPoJACDZAwEA1QcAId8DQADXBwAh4ANAANcHACH2AwEA1QcAIYEEAACfCIEEIoMEAQDiBwAhjwQQAPYHACEIEgAA-wkAINkDAQAAAAHfA0AAAAAB4ANAAAAAAfYDAQAAAAGBBAAAAIEEAoMEAQAAAAGPBBAAAAABDQgAAO4KACAjAADUCgAg2QMBAAAAAdoDAQAAAAHfA0AAAAAB4ANAAAAAAfMDAAAAsQQCgwQBAAAAAY8EEAAAAAGuBAEAAAABrwQBAAAAAbEEAQAAAAGyBAEAAAABAgAAAHYAIDoAAKkNACADAAAAdgAgOgAAqQ0AIDsAAKgNACABMwAAmg4AMAIAAAB2ACAzAACoDQAgAgAAAM0KACAzAACnDQAgC9kDAQDVBwAh2gMBANUHACHfA0AA1wcAIeADQADXBwAh8wMAAM8KsQQigwQBAOIHACGPBBAA9gcAIa4EAQDiBwAhrwQBANUHACGxBAEA4gcAIbIEAQDiBwAhDQgAAOwKACAjAADRCgAg2QMBANUHACHaAwEA1QcAId8DQADXBwAh4ANAANcHACHzAwAAzwqxBCKDBAEA4gcAIY8EEAD2BwAhrgQBAOIHACGvBAEA1QcAIbEEAQDiBwAhsgQBAOIHACENCAAA7goAICMAANQKACDZAwEAAAAB2gMBAAAAAd8DQAAAAAHgA0AAAAAB8wMAAACxBAKDBAEAAAABjwQQAAAAAa4EAQAAAAGvBAEAAAABsQQBAAAAAbIEAQAAAAEPCAAA1AgAIAkAANUIACALAADWCAAgEAAA1wgAIBIAAIUJACDZAwEAAAAB2gMBAAAAAdsDAQAAAAHfA0AAAAAB9gMBAAAAAfcDAQAAAAH4AwIAAAABgwQBAAAAAYoEAQAAAAGaBAAAAJoEAgIAAAAtACA6AACyDQAgAwAAAC0AIDoAALINACA7AACxDQAgATMAAJkOADACAAAALQAgMwAAsQ0AIAIAAADKCAAgMwAAsA0AIArZAwEA1QcAIdoDAQDVBwAh2wMBANUHACHfA0AA1wcAIfYDAQDiBwAh9wMBANUHACH4AwIAiAgAIYMEAQDiBwAhigQBANUHACGaBAAAzAiaBCIPCAAAzggAIAkAAM8IACALAADQCAAgEAAA0QgAIBIAAIMJACDZAwEA1QcAIdoDAQDVBwAh2wMBANUHACHfA0AA1wcAIfYDAQDiBwAh9wMBANUHACH4AwIAiAgAIYMEAQDiBwAhigQBANUHACGaBAAAzAiaBCIPCAAA1AgAIAkAANUIACALAADWCAAgEAAA1wgAIBIAAIUJACDZAwEAAAAB2gMBAAAAAdsDAQAAAAHfA0AAAAAB9gMBAAAAAfcDAQAAAAH4AwIAAAABgwQBAAAAAYoEAQAAAAGaBAAAAJoEAhUIAAD1CAAgCQAA6gkAIBQAAPcIACAYAAD4CAAgGgAA-QgAIBsAAPoIACDZAwEAAAAB2gMBAAAAAdsDAQAAAAHfA0AAAAAB4ANAAAAAAfMDAAAAgwQC_AMBAAAAAf0DEAAAAAH-AxAAAAAB_wMQAAAAAYEEAAAAgQQCgwQBAAAAAYUEAAAAhQQChgQQAAAAAYcEEAAAAAECAAAAWAAgOgAAuw0AIAMAAABYACA6AAC7DQAgOwAAug0AIAEzAACYDgAwAgAAAFgAIDMAALoNACACAAAAnQgAIDMAALkNACAP2QMBANUHACHaAwEA1QcAIdsDAQDVBwAh3wNAANcHACHgA0AA1wcAIfMDAACgCIMEIvwDAQDVBwAh_QMQAPYHACH-AxAA9gcAIf8DEAD2BwAhgQQAAJ8IgQQigwQBAOIHACGFBAAAoQiFBCKGBBAA9gcAIYcEEAD2BwAhFQgAAKMIACAJAADpCQAgFAAApQgAIBgAAKYIACAaAACnCAAgGwAAqAgAINkDAQDVBwAh2gMBANUHACHbAwEA1QcAId8DQADXBwAh4ANAANcHACHzAwAAoAiDBCL8AwEA1QcAIf0DEAD2BwAh_gMQAPYHACH_AxAA9gcAIYEEAACfCIEEIoMEAQDiBwAhhQQAAKEIhQQihgQQAPYHACGHBBAA9gcAIRUIAAD1CAAgCQAA6gkAIBQAAPcIACAYAAD4CAAgGgAA-QgAIBsAAPoIACDZAwEAAAAB2gMBAAAAAdsDAQAAAAHfA0AAAAAB4ANAAAAAAfMDAAAAgwQC_AMBAAAAAf0DEAAAAAH-AxAAAAAB_wMQAAAAAYEEAAAAgQQCgwQBAAAAAYUEAAAAhQQChgQQAAAAAYcEEAAAAAEJCAAA2wcAIAkAANwHACDZAwEAAAAB2gMBAAAAAdsDAQAAAAHdAyAAAAAB3gNAAAAAAd8DQAAAAAHgA0AAAAABAgAAABsAIDoAAMQNACADAAAAGwAgOgAAxA0AIDsAAMMNACABMwAAlw4AMAIAAAAbACAzAADDDQAgAgAAANIJACAzAADCDQAgB9kDAQDVBwAh2gMBANUHACHbAwEA1QcAId0DIADWBwAh3gNAANcHACHfA0AA1wcAIeADQADXBwAhCQgAANgHACAJAADZBwAg2QMBANUHACHaAwEA1QcAIdsDAQDVBwAh3QMgANYHACHeA0AA1wcAId8DQADXBwAh4ANAANcHACEJCAAA2wcAIAkAANwHACDZAwEAAAAB2gMBAAAAAdsDAQAAAAHdAyAAAAAB3gNAAAAAAd8DQAAAAAHgA0AAAAABCAgAAIIKACDZAwEAAAAB2gMBAAAAAd0DIAAAAAHfA0AAAAAB4ANAAAAAAZEEAAAAkQQCkgRAAAAAAQIAAAASACA6AADNDQAgAwAAABIAIDoAAM0NACA7AADMDQAgATMAAJYOADACAAAAEgAgMwAAzA0AIAIAAACbDAAgMwAAyw0AIAfZAwEA1QcAIdoDAQDVBwAh3QMgANYHACHfA0AA1wcAIeADQADXBwAhkQQAAP8JkQQikgRAANcHACEICAAAgAoAINkDAQDVBwAh2gMBANUHACHdAyAA1gcAId8DQADXBwAh4ANAANcHACGRBAAA_wmRBCKSBEAA1wcAIQgIAACCCgAg2QMBAAAAAdoDAQAAAAHdAyAAAAAB3wNAAAAAAeADQAAAAAGRBAAAAJEEApIEQAAAAAEJCAAA2A0AINkDAQAAAAHaAwEAAAAB3wNAAAAAAZwEAQAAAAHOBAEAAAABzwQBAAAAAdAEAQAAAAHRBIAAAAABAgAAAAEAIDoAANcNACADAAAAAQAgOgAA1w0AIDsAANUNACABMwAAlQ4AMAIAAAABACAzAADVDQAgAgAAALYKACAzAADUDQAgCNkDAQDVBwAh2gMBAOIHACHfA0AA1wcAIZwEAQDiBwAhzgQBANUHACHPBAEA1QcAIdAEAQDiBwAh0QSAAAAAAQkIAADWDQAg2QMBANUHACHaAwEA4gcAId8DQADXBwAhnAQBAOIHACHOBAEA1QcAIc8EAQDVBwAh0AQBAOIHACHRBIAAAAABBzoAAJAOACA7AACTDgAg4gQAAJEOACDjBAAAkg4AIOYEAABuACDnBAAAbgAg6AQAALcEACAJCAAA2A0AINkDAQAAAAHaAwEAAAAB3wNAAAAAAZwEAQAAAAHOBAEAAAABzwQBAAAAAdAEAQAAAAHRBIAAAAABAzoAAJAOACDiBAAAkQ4AIOgEAAC3BAAgDNkDAQAAAAHfA0AAAAAB4ANAAAAAAb4EAQAAAAG_BAEAAAABwAQBAAAAAcEEAQAAAAHCBAEAAAABwwRAAAAAAcQEQAAAAAHFBAEAAAABxgQBAAAAAQIAAAALACA6AADkDQAgAwAAAAsAIDoAAOQNACA7AADjDQAgATMAAI8OADASAwAAqgcAINYDAADQBwAw1wMAAAkAENgDAADQBwAw2QMBAAAAAdwDAQC3BgAh3wNAALwGACHgA0AAvAYAIb4EAQC3BgAhvwQBALcGACHABAEAuAYAIcEEAQC4BgAhwgQBALgGACHDBEAAuwYAIcQEQAC7BgAhxQQBALgGACHGBAEAuAYAId8EAADPBwAgAgAAAAsAIDMAAOMNACACAAAA4Q0AIDMAAOINACAQ1gMAAOANADDXAwAA4Q0AENgDAADgDQAw2QMBALcGACHcAwEAtwYAId8DQAC8BgAh4ANAALwGACG-BAEAtwYAIb8EAQC3BgAhwAQBALgGACHBBAEAuAYAIcIEAQC4BgAhwwRAALsGACHEBEAAuwYAIcUEAQC4BgAhxgQBALgGACEQ1gMAAOANADDXAwAA4Q0AENgDAADgDQAw2QMBALcGACHcAwEAtwYAId8DQAC8BgAh4ANAALwGACG-BAEAtwYAIb8EAQC3BgAhwAQBALgGACHBBAEAuAYAIcIEAQC4BgAhwwRAALsGACHEBEAAuwYAIcUEAQC4BgAhxgQBALgGACEM2QMBANUHACHfA0AA1wcAIeADQADXBwAhvgQBANUHACG_BAEA1QcAIcAEAQDiBwAhwQQBAOIHACHCBAEA4gcAIcMEQADkBwAhxARAAOQHACHFBAEA4gcAIcYEAQDiBwAhDNkDAQDVBwAh3wNAANcHACHgA0AA1wcAIb4EAQDVBwAhvwQBANUHACHABAEA4gcAIcEEAQDiBwAhwgQBAOIHACHDBEAA5AcAIcQEQADkBwAhxQQBAOIHACHGBAEA4gcAIQzZAwEAAAAB3wNAAAAAAeADQAAAAAG-BAEAAAABvwQBAAAAAcAEAQAAAAHBBAEAAAABwgQBAAAAAcMEQAAAAAHEBEAAAAABxQQBAAAAAcYEAQAAAAEH2QMBAAAAAd8DQAAAAAHgA0AAAAABvQRAAAAAAccEAQAAAAHIBAEAAAAByQQBAAAAAQIAAAAHACA6AADwDQAgAwAAAAcAIDoAAPANACA7AADvDQAgATMAAI4OADAMAwAAqgcAINYDAADRBwAw1wMAAAUAENgDAADRBwAw2QMBAAAAAdwDAQC3BgAh3wNAALwGACHgA0AAvAYAIb0EQAC8BgAhxwQBAAAAAcgEAQC4BgAhyQQBALgGACECAAAABwAgMwAA7w0AIAIAAADtDQAgMwAA7g0AIAvWAwAA7A0AMNcDAADtDQAQ2AMAAOwNADDZAwEAtwYAIdwDAQC3BgAh3wNAALwGACHgA0AAvAYAIb0EQAC8BgAhxwQBALcGACHIBAEAuAYAIckEAQC4BgAhC9YDAADsDQAw1wMAAO0NABDYAwAA7A0AMNkDAQC3BgAh3AMBALcGACHfA0AAvAYAIeADQAC8BgAhvQRAALwGACHHBAEAtwYAIcgEAQC4BgAhyQQBALgGACEH2QMBANUHACHfA0AA1wcAIeADQADXBwAhvQRAANcHACHHBAEA1QcAIcgEAQDiBwAhyQQBAOIHACEH2QMBANUHACHfA0AA1wcAIeADQADXBwAhvQRAANcHACHHBAEA1QcAIcgEAQDiBwAhyQQBAOIHACEH2QMBAAAAAd8DQAAAAAHgA0AAAAABvQRAAAAAAccEAQAAAAHIBAEAAAAByQQBAAAAAQQ6AADlDQAw4gQAAOYNADDkBAAA6A0AIOgEAADpDQAwBDoAANkNADDiBAAA2g0AMOQEAADcDQAg6AQAAN0NADAEOgAAzg0AMOIEAADPDQAw5AQAANENACDoBAAAsgoAMAQ6AADFDQAw4gQAAMYNADDkBAAAyA0AIOgEAACXDAAwBDoAALwNADDiBAAAvQ0AMOQEAAC_DQAg6AQAAM4JADAEOgAAsw0AMOIEAAC0DQAw5AQAALYNACDoBAAAmQgAMAQ6AACqDQAw4gQAAKsNADDkBAAArQ0AIOgEAADGCAAwBDoAAKENADDiBAAAog0AMOQEAACkDQAg6AQAAMkKADAEOgAAmA0AMOIEAACZDQAw5AQAAJsNACDoBAAAuAgAMAQ6AACPDQAw4gQAAJANADDkBAAAkg0AIOgEAADwBwAwAAAAAAAAFQYAALoMACAHAACuDAAgDAAAsQwAIA8AALMMACAYAAC0DAAgGwAAuwwAIB0AALIMACAeAAC1DAAgIAAArwwAICEAALAMACAkAAC3DAAgJQAAtgwAICYAALgMACAnAAC5DAAgKAAAvAwAIO4DAADeBwAg7wMAAN4HACDwAwAA3gcAIPUDAADeBwAgkwQAAN4HACCVBAAA3gcAIAcIAACBDgAgGgAAuAwAICIAAIQOACC1BAAA3gcAILYEAADeBwAgtwQAAN4HACC4BAAA3gcAIA4EAAD7DQAgBQAA_A0AIAYAALoMACAfAAC7DAAgJwAAuQwAICkAAK4MACAqAAC1DAAgKwAAtAwAICwAALgMACAtAAD9DQAg7wMAAN4HACDxAwAA3gcAIPUDAADeBwAgzQQAAN4HACAECAAAgQ4AICQAALcMACDaAwAA3gcAIJwEAADeBwAgDAgAAIEOACAKAAC5DAAgDwAAswwAIBgAALQMACAdAACyDAAgHgAAtQwAIB8AALsMACDuAwAA3gcAIO8DAADeBwAg8AMAAN4HACDxAwAA3gcAIPUDAADeBwAgAAgIAACBDgAgCQAAhQ4AIBEAAIMOACAUAACGDgAgGAAAtAwAIBoAAP0NACAbAAC7DAAggwQAAN4HACAHCAAAgQ4AIAkAAIUOACAPAACzDAAgGAAAtAwAIBsAALsMACD1AwAA3gcAIJwEAADeBwAgAAcIAACBDgAgCQAAhQ4AIAsAAIgOACASAACHDgAgEwAAgw4AIBQAAIkOACCDBAAA3gcAIAMQAACMDgAgEgAAhw4AIBcAAIkOACAJCAAAgQ4AIA4AAI0OACAPAACzDAAgFAAAiQ4AIBgAALQMACAcAACGDgAg8QMAAN4HACD1AwAA3gcAIJwEAADeBwAgBAgAAIEOACAMAACxDAAg9QMAAN4HACCcBAAA3gcAIAfZAwEAAAAB3wNAAAAAAeADQAAAAAG9BEAAAAABxwQBAAAAAcgEAQAAAAHJBAEAAAABDNkDAQAAAAHfA0AAAAAB4ANAAAAAAb4EAQAAAAG_BAEAAAABwAQBAAAAAcEEAQAAAAHCBAEAAAABwwRAAAAAAcQEQAAAAAHFBAEAAAABxgQBAAAAARsHAACfDAAgDAAAogwAIA8AAKQMACAYAAClDAAgGwAArAwAIB0AAKMMACAeAACmDAAgIAAAoAwAICEAAKEMACAkAACoDAAgJQAApwwAICYAAKkMACAnAACqDAAgKAAArQwAINkDAQAAAAHfA0AAAAAB4ANAAAAAAewDAQAAAAHtAwEAAAAB7gMBAAAAAe8DAQAAAAHwAwEAAAAB8wMAAACVBAL0AyAAAAAB9QNAAAAAAZMEAQAAAAGVBEAAAAABAgAAALcEACA6AACQDgAgAwAAAG4AIDoAAJAOACA7AACUDgAgHQAAAG4AIAcAAIgKACAMAACLCgAgDwAAjQoAIBgAAI4KACAbAACVCgAgHQAAjAoAIB4AAI8KACAgAACJCgAgIQAAigoAICQAAJEKACAlAACQCgAgJgAAkgoAICcAAJMKACAoAACWCgAgMwAAlA4AINkDAQDVBwAh3wNAANcHACHgA0AA1wcAIewDAQDVBwAh7QMBANUHACHuAwEA4gcAIe8DAQDiBwAh8AMBAOIHACHzAwAAhwqVBCL0AyAA1gcAIfUDQADkBwAhkwQBAOIHACGVBEAA5AcAIRsHAACICgAgDAAAiwoAIA8AAI0KACAYAACOCgAgGwAAlQoAIB0AAIwKACAeAACPCgAgIAAAiQoAICEAAIoKACAkAACRCgAgJQAAkAoAICYAAJIKACAnAACTCgAgKAAAlgoAINkDAQDVBwAh3wNAANcHACHgA0AA1wcAIewDAQDVBwAh7QMBANUHACHuAwEA4gcAIe8DAQDiBwAh8AMBAOIHACHzAwAAhwqVBCL0AyAA1gcAIfUDQADkBwAhkwQBAOIHACGVBEAA5AcAIQjZAwEAAAAB2gMBAAAAAd8DQAAAAAGcBAEAAAABzgQBAAAAAc8EAQAAAAHQBAEAAAAB0QSAAAAAAQfZAwEAAAAB2gMBAAAAAd0DIAAAAAHfA0AAAAAB4ANAAAAAAZEEAAAAkQQCkgRAAAAAAQfZAwEAAAAB2gMBAAAAAdsDAQAAAAHdAyAAAAAB3gNAAAAAAd8DQAAAAAHgA0AAAAABD9kDAQAAAAHaAwEAAAAB2wMBAAAAAd8DQAAAAAHgA0AAAAAB8wMAAACDBAL8AwEAAAAB_QMQAAAAAf4DEAAAAAH_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_MDIvQDIADWBwAh9QNAAOQHACETCAAA5QcAIAoAAOYHACAPAADoBwAgGAAA6QcAIB4AAOoHACAfAADrBwAg2QMBANUHACHaAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIe0DAQDVBwAh7gMBAOIHACHvAwEA4gcAIfADAQDiBwAh8QMBAOIHACHzAwAA4wfzAyL0AyAA1gcAIfUDQADkBwAhCdkDAQAAAAHbAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB8wMAAACeBAL0AyAAAAAB9QNAAAAAAZwEAQAAAAEI2QMBAAAAAdsDAQAAAAHfA0AAAAAB4ANAAAAAAfcDAQAAAAH4AwIAAAABigQBAAAAAZsEAgAAAAEK2QMBAAAAAdsDAQAAAAHfA0AAAAAB9gMBAAAAAfcDAQAAAAH4AwIAAAAB-wMBAAAAAYMEAQAAAAGKBAEAAAABmgQAAACaBAIP2QMBAAAAAdsDAQAAAAHfA0AAAAAB4ANAAAAAAfMDAAAAgwQC-wMBAAAAAfwDAQAAAAH9AxAAAAAB_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_AQAgOgAA-Q4AIBsGAACrDAAgDAAAogwAIA8AAKQMACAYAAClDAAgGwAArAwAIB0AAKMMACAeAACmDAAgIAAAoAwAICEAAKEMACAkAACoDAAgJQAApwwAICYAAKkMACAnAACqDAAgKAAArQwAINkDAQAAAAHfA0AAAAAB4ANAAAAAAewDAQAAAAHtAwEAAAAB7gMBAAAAAe8DAQAAAAHwAwEAAAAB8wMAAACVBAL0AyAAAAAB9QNAAAAAAZMEAQAAAAGVBEAAAAABAgAAALcEACA6AAD7DgAgAwAAAAMAIDoAAPkOACA7AAD_DgAgFwAAAAMAIAQAAIUNACAFAACGDQAgBgAAhw0AIB8AAI4NACAnAACJDQAgKgAAig0AICsAAIsNACAsAACMDQAgLQAAjQ0AIDMAAP8OACDZAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIe4DAQDVBwAh7wMBAOIHACHxAwEA4gcAIfMDAACDDcwEIvQDIADWBwAh9QNAAOQHACHKBCAA1gcAIc0EAACEDc0EIxUEAACFDQAgBQAAhg0AIAYAAIcNACAfAACODQAgJwAAiQ0AICoAAIoNACArAACLDQAgLAAAjA0AIC0AAI0NACDZAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIe4DAQDVBwAh7wMBAOIHACHxAwEA4gcAIfMDAACDDcwEIvQDIADWBwAh9QNAAOQHACHKBCAA1gcAIc0EAACEDc0EIwMAAABuACA6AAD7DgAgOwAAgg8AIB0AAABuACAGAACUCgAgDAAAiwoAIA8AAI0KACAYAACOCgAgGwAAlQoAIB0AAIwKACAeAACPCgAgIAAAiQoAICEAAIoKACAkAACRCgAgJQAAkAoAICYAAJIKACAnAACTCgAgKAAAlgoAIDMAAIIPACDZAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIe0DAQDVBwAh7gMBAOIHACHvAwEA4gcAIfADAQDiBwAh8wMAAIcKlQQi9AMgANYHACH1A0AA5AcAIZMEAQDiBwAhlQRAAOQHACEbBgAAlAoAIAwAAIsKACAPAACNCgAgGAAAjgoAIBsAAJUKACAdAACMCgAgHgAAjwoAICAAAIkKACAhAACKCgAgJAAAkQoAICUAAJAKACAmAACSCgAgJwAAkwoAICgAAJYKACDZAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIe0DAQDVBwAh7gMBAOIHACHvAwEA4gcAIfADAQDiBwAh8wMAAIcKlQQi9AMgANYHACH1A0AA5AcAIZMEAQDiBwAhlQRAAOQHACEWCAAA9QgAIAkAAOoJACARAAD2CAAgFAAA9wgAIBgAAPgIACAbAAD6CAAg2QMBAAAAAdoDAQAAAAHbAwEAAAAB3wNAAAAAAeADQAAAAAHzAwAAAIMEAvsDAQAAAAH8AwEAAAAB_QMQAAAAAf4DEAAAAAH_AxAAAAABgQQAAACBBAKDBAEAAAABhQQAAACFBAKGBBAAAAABhwQQAAAAAQIAAABYACA6AACDDwAgAwAAAC8AIDoAAIMPACA7AACHDwAgGAAAAC8AIAgAAKMIACAJAADpCQAgEQAApAgAIBQAAKUIACAYAACmCAAgGwAAqAgAIDMAAIcPACDZAwEA1QcAIdoDAQDVBwAh2wMBANUHACHfA0AA1wcAIeADQADXBwAh8wMAAKAIgwQi-wMBANUHACH8AwEA1QcAIf0DEAD2BwAh_gMQAPYHACH_AxAA9gcAIYEEAACfCIEEIoMEAQDiBwAhhQQAAKEIhQQihgQQAPYHACGHBBAA9gcAIRYIAACjCAAgCQAA6QkAIBEAAKQIACAUAAClCAAgGAAApggAIBsAAKgIACDZAwEA1QcAIdoDAQDVBwAh2wMBANUHACHfA0AA1wcAIeADQADXBwAh8wMAAKAIgwQi-wMBANUHACH8AwEA1QcAIf0DEAD2BwAh_gMQAPYHACH_AxAA9gcAIYEEAACfCIEEIoMEAQDiBwAhhQQAAKEIhQQihgQQAPYHACGHBBAA9gcAIRMIAADWCQAgCgAA1wkAIA8AANkJACAYAADaCQAgHQAA2AkAIB8AANwJACDZAwEAAAAB2gMBAAAAAd8DQAAAAAHgA0AAAAAB7AMBAAAAAe0DAQAAAAHuAwEAAAAB7wMBAAAAAfADAQAAAAHxAwEAAAAB8wMAAADzAwL0AyAAAAAB9QNAAAAAAQIAAAAXACA6AACIDwAgAwAAABUAIDoAAIgPACA7AACMDwAgFQAAABUAIAgAAOUHACAKAADmBwAgDwAA6AcAIBgAAOkHACAdAADnBwAgHwAA6wcAIDMAAIwPACDZAwEA1QcAIdoDAQDVBwAh3wNAANcHACHgA0AA1wcAIewDAQDVBwAh7QMBANUHACHuAwEA4gcAIe8DAQDiBwAh8AMBAOIHACHxAwEA4gcAIfMDAADjB_MDIvQDIADWBwAh9QNAAOQHACETCAAA5QcAIAoAAOYHACAPAADoBwAgGAAA6QcAIB0AAOcHACAfAADrBwAg2QMBANUHACHaAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIe0DAQDVBwAh7gMBAOIHACHvAwEA4gcAIfADAQDiBwAh8QMBAOIHACHzAwAA4wfzAyL0AyAA1gcAIfUDQADkBwAhFggAAPUIACAJAADqCQAgEQAA9ggAIBgAAPgIACAaAAD5CAAgGwAA-ggAINkDAQAAAAHaAwEAAAAB2wMBAAAAAd8DQAAAAAHgA0AAAAAB8wMAAACDBAL7AwEAAAAB_AMBAAAAAf0DEAAAAAH-AxAAAAAB_wMQAAAAAYEEAAAAgQQCgwQBAAAAAYUEAAAAhQQChgQQAAAAAYcEEAAAAAECAAAAWAAgOgAAjQ8AIAMAAAAvACA6AACNDwAgOwAAkQ8AIBgAAAAvACAIAACjCAAgCQAA6QkAIBEAAKQIACAYAACmCAAgGgAApwgAIBsAAKgIACAzAACRDwAg2QMBANUHACHaAwEA1QcAIdsDAQDVBwAh3wNAANcHACHgA0AA1wcAIfMDAACgCIMEIvsDAQDVBwAh_AMBANUHACH9AxAA9gcAIf4DEAD2BwAh_wMQAPYHACGBBAAAnwiBBCKDBAEA4gcAIYUEAAChCIUEIoYEEAD2BwAhhwQQAPYHACEWCAAAowgAIAkAAOkJACARAACkCAAgGAAApggAIBoAAKcIACAbAACoCAAg2QMBANUHACHaAwEA1QcAIdsDAQDVBwAh3wNAANcHACHgA0AA1wcAIfMDAACgCIMEIvsDAQDVBwAh_AMBANUHACH9AxAA9gcAIf4DEAD2BwAh_wMQAPYHACGBBAAAnwiBBCKDBAEA4gcAIYUEAAChCIUEIoYEEAD2BwAhhwQQAPYHACEbBgAAqwwAIAcAAJ8MACAMAACiDAAgDwAApAwAIBgAAKUMACAbAACsDAAgHQAAowwAIB4AAKYMACAhAAChDAAgJAAAqAwAICUAAKcMACAmAACpDAAgJwAAqgwAICgAAK0MACDZAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7QMBAAAAAe4DAQAAAAHvAwEAAAAB8AMBAAAAAfMDAAAAlQQC9AMgAAAAAfUDQAAAAAGTBAEAAAABlQRAAAAAAQIAAAC3BAAgOgAAkg8AIAfZAwEAAAAB2gMBAAAAAdwDAQAAAAHdAyAAAAAB3gNAAAAAAd8DQAAAAAHgA0AAAAABGwYAAKsMACAHAACfDAAgDAAAogwAIA8AAKQMACAYAAClDAAgGwAArAwAIB4AAKYMACAgAACgDAAgIQAAoQwAICQAAKgMACAlAACnDAAgJgAAqQwAICcAAKoMACAoAACtDAAg2QMBAAAAAd8DQAAAAAHgA0AAAAAB7AMBAAAAAe0DAQAAAAHuAwEAAAAB7wMBAAAAAfADAQAAAAHzAwAAAJUEAvQDIAAAAAH1A0AAAAABkwQBAAAAAZUEQAAAAAECAAAAtwQAIDoAAJUPACATCAAA1gkAIAoAANcJACAYAADaCQAgHQAA2AkAIB4AANsJACAfAADcCQAg2QMBAAAAAdoDAQAAAAHfA0AAAAAB4ANAAAAAAewDAQAAAAHtAwEAAAAB7gMBAAAAAe8DAQAAAAHwAwEAAAAB8QMBAAAAAfMDAAAA8wMC9AMgAAAAAfUDQAAAAAECAAAAFwAgOgAAlw8AIAMAAAAVACA6AACXDwAgOwAAmw8AIBUAAAAVACAIAADlBwAgCgAA5gcAIBgAAOkHACAdAADnBwAgHgAA6gcAIB8AAOsHACAzAACbDwAg2QMBANUHACHaAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIe0DAQDVBwAh7gMBAOIHACHvAwEA4gcAIfADAQDiBwAh8QMBAOIHACHzAwAA4wfzAyL0AyAA1gcAIfUDQADkBwAhEwgAAOUHACAKAADmBwAgGAAA6QcAIB0AAOcHACAeAADqBwAgHwAA6wcAINkDAQDVBwAh2gMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHtAwEA1QcAIe4DAQDiBwAh7wMBAOIHACHwAwEA4gcAIfEDAQDiBwAh8wMAAOMH8wMi9AMgANYHACH1A0AA5AcAIQjZAwEAAAAB2gMBAAAAAdsDAQAAAAHfA0AAAAAB4ANAAAAAAfcDAQAAAAH4AwIAAAABmwQCAAAAAQrZAwEAAAAB2gMBAAAAAdsDAQAAAAHfA0AAAAAB9gMBAAAAAfcDAQAAAAH4AwIAAAAB-wMBAAAAAYMEAQAAAAGaBAAAAJoEAgrZAwEAAAAB2gMBAAAAAdsDAQAAAAHfA0AAAAAB4ANAAAAAAfMDAAAAjgQC9gMBAAAAAYMEAQAAAAGLBAEAAAABjAQQAAAAAQMAAABuACA6AACVDwAgOwAAoQ8AIB0AAABuACAGAACUCgAgBwAAiAoAIAwAAIsKACAPAACNCgAgGAAAjgoAIBsAAJUKACAeAACPCgAgIAAAiQoAICEAAIoKACAkAACRCgAgJQAAkAoAICYAAJIKACAnAACTCgAgKAAAlgoAIDMAAKEPACDZAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIe0DAQDVBwAh7gMBAOIHACHvAwEA4gcAIfADAQDiBwAh8wMAAIcKlQQi9AMgANYHACH1A0AA5AcAIZMEAQDiBwAhlQRAAOQHACEbBgAAlAoAIAcAAIgKACAMAACLCgAgDwAAjQoAIBgAAI4KACAbAACVCgAgHgAAjwoAICAAAIkKACAhAACKCgAgJAAAkQoAICUAAJAKACAmAACSCgAgJwAAkwoAICgAAJYKACDZAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIe0DAQDVBwAh7gMBAOIHACHvAwEA4gcAIfADAQDiBwAh8wMAAIcKlQQi9AMgANYHACH1A0AA5AcAIZMEAQDiBwAhlQRAAOQHACEJ2QMBAAAAAdoDAQAAAAHfA0AAAAAB4ANAAAAAAewDAQAAAAHzAwAAAJ4EAvQDIAAAAAH1A0AAAAABnAQBAAAAARMIAACEDAAgDgAA6AsAIBQAAOwLACAYAADqCwAgHAAA6wsAINkDAQAAAAHaAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7QMBAAAAAfEDAQAAAAHzAwAAAK0EAvQDIAAAAAH1A0AAAAABnAQBAAAAAakEAQAAAAGqBAEAAAABqwQQAAAAAQIAAAAnACA6AACjDwAgDggAAMYJACAJAACxCwAgGAAAyAkAIBsAAMkJACDZAwEAAAAB2gMBAAAAAdsDAQAAAAHfA0AAAAAB4ANAAAAAAewDAQAAAAHzAwAAAJ4EAvQDIAAAAAH1A0AAAAABnAQBAAAAAQIAAAAfACA6AAClDwAgGwYAAKsMACAHAACfDAAgDAAAogwAIBgAAKUMACAbAACsDAAgHQAAowwAIB4AAKYMACAgAACgDAAgIQAAoQwAICQAAKgMACAlAACnDAAgJgAAqQwAICcAAKoMACAoAACtDAAg2QMBAAAAAd8DQAAAAAHgA0AAAAAB7AMBAAAAAe0DAQAAAAHuAwEAAAAB7wMBAAAAAfADAQAAAAHzAwAAAJUEAvQDIAAAAAH1A0AAAAABkwQBAAAAAZUEQAAAAAECAAAAtwQAIDoAAKcPACADAAAAJQAgOgAAow8AIDsAAKsPACAVAAAAJQAgCAAAggwAIA4AAL4LACAUAADCCwAgGAAAwAsAIBwAAMELACAzAACrDwAg2QMBANUHACHaAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIe0DAQDVBwAh8QMBAOIHACHzAwAAvAutBCL0AyAA1gcAIfUDQADkBwAhnAQBAOIHACGpBAEA1QcAIaoEAQDVBwAhqwQQAPYHACETCAAAggwAIA4AAL4LACAUAADCCwAgGAAAwAsAIBwAAMELACDZAwEA1QcAIdoDAQDVBwAh3wNAANcHACHgA0AA1wcAIewDAQDVBwAh7QMBANUHACHxAwEA4gcAIfMDAAC8C60EIvQDIADWBwAh9QNAAOQHACGcBAEA4gcAIakEAQDVBwAhqgQBANUHACGrBBAA9gcAIQMAAAAdACA6AAClDwAgOwAArg8AIBAAAAAdACAIAACkCQAgCQAArwsAIBgAAKYJACAbAACnCQAgMwAArg8AINkDAQDVBwAh2gMBANUHACHbAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIfMDAACiCZ4EIvQDIADWBwAh9QNAAOQHACGcBAEA4gcAIQ4IAACkCQAgCQAArwsAIBgAAKYJACAbAACnCQAg2QMBANUHACHaAwEA1QcAIdsDAQDVBwAh3wNAANcHACHgA0AA1wcAIewDAQDVBwAh8wMAAKIJngQi9AMgANYHACH1A0AA5AcAIZwEAQDiBwAhAwAAAG4AIDoAAKcPACA7AACxDwAgHQAAAG4AIAYAAJQKACAHAACICgAgDAAAiwoAIBgAAI4KACAbAACVCgAgHQAAjAoAIB4AAI8KACAgAACJCgAgIQAAigoAICQAAJEKACAlAACQCgAgJgAAkgoAICcAAJMKACAoAACWCgAgMwAAsQ8AINkDAQDVBwAh3wNAANcHACHgA0AA1wcAIewDAQDVBwAh7QMBANUHACHuAwEA4gcAIe8DAQDiBwAh8AMBAOIHACHzAwAAhwqVBCL0AyAA1gcAIfUDQADkBwAhkwQBAOIHACGVBEAA5AcAIRsGAACUCgAgBwAAiAoAIAwAAIsKACAYAACOCgAgGwAAlQoAIB0AAIwKACAeAACPCgAgIAAAiQoAICEAAIoKACAkAACRCgAgJQAAkAoAICYAAJIKACAnAACTCgAgKAAAlgoAINkDAQDVBwAh3wNAANcHACHgA0AA1wcAIewDAQDVBwAh7QMBANUHACHuAwEA4gcAIe8DAQDiBwAh8AMBAOIHACHzAwAAhwqVBCL0AyAA1gcAIfUDQADkBwAhkwQBAOIHACGVBEAA5AcAIQjZAwEAAAAB2gMBAAAAAd8DQAAAAAHgA0AAAAAB9wMBAAAAAfgDAgAAAAGKBAEAAAABmwQCAAAAARYIAAD1CAAgCQAA6gkAIBEAAPYIACAUAAD3CAAgGgAA-QgAIBsAAPoIACDZAwEAAAAB2gMBAAAAAdsDAQAAAAHfA0AAAAAB4ANAAAAAAfMDAAAAgwQC-wMBAAAAAfwDAQAAAAH9AxAAAAAB_gMQAAAAAf8DEAAAAAGBBAAAAIEEAoMEAQAAAAGFBAAAAIUEAoYEEAAAAAGHBBAAAAABAgAAAFgAIDoAALMPACADAAAALwAgOgAAsw8AIDsAALcPACAYAAAALwAgCAAAowgAIAkAAOkJACARAACkCAAgFAAApQgAIBoAAKcIACAbAACoCAAgMwAAtw8AINkDAQDVBwAh2gMBANUHACHbAwEA1QcAId8DQADXBwAh4ANAANcHACHzAwAAoAiDBCL7AwEA1QcAIfwDAQDVBwAh_QMQAPYHACH-AxAA9gcAIf8DEAD2BwAhgQQAAJ8IgQQigwQBAOIHACGFBAAAoQiFBCKGBBAA9gcAIYcEEAD2BwAhFggAAKMIACAJAADpCQAgEQAApAgAIBQAAKUIACAaAACnCAAgGwAAqAgAINkDAQDVBwAh2gMBANUHACHbAwEA1QcAId8DQADXBwAh4ANAANcHACHzAwAAoAiDBCL7AwEA1QcAIfwDAQDVBwAh_QMQAPYHACH-AxAA9gcAIf8DEAD2BwAhgQQAAJ8IgQQigwQBAOIHACGFBAAAoQiFBCKGBBAA9gcAIYcEEAD2BwAhCtkDAQAAAAHaAwEAAAAB3wNAAAAAAfYDAQAAAAH3AwEAAAAB-AMCAAAAAfsDAQAAAAGDBAEAAAABigQBAAAAAZoEAAAAmgQCFQQAAPENACAFAADyDQAgBgAA8w0AIB8AAPoNACAnAAD1DQAgKQAA9A0AICsAAPcNACAsAAD4DQAgLQAA-Q0AINkDAQAAAAHfA0AAAAAB4ANAAAAAAewDAQAAAAHuAwEAAAAB7wMBAAAAAfEDAQAAAAHzAwAAAMwEAvQDIAAAAAH1A0AAAAABygQgAAAAAc0EAAAAzQQDAgAAAL8BACA6AAC5DwAgGwYAAKsMACAHAACfDAAgDAAAogwAIA8AAKQMACAYAAClDAAgGwAArAwAIB0AAKMMACAgAACgDAAgIQAAoQwAICQAAKgMACAlAACnDAAgJgAAqQwAICcAAKoMACAoAACtDAAg2QMBAAAAAd8DQAAAAAHgA0AAAAAB7AMBAAAAAe0DAQAAAAHuAwEAAAAB7wMBAAAAAfADAQAAAAHzAwAAAJUEAvQDIAAAAAH1A0AAAAABkwQBAAAAAZUEQAAAAAECAAAAtwQAIDoAALsPACATCAAAhAwAIA4AAOgLACAPAADpCwAgFAAA7AsAIBgAAOoLACDZAwEAAAAB2gMBAAAAAd8DQAAAAAHgA0AAAAAB7AMBAAAAAe0DAQAAAAHxAwEAAAAB8wMAAACtBAL0AyAAAAAB9QNAAAAAAZwEAQAAAAGpBAEAAAABqgQBAAAAAasEEAAAAAECAAAAJwAgOgAAvQ8AIBAIAACRCAAgCQAAswgAIAsAAJIIACASAACQCAAgEwAAkwgAINkDAQAAAAHaAwEAAAAB2wMBAAAAAd8DQAAAAAHgA0AAAAAB8wMAAACOBAL2AwEAAAABgwQBAAAAAYoEAQAAAAGLBAEAAAABjAQQAAAAAQIAAABEACA6AAC_DwAgAwAAAEIAIDoAAL8PACA7AADDDwAgEgAAAEIAIAgAAPoHACAJAACxCAAgCwAA-wcAIBIAAPkHACATAAD8BwAgMwAAww8AINkDAQDVBwAh2gMBANUHACHbAwEA1QcAId8DQADXBwAh4ANAANcHACHzAwAA9weOBCL2AwEA1QcAIYMEAQDiBwAhigQBANUHACGLBAEA1QcAIYwEEAD2BwAhEAgAAPoHACAJAACxCAAgCwAA-wcAIBIAAPkHACATAAD8BwAg2QMBANUHACHaAwEA1QcAIdsDAQDVBwAh3wNAANcHACHgA0AA1wcAIfMDAAD3B44EIvYDAQDVBwAhgwQBAOIHACGKBAEA1QcAIYsEAQDVBwAhjAQQAPYHACEH2QMBAAAAAd8DQAAAAAH3AwEAAAAB-AMCAAAAAfkDEAAAAAH6AxAAAAABiAQBAAAAAQMAAAAlACA6AAC9DwAgOwAAxw8AIBUAAAAlACAIAACCDAAgDgAAvgsAIA8AAL8LACAUAADCCwAgGAAAwAsAIDMAAMcPACDZAwEA1QcAIdoDAQDVBwAh3wNAANcHACHgA0AA1wcAIewDAQDVBwAh7QMBANUHACHxAwEA4gcAIfMDAAC8C60EIvQDIADWBwAh9QNAAOQHACGcBAEA4gcAIakEAQDVBwAhqgQBANUHACGrBBAA9gcAIRMIAACCDAAgDgAAvgsAIA8AAL8LACAUAADCCwAgGAAAwAsAINkDAQDVBwAh2gMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHtAwEA1QcAIfEDAQDiBwAh8wMAALwLrQQi9AMgANYHACH1A0AA5AcAIZwEAQDiBwAhqQQBANUHACGqBAEA1QcAIasEEAD2BwAhBtkDAQAAAAHfA0AAAAAB9wMBAAAAAfgDAgAAAAH5AxAAAAAB-gMQAAAAARUEAADxDQAgBQAA8g0AIAYAAPMNACAfAAD6DQAgJwAA9Q0AICkAAPQNACAqAAD2DQAgLAAA-A0AIC0AAPkNACDZAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7gMBAAAAAe8DAQAAAAHxAwEAAAAB8wMAAADMBAL0AyAAAAAB9QNAAAAAAcoEIAAAAAHNBAAAAM0EAwIAAAC_AQAgOgAAyQ8AIBMIAACEDAAgDgAA6AsAIA8AAOkLACAUAADsCwAgHAAA6wsAINkDAQAAAAHaAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7QMBAAAAAfEDAQAAAAHzAwAAAK0EAvQDIAAAAAH1A0AAAAABnAQBAAAAAakEAQAAAAGqBAEAAAABqwQQAAAAAQIAAAAnACA6AADLDwAgDggAAMYJACAJAACxCwAgDwAAxwkAIBsAAMkJACDZAwEAAAAB2gMBAAAAAdsDAQAAAAHfA0AAAAAB4ANAAAAAAewDAQAAAAHzAwAAAJ4EAvQDIAAAAAH1A0AAAAABnAQBAAAAAQIAAAAfACA6AADNDwAgEwgAANYJACAKAADXCQAgDwAA2QkAIB0AANgJACAeAADbCQAgHwAA3AkAINkDAQAAAAHaAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7QMBAAAAAe4DAQAAAAHvAwEAAAAB8AMBAAAAAfEDAQAAAAHzAwAAAPMDAvQDIAAAAAH1A0AAAAABAgAAABcAIDoAAM8PACAbBgAAqwwAIAcAAJ8MACAMAACiDAAgDwAApAwAIBsAAKwMACAdAACjDAAgHgAApgwAICAAAKAMACAhAAChDAAgJAAAqAwAICUAAKcMACAmAACpDAAgJwAAqgwAICgAAK0MACDZAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7QMBAAAAAe4DAQAAAAHvAwEAAAAB8AMBAAAAAfMDAAAAlQQC9AMgAAAAAfUDQAAAAAGTBAEAAAABlQRAAAAAAQIAAAC3BAAgOgAA0Q8AIAMAAAADACA6AADJDwAgOwAA1Q8AIBcAAAADACAEAACFDQAgBQAAhg0AIAYAAIcNACAfAACODQAgJwAAiQ0AICkAAIgNACAqAACKDQAgLAAAjA0AIC0AAI0NACAzAADVDwAg2QMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHuAwEA1QcAIe8DAQDiBwAh8QMBAOIHACHzAwAAgw3MBCL0AyAA1gcAIfUDQADkBwAhygQgANYHACHNBAAAhA3NBCMVBAAAhQ0AIAUAAIYNACAGAACHDQAgHwAAjg0AICcAAIkNACApAACIDQAgKgAAig0AICwAAIwNACAtAACNDQAg2QMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHuAwEA1QcAIe8DAQDiBwAh8QMBAOIHACHzAwAAgw3MBCL0AyAA1gcAIfUDQADkBwAhygQgANYHACHNBAAAhA3NBCMDAAAAJQAgOgAAyw8AIDsAANgPACAVAAAAJQAgCAAAggwAIA4AAL4LACAPAAC_CwAgFAAAwgsAIBwAAMELACAzAADYDwAg2QMBANUHACHaAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIe0DAQDVBwAh8QMBAOIHACHzAwAAvAutBCL0AyAA1gcAIfUDQADkBwAhnAQBAOIHACGpBAEA1QcAIaoEAQDVBwAhqwQQAPYHACETCAAAggwAIA4AAL4LACAPAAC_CwAgFAAAwgsAIBwAAMELACDZAwEA1QcAIdoDAQDVBwAh3wNAANcHACHgA0AA1wcAIewDAQDVBwAh7QMBANUHACHxAwEA4gcAIfMDAAC8C60EIvQDIADWBwAh9QNAAOQHACGcBAEA4gcAIakEAQDVBwAhqgQBANUHACGrBBAA9gcAIQMAAAAdACA6AADNDwAgOwAA2w8AIBAAAAAdACAIAACkCQAgCQAArwsAIA8AAKUJACAbAACnCQAgMwAA2w8AINkDAQDVBwAh2gMBANUHACHbAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIfMDAACiCZ4EIvQDIADWBwAh9QNAAOQHACGcBAEA4gcAIQ4IAACkCQAgCQAArwsAIA8AAKUJACAbAACnCQAg2QMBANUHACHaAwEA1QcAIdsDAQDVBwAh3wNAANcHACHgA0AA1wcAIewDAQDVBwAh8wMAAKIJngQi9AMgANYHACH1A0AA5AcAIZwEAQDiBwAhAwAAABUAIDoAAM8PACA7AADeDwAgFQAAABUAIAgAAOUHACAKAADmBwAgDwAA6AcAIB0AAOcHACAeAADqBwAgHwAA6wcAIDMAAN4PACDZAwEA1QcAIdoDAQDVBwAh3wNAANcHACHgA0AA1wcAIewDAQDVBwAh7QMBANUHACHuAwEA4gcAIe8DAQDiBwAh8AMBAOIHACHxAwEA4gcAIfMDAADjB_MDIvQDIADWBwAh9QNAAOQHACETCAAA5QcAIAoAAOYHACAPAADoBwAgHQAA5wcAIB4AAOoHACAfAADrBwAg2QMBANUHACHaAwEA1QcAId8DQADXBwAh4ANAANcHACHsAwEA1QcAIe0DAQDVBwAh7gMBAOIHACHvAwEA4gcAIfADAQDiBwAh8QMBAOIHACHzAwAA4wfzAyL0AyAA1gcAIfUDQADkBwAhAwAAAG4AIDoAANEPACA7AADhDwAgHQAAAG4AIAYAAJQKACAHAACICgAgDAAAiwoAIA8AAI0KACAbAACVCgAgHQAAjAoAIB4AAI8KACAgAACJCgAgIQAAigoAICQAAJEKACAlAACQCgAgJgAAkgoAICcAAJMKACAoAACWCgAgMwAA4Q8AINkDAQDVBwAh3wNAANcHACHgA0AA1wcAIewDAQDVBwAh7QMBANUHACHuAwEA4gcAIe8DAQDiBwAh8AMBAOIHACHzAwAAhwqVBCL0AyAA1gcAIfUDQADkBwAhkwQBAOIHACGVBEAA5AcAIRsGAACUCgAgBwAAiAoAIAwAAIsKACAPAACNCgAgGwAAlQoAIB0AAIwKACAeAACPCgAgIAAAiQoAICEAAIoKACAkAACRCgAgJQAAkAoAICYAAJIKACAnAACTCgAgKAAAlgoAINkDAQDVBwAh3wNAANcHACHgA0AA1wcAIewDAQDVBwAh7QMBANUHACHuAwEA4gcAIe8DAQDiBwAh8AMBAOIHACHzAwAAhwqVBCL0AyAA1gcAIfUDQADkBwAhkwQBAOIHACGVBEAA5AcAIQrZAwEAAAAB2gMBAAAAAdsDAQAAAAHfA0AAAAAB9wMBAAAAAfgDAgAAAAH7AwEAAAABgwQBAAAAAYoEAQAAAAGaBAAAAJoEAhUEAADxDQAgBQAA8g0AIAYAAPMNACAfAAD6DQAgJwAA9Q0AICkAAPQNACAqAAD2DQAgKwAA9w0AICwAAPgNACDZAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7gMBAAAAAe8DAQAAAAHxAwEAAAAB8wMAAADMBAL0AyAAAAAB9QNAAAAAAcoEIAAAAAHNBAAAAM0EAwIAAAC_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_QMQAAAAAf4DEAAAAAH_AxAAAAABgQQAAACBBAKDBAEAAAABhQQAAACFBAKGBBAAAAABhwQQAAAAARUEAADxDQAgBQAA8g0AIAYAAPMNACAnAAD1DQAgKQAA9A0AICoAAPYNACArAAD3DQAgLAAA-A0AIC0AAPkNACDZAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7gMBAAAAAe8DAQAAAAHxAwEAAAAB8wMAAADMBAL0AyAAAAAB9QNAAAAAAcoEIAAAAAHNBAAAAM0EAwIAAAC_AQAgOgAA9g8AIA4IAADGCQAgCQAAsQsAIA8AAMcJACAYAADICQAg2QMBAAAAAdoDAQAAAAHbAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB8wMAAACeBAL0AyAAAAAB9QNAAAAAAZwEAQAAAAECAAAAHwAgOgAA-A8AIBsGAACrDAAgBwAAnwwAIAwAAKIMACAPAACkDAAgGAAApQwAIB0AAKMMACAeAACmDAAgIAAAoAwAICEAAKEMACAkAACoDAAgJQAApwwAICYAAKkMACAnAACqDAAgKAAArQwAINkDAQAAAAHfA0AAAAAB4ANAAAAAAewDAQAAAAHtAwEAAAAB7gMBAAAAAe8DAQAAAAHwAwEAAAAB8wMAAACVBAL0AyAAAAAB9QNAAAAAAZMEAQAAAAGVBEAAAAABAgAAALcEACA6AAD6DwAgFggAAPUIACAJAADqCQAgEQAA9ggAIBQAAPcIACAYAAD4CAAgGgAA-QgAINkDAQAAAAHaAwEAAAAB2wMBAAAAAd8DQAAAAAHgA0AAAAAB8wMAAACDBAL7AwEAAAAB_AMBAAAAAf0DEAAAAAH-AxAAAAAB_wMQAAAAAYEEAAAAgQQCgwQBAAAAAYUEAAAAhQQChgQQAAAAAYcEEAAAAAECAAAAWAAgOgAA_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_AMBANUHACH9AxAA9gcAIf4DEAD2BwAh_wMQAPYHACGBBAAAnwiBBCKDBAEA4gcAIYUEAAChCIUEIoYEEAD2BwAhhwQQAPYHACEWCAAAowgAIAkAAOkJACARAACkCAAgFAAApQgAIBgAAKYIACAaAACnCAAg2QMBANUHACHaAwEA1QcAIdsDAQDVBwAh3wNAANcHACHgA0AA1wcAIfMDAACgCIMEIvsDAQDVBwAh_AMBANUHACH9AxAA9gcAIf4DEAD2BwAh_wMQAPYHACGBBAAAnwiBBCKDBAEA4gcAIYUEAAChCIUEIoYEEAD2BwAhhwQQAPYHACEK2QMBAAAAAdoDAQAAAAHfA0AAAAAB4ANAAAAAAfMDAAAAjgQC9gMBAAAAAYMEAQAAAAGKBAEAAAABiwQBAAAAAYwEEAAAAAEDAAAAbgAgOgAAkg8AIDsAAJgQACAdAAAAbgAgBgAAlAoAIAcAAIgKACAMAACLCgAgDwAAjQoAIBgAAI4KACAbAACVCgAgHQAAjAoAIB4AAI8KACAhAACKCgAgJAAAkQoAICUAAJAKACAmAACSCgAgJwAAkwoAICgAAJYKACAzAACYEAAg2QMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHtAwEA1QcAIe4DAQDiBwAh7wMBAOIHACHwAwEA4gcAIfMDAACHCpUEIvQDIADWBwAh9QNAAOQHACGTBAEA4gcAIZUEQADkBwAhGwYAAJQKACAHAACICgAgDAAAiwoAIA8AAI0KACAYAACOCgAgGwAAlQoAIB0AAIwKACAeAACPCgAgIQAAigoAICQAAJEKACAlAACQCgAgJgAAkgoAICcAAJMKACAoAACWCgAg2QMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHtAwEA1QcAIe4DAQDiBwAh7wMBAOIHACHwAwEA4gcAIfMDAACHCpUEIvQDIADWBwAh9QNAAOQHACGTBAEA4gcAIZUEQADkBwAhFQQAAPENACAFAADyDQAgBgAA8w0AIB8AAPoNACApAAD0DQAgKgAA9g0AICsAAPcNACAsAAD4DQAgLQAA-Q0AINkDAQAAAAHfA0AAAAAB4ANAAAAAAewDAQAAAAHuAwEAAAAB7wMBAAAAAfEDAQAAAAHzAwAAAMwEAvQDIAAAAAH1A0AAAAABygQgAAAAAc0EAAAAzQQDAgAAAL8BACA6AACZEAAgEwgAANYJACAPAADZCQAgGAAA2gkAIB0AANgJACAeAADbCQAgHwAA3AkAINkDAQAAAAHaAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7QMBAAAAAe4DAQAAAAHvAwEAAAAB8AMBAAAAAfEDAQAAAAHzAwAAAPMDAvQDIAAAAAH1A0AAAAABAgAAABcAIDoAAJsQACAbBgAAqwwAIAcAAJ8MACAMAACiDAAgDwAApAwAIBgAAKUMACAbAACsDAAgHQAAowwAIB4AAKYMACAgAACgDAAgIQAAoQwAICQAAKgMACAlAACnDAAgJgAAqQwAICgAAK0MACDZAwEAAAAB3wNAAAAAAeADQAAAAAHsAwEAAAAB7QMBAAAAAe4DAQAAAAHvAwEAAAAB8AMBAAAAAfMDAAAAlQQC9AMgAAAAAfUDQAAAAAGTBAEAAAABlQRAAAAAAQIAAAC3BAAgOgAAnRAAIAMAAAADACA6AACZEAAgOwAAoRAAIBcAAAADACAEAACFDQAgBQAAhg0AIAYAAIcNACAfAACODQAgKQAAiA0AICoAAIoNACArAACLDQAgLAAAjA0AIC0AAI0NACAzAAChEAAg2QMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHuAwEA1QcAIe8DAQDiBwAh8QMBAOIHACHzAwAAgw3MBCL0AyAA1gcAIfUDQADkBwAhygQgANYHACHNBAAAhA3NBCMVBAAAhQ0AIAUAAIYNACAGAACHDQAgHwAAjg0AICkAAIgNACAqAACKDQAgKwAAiw0AICwAAIwNACAtAACNDQAg2QMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHuAwEA1QcAIe8DAQDiBwAh8QMBAOIHACHzAwAAgw3MBCL0AyAA1gcAIfUDQADkBwAhygQgANYHACHNBAAAhA3NBCMDAAAAFQAgOgAAmxAAIDsAAKQQACAVAAAAFQAgCAAA5QcAIA8AAOgHACAYAADpBwAgHQAA5wcAIB4AAOoHACAfAADrBwAgMwAApBAAINkDAQDVBwAh2gMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHtAwEA1QcAIe4DAQDiBwAh7wMBAOIHACHwAwEA4gcAIfEDAQDiBwAh8wMAAOMH8wMi9AMgANYHACH1A0AA5AcAIRMIAADlBwAgDwAA6AcAIBgAAOkHACAdAADnBwAgHgAA6gcAIB8AAOsHACDZAwEA1QcAIdoDAQDVBwAh3wNAANcHACHgA0AA1wcAIewDAQDVBwAh7QMBANUHACHuAwEA4gcAIe8DAQDiBwAh8AMBAOIHACHxAwEA4gcAIfMDAADjB_MDIvQDIADWBwAh9QNAAOQHACEDAAAAbgAgOgAAnRAAIDsAAKcQACAdAAAAbgAgBgAAlAoAIAcAAIgKACAMAACLCgAgDwAAjQoAIBgAAI4KACAbAACVCgAgHQAAjAoAIB4AAI8KACAgAACJCgAgIQAAigoAICQAAJEKACAlAACQCgAgJgAAkgoAICgAAJYKACAzAACnEAAg2QMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHtAwEA1QcAIe4DAQDiBwAh7wMBAOIHACHwAwEA4gcAIfMDAACHCpUEIvQDIADWBwAh9QNAAOQHACGTBAEA4gcAIZUEQADkBwAhGwYAAJQKACAHAACICgAgDAAAiwoAIA8AAI0KACAYAACOCgAgGwAAlQoAIB0AAIwKACAeAACPCgAgIAAAiQoAICEAAIoKACAkAACRCgAgJQAAkAoAICYAAJIKACAoAACWCgAg2QMBANUHACHfA0AA1wcAIeADQADXBwAh7AMBANUHACHtAwEA1QcAIe4DAQDiBwAh7wMBAOIHACHwAwEA4gcAIfMDAACHCpUEIvQDIADWBwAh9QNAAOQHACGTBAEA4gcAIZUEQADkBwAhAgMEAgilAQYLBAgDBQwEBg8BDQAhH5oBEieVAQgpEwUqlgEPK5cBDiyYARwtmQEVAQMAAgEDAAICAwACCAAGEAZ_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-ugEiQr0BJUO-ASlEwAECRcEBAkbDAQJHxAECSMUBAknHAQJKyQEiS8oBKkzMAQJNzgEiTs8BK0_QAQJQ0QECUdIBIlLVASxT1gEwVNcBA1XYAQNW2QEDV9oBA1jbAQNZ3QEDWt8BIlvgATFc4gEDXeQBIl7lATJf5gEDYOcBA2HoASJi6wEzY-wBN2TtAQRl7gEEZu8BBGfwAQRo8QEEafMBBGr1ASJr9gE4bPgBBG36ASJu-wE5b_wBBHD9AQRx_gEicoECOnOCAj50hAI_dYUCP3aIAj93iQI_eIoCP3mMAj96jgIie48CQHyRAj99kwIifpQCQX-VAj-AAZYCP4EBlwIiggGaAkKDAZsCRoQBnAIahQGdAhqGAZ4CGocBnwIaiAGgAhqJAaICGooBpAIiiwGlAkeMAagCGo0BqgIijgGrAkiPAa0CGpABrgIakQGvAiKUAbICSZUBswJPlgG0AhuXAbUCG5gBtgIbmQG3AhuaAbgCG5sBugIbnAG8AiKdAb0CUJ4BvwIbnwHBAiKgAcICUaEBwwIbogHEAhujAcUCIqQByAJSpQHJAlamAcoCHKcBywIcqAHMAhypAc0CHKoBzgIcqwHQAhysAdICIq0B0wJXrgHXAhyvAdkCIrAB2gJYsQHdAhyyAd4CHLMB3wIitAHiAlm1AeMCX7YB5AIMtwHlAgy4AeYCDLkB5wIMugHoAgy7AeoCDLwB7AIivQHtAmC-Ae8CDL8B8QIiwAHyAmHBAfMCDMIB9AIMwwH1AiLEAfgCYsUB-QJmxgH6AgvHAfsCC8gB_AILyQH9AgvKAf4CC8sBgAMLzAGCAyLNAYMDZ84BhQMLzwGHAyLQAYgDaNEBiQML0gGKAwvTAYsDItQBjgNp1QGPA2_WAZEDcNcBkgNw2AGVA3DZAZYDcNoBlwNw2wGZA3DcAZsDIt0BnANx3gGeA3DfAaADIuABoQNy4QGiA3DiAaMDcOMBpAMi5AGnA3PlAagDd-YBqgN45wGrA3joAa4DeOkBrwN46gGwA3jrAbIDeOwBtAMi7QG1A3nuAbcDeO8BuQMi8AG6A3rxAbsDePIBvAN48wG9AyL0AcADe_UBwQN_9gHDA4AB9wHEA4AB-AHHA4AB-QHIA4AB-gHJA4AB-wHLA4AB_AHNAyL9Ac4DgQH-AdADgAH_AdIDIoAC0wOCAYEC1AOAAYIC1QOAAYMC1gMihALZA4MBhQLaA4cBhgLbAx-HAtwDH4gC3QMfiQLeAx-KAt8DH4sC4QMfjALjAyKNAuQDiAGOAucDH48C6QMikALqA4kBkQLsAx-SAu0DH5MC7gMilALxA4oBlQLyA44BlgLzAwmXAvQDCZgC9QMJmQL2AwmaAvcDCZsC-QMJnAL7AyKdAvwDjwGeAv4DCZ8CgAQioAKBBJABoQKCBAmiAoMECaMChAQipAKHBJEBpQKIBJUBpgKJBAqnAooECqgCiwQKqQKMBAqqAo0ECqsCjwQKrAKRBCKtApIElgGuApQECq8ClgQisAKXBJcBsQKYBAqyApkECrMCmgQitAKdBJgBtQKeBJ4BtgKfBA63AqAEDrgCoQQOuQKiBA66AqMEDrsCpQQOvAKnBCK9AqgEnwG-AqsEDr8CrQQiwAKuBKABwQKwBA7CArEEDsMCsgQixAK1BKEBxQK2BKcBxgK4BAbHArkEBsgCuwQGyQK8BAbKAr0EBssCvwQGzALBBCLNAsIEqAHOAsQEBs8CxgQi0ALHBKkB0QLIBAbSAskEBtMCygQi1ALNBKoB1QLOBK4B1gLPBAXXAtAEBdgC0QQF2QLSBAXaAtMEBdsC1QQF3ALXBCLdAtgErwHeAtoEBd8C3AQi4ALdBLAB4QLeBAXiAt8EBeMC4AQi5ALjBLEB5QLkBLUB5gLlBBXnAuYEFegC5wQV6QLoBBXqAukEFesC6wQV7ALtBCLtAu4EtgHuAvEEFe8C8wQi8AL0BLcB8QL2BBXyAvcEFfMC-AQi9AL7BLgB9QL8BL4B9gL9BBL3Av4EEvgC_wQS-QKABRL6AoEFEvsCgwUS_AKFBSL9AoYFvwH-AogFEv8CigUigAOLBcABgQOMBRKCA40FEoMDjgUihAORBcEBhQOSBccBhgOTBRGHA5QFEYgDlQURiQOWBRGKA5cFEYsDmQURjAObBSKNA5wFyAGOA54FEY8DoAUikAOhBckBkQOiBRGSA6MFEZMDpAUilAOnBcoBlQOoBdABlgOpBQ-XA6oFD5gDqwUPmQOsBQ-aA60FD5sDrwUPnAOxBSKdA7IF0QGeA7QFD58DtgUioAO3BdIBoQO4BQ-iA7kFD6MDugUipAO9BdMBpQO-BdkBpgO_BRCnA8AFEKgDwQUQqQPCBRCqA8MFEKsDxQUQrAPHBSKtA8gF2gGuA8oFEK8DzAUisAPNBdsBsQPOBRCyA88FELMD0AUitAPTBdwBtQPUBeIBtgPVBQe3A9YFB7gD1wUHuQPYBQe6A9kFB7sD2wUHvAPdBSK9A94F4wG-A-AFB78D4gUiwAPjBeQBwQPkBQfCA-UFB8MD5gUixAPpBeUBxQPqBekBxgPrBQjHA-wFCMgD7QUIyQPuBQjKA-8FCMsD8QUIzAPzBSLNA_QF6gHOA_YFCM8D-AUi0AP5BesB0QP6BQjSA_sFCNMD_AUi1AP_BewB1QOABvAB"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("node:buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  AuditLogScalarFieldEnum: () => AuditLogScalarFieldEnum,
  BillingPlanScalarFieldEnum: () => BillingPlanScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  ContactMessageScalarFieldEnum: () => ContactMessageScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  DemoRequestScalarFieldEnum: () => DemoRequestScalarFieldEnum,
  InventoryScalarFieldEnum: () => InventoryScalarFieldEnum,
  InventoryTransactionScalarFieldEnum: () => InventoryTransactionScalarFieldEnum,
  JsonNull: () => JsonNull2,
  JsonNullValueFilter: () => JsonNullValueFilter,
  ModelName: () => ModelName,
  NewsletterSubscriberScalarFieldEnum: () => NewsletterSubscriberScalarFieldEnum,
  NullTypes: () => NullTypes2,
  NullableJsonNullValueInput: () => NullableJsonNullValueInput,
  NullsOrder: () => NullsOrder,
  OrganizationMemberScalarFieldEnum: () => OrganizationMemberScalarFieldEnum,
  OrganizationScalarFieldEnum: () => OrganizationScalarFieldEnum,
  OrganizationSubscriptionScalarFieldEnum: () => OrganizationSubscriptionScalarFieldEnum,
  PaymentTransactionScalarFieldEnum: () => PaymentTransactionScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProductScalarFieldEnum: () => ProductScalarFieldEnum,
  QueryMode: () => QueryMode,
  SaleItemScalarFieldEnum: () => SaleItemScalarFieldEnum,
  SalePaymentScalarFieldEnum: () => SalePaymentScalarFieldEnum,
  SaleReturnItemScalarFieldEnum: () => SaleReturnItemScalarFieldEnum,
  SaleReturnScalarFieldEnum: () => SaleReturnScalarFieldEnum,
  SaleScalarFieldEnum: () => SaleScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  ShopAssignmentScalarFieldEnum: () => ShopAssignmentScalarFieldEnum,
  ShopScalarFieldEnum: () => ShopScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  StorageScalarFieldEnum: () => StorageScalarFieldEnum,
  SupportTicketScalarFieldEnum: () => SupportTicketScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.5.0",
  engine: "280c870be64f457428992c43c1f6d557fab6e29e"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  AuditLog: "AuditLog",
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  BillingPlan: "BillingPlan",
  OrganizationSubscription: "OrganizationSubscription",
  PaymentTransaction: "PaymentTransaction",
  Category: "Category",
  Product: "Product",
  ContactMessage: "ContactMessage",
  DemoRequest: "DemoRequest",
  NewsletterSubscriber: "NewsletterSubscriber",
  SupportTicket: "SupportTicket",
  Storage: "Storage",
  Inventory: "Inventory",
  InventoryTransaction: "InventoryTransaction",
  Organization: "Organization",
  OrganizationMember: "OrganizationMember",
  SalePayment: "SalePayment",
  SaleReturn: "SaleReturn",
  SaleReturnItem: "SaleReturnItem",
  Sale: "Sale",
  SaleItem: "SaleItem",
  Shop: "Shop",
  ShopAssignment: "ShopAssignment"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var AuditLogScalarFieldEnum = {
  id: "id",
  userId: "userId",
  organizationId: "organizationId",
  action: "action",
  entityType: "entityType",
  entityId: "entityId",
  description: "description",
  metadata: "metadata",
  createdAt: "createdAt"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  phone: "phone",
  status: "status",
  platformRole: "platformRole",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var BillingPlanScalarFieldEnum = {
  id: "id",
  organizationId: "organizationId",
  name: "name",
  slug: "slug",
  description: "description",
  amount: "amount",
  currency: "currency",
  interval: "interval",
  isActive: "isActive",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrganizationSubscriptionScalarFieldEnum = {
  id: "id",
  organizationId: "organizationId",
  billingPlanId: "billingPlanId",
  status: "status",
  stripeCustomerId: "stripeCustomerId",
  stripeSubscriptionId: "stripeSubscriptionId",
  startsAt: "startsAt",
  endsAt: "endsAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var PaymentTransactionScalarFieldEnum = {
  id: "id",
  organizationId: "organizationId",
  subscriptionId: "subscriptionId",
  createdById: "createdById",
  amount: "amount",
  currency: "currency",
  status: "status",
  stripePaymentIntentId: "stripePaymentIntentId",
  stripeClientSecret: "stripeClientSecret",
  note: "note",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  organizationId: "organizationId",
  name: "name",
  slug: "slug",
  description: "description",
  status: "status",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProductScalarFieldEnum = {
  id: "id",
  organizationId: "organizationId",
  categoryId: "categoryId",
  name: "name",
  slug: "slug",
  sku: "sku",
  description: "description",
  image: "image",
  price: "price",
  status: "status",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ContactMessageScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  phone: "phone",
  company: "company",
  message: "message",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var DemoRequestScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  phone: "phone",
  company: "company",
  businessType: "businessType",
  teamSize: "teamSize",
  preferredDate: "preferredDate",
  message: "message",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var NewsletterSubscriberScalarFieldEnum = {
  id: "id",
  email: "email",
  isActive: "isActive",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SupportTicketScalarFieldEnum = {
  id: "id",
  organizationId: "organizationId",
  name: "name",
  email: "email",
  subject: "subject",
  category: "category",
  priority: "priority",
  message: "message",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var StorageScalarFieldEnum = {
  id: "id",
  organizationId: "organizationId",
  shopId: "shopId",
  name: "name",
  description: "description",
  status: "status",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var InventoryScalarFieldEnum = {
  id: "id",
  organizationId: "organizationId",
  shopId: "shopId",
  storageId: "storageId",
  productId: "productId",
  quantity: "quantity",
  lowStockThreshold: "lowStockThreshold",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var InventoryTransactionScalarFieldEnum = {
  id: "id",
  organizationId: "organizationId",
  shopId: "shopId",
  storageId: "storageId",
  productId: "productId",
  createdById: "createdById",
  type: "type",
  quantity: "quantity",
  note: "note",
  saleId: "saleId",
  createdAt: "createdAt"
};
var OrganizationScalarFieldEnum = {
  id: "id",
  name: "name",
  slug: "slug",
  email: "email",
  phone: "phone",
  address: "address",
  logo: "logo",
  status: "status",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  suspendedAt: "suspendedAt"
};
var OrganizationMemberScalarFieldEnum = {
  id: "id",
  organizationId: "organizationId",
  userId: "userId",
  role: "role",
  isActive: "isActive",
  joinedAt: "joinedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SalePaymentScalarFieldEnum = {
  id: "id",
  saleId: "saleId",
  receivedById: "receivedById",
  amount: "amount",
  paymentMethod: "paymentMethod",
  note: "note",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SaleReturnScalarFieldEnum = {
  id: "id",
  saleId: "saleId",
  organizationId: "organizationId",
  shopId: "shopId",
  storageId: "storageId",
  returnedById: "returnedById",
  refundAmount: "refundAmount",
  status: "status",
  note: "note",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SaleReturnItemScalarFieldEnum = {
  id: "id",
  saleReturnId: "saleReturnId",
  saleItemId: "saleItemId",
  productId: "productId",
  quantity: "quantity",
  unitPrice: "unitPrice",
  totalPrice: "totalPrice",
  createdAt: "createdAt"
};
var SaleScalarFieldEnum = {
  id: "id",
  organizationId: "organizationId",
  shopId: "shopId",
  createdById: "createdById",
  invoiceNo: "invoiceNo",
  subtotal: "subtotal",
  discount: "discount",
  total: "total",
  paymentMethod: "paymentMethod",
  status: "status",
  note: "note",
  paymentStatus: "paymentStatus",
  paidAmount: "paidAmount",
  dueAmount: "dueAmount",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SaleItemScalarFieldEnum = {
  id: "id",
  saleId: "saleId",
  productId: "productId",
  quantity: "quantity",
  unitPrice: "unitPrice",
  totalPrice: "totalPrice",
  createdAt: "createdAt"
};
var ShopScalarFieldEnum = {
  id: "id",
  organizationId: "organizationId",
  name: "name",
  slug: "slug",
  email: "email",
  phone: "phone",
  address: "address",
  image: "image",
  status: "status",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ShopAssignmentScalarFieldEnum = {
  id: "id",
  organizationId: "organizationId",
  shopId: "shopId",
  userId: "userId",
  isActive: "isActive",
  assignedAt: "assignedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var NullableJsonNullValueInput = {
  DbNull: DbNull2,
  JsonNull: JsonNull2
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var JsonNullValueFilter = {
  DbNull: DbNull2,
  JsonNull: JsonNull2,
  AnyNull: AnyNull2
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/enums.ts
var SubscriptionStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  PAST_DUE: "PAST_DUE",
  CANCELLED: "CANCELLED",
  TRIALING: "TRIALING"
};
var PaymentStatus = {
  PENDING: "PENDING",
  SUCCEEDED: "SUCCEEDED",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED"
};
var UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED"
};
var OrganizationStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED"
};
var OrgRole = {
  ORG_SUPER_ADMIN: "ORG_SUPER_ADMIN",
  ORG_ADMIN: "ORG_ADMIN",
  SHOP_ADMIN: "SHOP_ADMIN",
  STAFF: "STAFF"
};
var ShopStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE"
};
var CategoryStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE"
};
var ProductStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  OUT_OF_STOCK: "OUT_OF_STOCK"
};
var StorageStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE"
};
var PlatformRole = {
  PLATFORM_SUPER_ADMIN: "PLATFORM_SUPER_ADMIN"
};
var SalePaymentStatus = {
  UNPAID: "UNPAID",
  PARTIAL: "PARTIAL",
  PAID: "PAID"
};
var SaleReturnStatus = {
  PARTIAL: "PARTIAL",
  FULL: "FULL"
};
var InventoryTransactionType = {
  STOCK_IN: "STOCK_IN",
  STOCK_OUT: "STOCK_OUT",
  SALE: "SALE",
  ADJUSTMENT: "ADJUSTMENT"
};
var SaleStatus = {
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED"
};

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/app/lib/prisma.ts
var connectionString = `${envVars.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/app/utils/sendEmail.ts
import path2 from "path";
import ejs from "ejs";
import status from "http-status";

// src/app/config/mail.config.ts
import nodemailer from "nodemailer";
var mailTransporter = nodemailer.createTransport({
  host: envVars.EMAIL_SENDER_SMTP_HOST,
  port: Number(envVars.EMAIL_SENDER_SMTP_PORT),
  secure: Number(envVars.EMAIL_SENDER_SMTP_PORT) === 465,
  auth: {
    user: envVars.EMAIL_SENDER_SMTP_USER,
    pass: envVars.EMAIL_SENDER_SMTP_PASS
  }
});

// src/app/utils/sendEmail.ts
var sendEmail = async ({
  to,
  subject,
  templateName,
  templateData
}) => {
  try {
    const templatePath = path2.join(
      process.cwd(),
      "src",
      "emails",
      "layouts",
      `${templateName}.ejs`
    );
    console.log("Using template path:", templatePath);
    const html = await ejs.renderFile(templatePath, {
      ...templateData,
      appName: "Sales Management Software",
      frontendUrl: envVars.FRONTEND_URL,
      currentYear: (/* @__PURE__ */ new Date()).getFullYear()
    });
    const info = await mailTransporter.sendMail({
      from: envVars.EMAIL_SENDER_SMTP_FROM,
      to,
      subject,
      html
    });
    return info;
  } catch (error) {
    console.log("Email sending error:", error);
    throw new AppError_default(status.INTERNAL_SERVER_ERROR, "Failed to send email");
  }
};

// src/app/lib/auth.ts
var auth = betterAuth({
  baseURL: envVars.BETTER_AUTH_URL,
  secret: envVars.BETTER_AUTH_SECRET,
  socialProviders: {
    google: {
      clientId: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET
    }
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [
    envVars.FRONTEND_URL,
    envVars.BETTER_AUTH_URL,
    "http://localhost:3000",
    "http://localhost:5000"
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: false,
    autoSignInAfterVerification: false,
    async sendVerificationEmail({ user, url }) {
      await sendEmail({
        to: user.email,
        subject: "Verify your email",
        templateName: "verify-email",
        templateData: {
          name: user.name,
          verificationUrl: url
        }
      });
    }
  },
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        required: false,
        defaultValue: UserStatus.ACTIVE
      }
    }
  },
  plugins: [
    emailOTP({
      expiresIn: 10 * 60,
      otpLength: 6,
      allowedAttempts: 5,
      async sendVerificationOTP({ email, otp, type }) {
        if (type !== "forget-password") {
          return;
        }
        const user = await prisma.user.findUnique({
          where: { email }
        });
        if (!user || user.isDeleted) {
          return;
        }
        await sendEmail({
          to: email,
          subject: "Reset your password",
          templateName: "forgot-password-otp",
          templateData: {
            name: user.name,
            otp,
            expiryMinutes: 10
          }
        });
      }
    })
  ]
});

// src/app/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, { expiresIn }) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return {
      success: true,
      data: decoded
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error
    };
  }
};
var decodeToken = (token) => {
  const decoded = jwt.decode(token);
  return decoded;
};
var jwtUtils = {
  createToken,
  verifyToken,
  decodeToken
};

// src/app/utils/cookie.ts
var setCookie = (res, key, value, options) => {
  res.cookie(key, value, options);
};
var getCookie = (req, key) => {
  return req.cookies[key];
};
var clearCookie = (res, key, options) => {
  res.clearCookie(key, options);
};
var cookieUtils = {
  setCookie,
  getCookie,
  clearCookie
};

// src/app/utils/token.ts
var getAccessToken = (payload) => {
  const accessToken = jwtUtils.createToken(
    payload,
    envVars.ACCESS_TOKEN_SECRET,
    { expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN }
  );
  return accessToken;
};
var getRefreshToken = (payload) => {
  const refreshToken = jwtUtils.createToken(
    payload,
    envVars.REFRESH_TOKEN_SECRET,
    { expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN }
  );
  return refreshToken;
};
var setAccessTokenCookie = (res, token) => {
  cookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 60 * 24 * 1e3
  });
};
var setRefreshTokenCookie = (res, token) => {
  cookieUtils.setCookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 60 * 24 * 1e3 * 7
  });
};
var setBetterAuthSessionCookie = (res, token) => {
  cookieUtils.setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 60 * 24 * 1e3
  });
};
var tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthSessionCookie
};

// src/app/modules/auth/auth.service.ts
var generateSlug = (value) => value.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
var generateUniqueOrganizationSlug = async (organizationName) => {
  const baseSlug = generateSlug(organizationName) || "organization";
  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const existingOrganization = await prisma.organization.findUnique({
      where: {
        slug
      }
    });
    if (!existingOrganization) {
      return slug;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};
var buildJwtPayload = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      organizationMembers: {
        where: {
          isActive: true
        },
        include: {
          organization: true
        },
        orderBy: {
          createdAt: "asc"
        },
        take: 1
      }
    }
  });
  if (!user) {
    throw new AppError_default(status2.NOT_FOUND, "User not found");
  }
  if (user.status === UserStatus.INACTIVE) {
    throw new AppError_default(status2.FORBIDDEN, "User is inactive");
  }
  if (user.status === UserStatus.SUSPENDED) {
    throw new AppError_default(status2.FORBIDDEN, "User is suspended");
  }
  if (user.isDeleted) {
    throw new AppError_default(status2.NOT_FOUND, "User not found");
  }
  if (user.platformRole === PlatformRole.PLATFORM_SUPER_ADMIN) {
    return {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.platformRole,
      organizationId: null,
      status: user.status,
      isDeleted: user.isDeleted,
      emailVerified: user.emailVerified
    };
  }
  const membership = user.organizationMembers[0];
  if (!membership) {
    throw new AppError_default(
      status2.FORBIDDEN,
      "No active organization membership found"
    );
  }
  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: membership.role,
    organizationId: membership.organizationId,
    status: user.status,
    isDeleted: user.isDeleted,
    emailVerified: user.emailVerified
  };
};
var registerUser = async (payload) => {
  const { organizationName, name, email, password, phone } = payload;
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (existingUser) {
    throw new AppError_default(status2.CONFLICT, "User already exists with this email");
  }
  const slug = await generateUniqueOrganizationSlug(organizationName);
  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password
    }
  });
  if (!data?.user) {
    throw new AppError_default(status2.BAD_REQUEST, "Failed to register user");
  }
  try {
    await prisma.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: {
          name: organizationName,
          slug
        }
      });
      await tx.organizationMember.create({
        data: {
          organizationId: organization.id,
          userId: data.user.id,
          role: OrgRole.ORG_SUPER_ADMIN
        }
      });
      if (phone) {
        await tx.user.update({
          where: {
            id: data.user.id
          },
          data: {
            phone
          }
        });
      }
    });
    const jwtPayload = await buildJwtPayload(data.user.id);
    const accessToken = tokenUtils.getAccessToken(jwtPayload);
    const refreshToken = tokenUtils.getRefreshToken(jwtPayload);
    return {
      ...data,
      accessToken,
      refreshToken
    };
  } catch (error) {
    await prisma.user.delete({
      where: {
        id: data.user.id
      }
    }).catch(() => {
    });
    throw error;
  }
};
var loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!user || user.isDeleted) {
    throw new AppError_default(status2.NOT_FOUND, "User not found");
  }
  if (user.status === UserStatus.INACTIVE) {
    throw new AppError_default(status2.FORBIDDEN, "User is inactive");
  }
  if (user.status === UserStatus.SUSPENDED) {
    throw new AppError_default(status2.FORBIDDEN, "User is suspended");
  }
  const data = await auth.api.signInEmail({
    body: {
      email,
      password
    }
  });
  if (!data?.user) {
    throw new AppError_default(status2.BAD_REQUEST, "Failed to login user");
  }
  const jwtPayload = await buildJwtPayload(data.user.id);
  const accessToken = tokenUtils.getAccessToken(jwtPayload);
  const refreshToken = tokenUtils.getRefreshToken(jwtPayload);
  return {
    ...data,
    accessToken,
    refreshToken
  };
};
var getMe = async (user) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: user.userId
    },
    include: {
      organizationMembers: {
        where: {
          isActive: true
        },
        include: {
          organization: true
        }
      },
      shopAssignments: {
        where: {
          isActive: true
        },
        include: {
          shop: true
        }
      }
    }
  });
  if (!isUserExist) {
    throw new AppError_default(status2.NOT_FOUND, "User not found");
  }
  return isUserExist;
};
var getNewToken = async (refreshToken, sessionToken) => {
  const isSessionTokenExists = await prisma.session.findUnique({
    where: {
      token: sessionToken
    },
    include: {
      user: true
    }
  });
  if (!isSessionTokenExists) {
    throw new AppError_default(status2.BAD_REQUEST, "Invalid session token");
  }
  if (isSessionTokenExists.expiresAt < /* @__PURE__ */ new Date()) {
    throw new AppError_default(status2.UNAUTHORIZED, "Session expired");
  }
  const verifiedRefreshToken = jwtUtils.verifyToken(
    refreshToken,
    envVars.REFRESH_TOKEN_SECRET
  );
  if (!verifiedRefreshToken.success || !verifiedRefreshToken.data) {
    throw new AppError_default(status2.UNAUTHORIZED, "Invalid refresh token");
  }
  const data = verifiedRefreshToken.data;
  const jwtPayload = await buildJwtPayload(data.userId);
  const newAccessToken = tokenUtils.getAccessToken(jwtPayload);
  const newRefreshToken = tokenUtils.getRefreshToken(jwtPayload);
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    sessionToken
  };
};
var changePassword = async (payload, sessionToken) => {
  if (!sessionToken) {
    throw new AppError_default(status2.UNAUTHORIZED, "Session token is missing");
  }
  const session = await auth.api.getSession({
    headers: new Headers({
      cookie: `better-auth.session_token=${sessionToken}`
    })
  });
  if (!session?.user) {
    throw new AppError_default(status2.UNAUTHORIZED, "Invalid session token");
  }
  const { currentPassword, newPassword } = payload;
  const result = await auth.api.changePassword({
    body: {
      currentPassword,
      newPassword,
      revokeOtherSessions: false
    },
    headers: new Headers({
      cookie: `better-auth.session_token=${sessionToken}`
    })
  });
  const jwtPayload = await buildJwtPayload(session.user.id);
  const accessToken = tokenUtils.getAccessToken(jwtPayload);
  const refreshToken = tokenUtils.getRefreshToken(jwtPayload);
  return {
    ...result,
    accessToken,
    refreshToken,
    token: sessionToken
  };
};
var logOutUser = async (sessionToken) => {
  if (!sessionToken) {
    throw new AppError_default(status2.UNAUTHORIZED, "Session token is missing");
  }
  const result = await auth.api.signOut({
    headers: new Headers({
      cookie: `better-auth.session_token=${sessionToken}`
    })
  });
  return result;
};
var forgotPassword = async (payload) => {
  const { email } = payload;
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!user || user.isDeleted) {
    return null;
  }
  if (user.status === UserStatus.SUSPENDED) {
    return null;
  }
  if (user.status === UserStatus.INACTIVE) {
    return null;
  }
  const result = await auth.api.requestPasswordResetEmailOTP({
    body: {
      email
    }
  });
  return result;
};
var resetPassword = async (payload) => {
  const { email, otp, newPassword } = payload;
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!user || user.isDeleted) {
    throw new AppError_default(status2.NOT_FOUND, "User not found");
  }
  if (user.status === UserStatus.INACTIVE) {
    throw new AppError_default(status2.FORBIDDEN, "User is inactive");
  }
  if (user.status === UserStatus.SUSPENDED) {
    throw new AppError_default(status2.FORBIDDEN, "User is suspended");
  }
  const result = await auth.api.resetPasswordEmailOTP({
    body: {
      email,
      otp,
      password: newPassword
    }
  });
  return result;
};
var authService = {
  registerUser,
  loginUser,
  getMe,
  getNewToken,
  changePassword,
  logOutUser,
  forgotPassword,
  resetPassword
};

// src/app/modules/auth/auth.controller.ts
var registerUser2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await authService.registerUser(payload);
  const { accessToken, refreshToken, token, ...rest } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);
  sendResponse(res, {
    httpStatusCode: status3.CREATED,
    success: true,
    message: "User registered successfully. Please check your email to verify your account",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest
    }
  });
});
var loginUser2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await authService.loginUser(payload);
  const { accessToken, refreshToken, token, ...rest } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);
  sendResponse(res, {
    httpStatusCode: status3.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest
    }
  });
});
var getMe2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status3.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await authService.getMe(user);
  sendResponse(res, {
    httpStatusCode: status3.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result
  });
});
var getNewToken2 = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];
  if (!refreshToken) {
    throw new AppError_default(status3.UNAUTHORIZED, "Refresh token is missing");
  }
  if (!betterAuthSessionToken) {
    throw new AppError_default(status3.UNAUTHORIZED, "Session token is missing");
  }
  const result = await authService.getNewToken(
    refreshToken,
    betterAuthSessionToken
  );
  const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, newRefreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, sessionToken);
  sendResponse(res, {
    httpStatusCode: status3.OK,
    success: true,
    message: "New token generated successfully",
    data: {
      accessToken,
      refreshToken: newRefreshToken,
      sessionToken
    }
  });
});
var changePassword2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const sessionToken = req.cookies["better-auth.session_token"];
  if (!sessionToken) {
    throw new AppError_default(status3.UNAUTHORIZED, "Session token is missing");
  }
  const result = await authService.changePassword(payload, sessionToken);
  const { accessToken, refreshToken, token } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);
  sendResponse(res, {
    httpStatusCode: status3.OK,
    success: true,
    message: "Password changed successfully",
    data: result
  });
});
var logOutUser2 = catchAsync(async (req, res) => {
  const sessionToken = req.cookies["better-auth.session_token"];
  if (!sessionToken) {
    throw new AppError_default(status3.UNAUTHORIZED, "Session token is missing");
  }
  const result = await authService.logOutUser(sessionToken);
  cookieUtils.clearCookie(res, "accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  cookieUtils.clearCookie(res, "refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  cookieUtils.clearCookie(res, "better-auth.session_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  sendResponse(res, {
    httpStatusCode: status3.OK,
    success: true,
    message: "User logged out successfully",
    data: result
  });
});
var forgotPassword2 = catchAsync(async (req, res) => {
  const payload = req.body;
  await authService.forgotPassword(payload);
  sendResponse(res, {
    httpStatusCode: status3.OK,
    success: true,
    message: "If the email exists, a password reset OTP has been sent",
    data: null
  });
});
var resetPassword2 = catchAsync(async (req, res) => {
  const payload = req.body;
  await authService.resetPassword(payload);
  sendResponse(res, {
    httpStatusCode: status3.OK,
    success: true,
    message: "Password reset successfully",
    data: null
  });
});
var authController = {
  registerUser: registerUser2,
  loginUser: loginUser2,
  getMe: getMe2,
  getNewToken: getNewToken2,
  changePassword: changePassword2,
  logOutUser: logOutUser2,
  forgotPassword: forgotPassword2,
  resetPassword: resetPassword2
};

// src/app/middlewWire/checkAuth.ts
import status4 from "http-status";
var checkAuth = (...args) => async (req, res, next) => {
  try {
    const authRoles = args.filter(
      (arg) => typeof arg === "string"
    );
    const options = args.find(
      (arg) => typeof arg === "object" && arg !== null
    ) || {};
    const sessionToken = cookieUtils.getCookie(
      req,
      "better-auth.session_token"
    );
    if (!sessionToken) {
      throw new AppError_default(
        status4.UNAUTHORIZED,
        "Unauthorized access! No session token provided"
      );
    }
    const sessionExists = await prisma.session.findFirst({
      where: {
        token: sessionToken,
        expiresAt: {
          gt: /* @__PURE__ */ new Date()
        }
      },
      include: {
        user: {
          include: {
            organizationMembers: {
              where: {
                isActive: true
              },
              include: {
                organization: true
              },
              orderBy: {
                createdAt: "asc"
              },
              take: 1
            }
          }
        }
      }
    });
    if (!sessionExists || !sessionExists.user) {
      throw new AppError_default(
        status4.UNAUTHORIZED,
        "Unauthorized access! Invalid or expired session"
      );
    }
    const user = sessionExists.user;
    const now = /* @__PURE__ */ new Date();
    const expiresAt = new Date(sessionExists.expiresAt);
    const createdAt = new Date(sessionExists.createdAt);
    const sessionLifetime = expiresAt.getTime() - createdAt.getTime();
    const timeRemaining = expiresAt.getTime() - now.getTime();
    const percentRemaining = timeRemaining / sessionLifetime * 100;
    if (percentRemaining < 20) {
      res.setHeader("x-session-refresh", "true");
      res.setHeader("x-session-expires-at", expiresAt.toISOString());
      res.setHeader("x-session-time-remaining", timeRemaining.toString());
    }
    if (user.status === UserStatus.INACTIVE) {
      throw new AppError_default(
        status4.UNAUTHORIZED,
        "Unauthorized access! User is inactive"
      );
    }
    if (user.status === UserStatus.SUSPENDED) {
      throw new AppError_default(
        status4.UNAUTHORIZED,
        "Unauthorized access! User is suspended"
      );
    }
    if (user.isDeleted) {
      throw new AppError_default(
        status4.UNAUTHORIZED,
        "Unauthorized access! User is deleted"
      );
    }
    const membership = user.organizationMembers[0];
    if (!membership) {
      throw new AppError_default(
        status4.FORBIDDEN,
        "Forbidden access! No active organization membership found"
      );
    }
    const organization = membership.organization;
    if (!organization || organization.isDeleted) {
      throw new AppError_default(
        status4.FORBIDDEN,
        "Forbidden access! Organization not found"
      );
    }
    if (organization.status === OrganizationStatus.INACTIVE) {
      throw new AppError_default(
        status4.FORBIDDEN,
        "Your organization is inactive. Please contact support"
      );
    }
    if (organization.status === OrganizationStatus.SUSPENDED) {
      throw new AppError_default(
        status4.FORBIDDEN,
        "Your organization is suspended. Please contact support"
      );
    }
    if (authRoles.length > 0 && !authRoles.includes(membership.role)) {
      throw new AppError_default(
        status4.FORBIDDEN,
        "Forbidden access! You do not have permission to access this resource"
      );
    }
    req.user = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: membership.role,
      organizationId: membership.organizationId,
      status: user.status,
      isDeleted: user.isDeleted,
      emailVerified: user.emailVerified
    };
    if (options.allowWithoutSubscription) {
      return next();
    }
    const isSubscriptionBypassEnabled = envVars.NODE_ENV === "development" && process.env.SUBSCRIPTION_BYPASS === "true";
    if (isSubscriptionBypassEnabled) {
      console.warn("\u26A0\uFE0F Subscription bypass enabled (development only)");
      return next();
    }
    const activeSubscription = await prisma.organizationSubscription.findFirst({
      where: {
        organizationId: membership.organizationId,
        status: SubscriptionStatus.ACTIVE,
        OR: [
          {
            startsAt: null
          },
          {
            startsAt: {
              lte: /* @__PURE__ */ new Date()
            }
          }
        ],
        AND: [
          {
            OR: [
              {
                endsAt: null
              },
              {
                endsAt: {
                  gte: /* @__PURE__ */ new Date()
                }
              }
            ]
          }
        ]
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    if (!activeSubscription) {
      throw new AppError_default(
        status4.FORBIDDEN,
        "No active subscription found. Please subscribe or renew your plan"
      );
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

// src/app/modules/auth/auth.validation.ts
import z from "zod";
var registerUserValidationSchema = z.object({
  organizationName: z.string().min(2, "Organization name must be at least 2 characters").max(100, "Organization name cannot exceed 100 characters"),
  name: z.string().min(2, "Name must be at least 2 characters").max(60, "Name cannot exceed 60 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(128, "Password cannot exceed 128 characters"),
  phone: z.string().min(11, "Phone number must be at least 11 characters").max(20, "Phone number cannot exceed 20 characters").optional()
});
var loginUserValidationSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(128, "Password cannot exceed 128 characters")
});
var changePasswordValidationSchema = z.object({
  currentPassword: z.string().min(8, "Current password must be at least 8 characters").max(128, "Current password cannot exceed 128 characters"),
  newPassword: z.string().min(8, "New password must be at least 8 characters").max(128, "New password cannot exceed 128 characters")
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: "New password must be different from current password",
  path: ["newPassword"]
});
var forgotPasswordValidationSchema = z.object({
  email: z.email("Invalid email address")
});
var resetPasswordValidationSchema = z.object({
  email: z.email("Invalid email address"),
  otp: z.string().length(6, "OTP must be exactly 6 characters").regex(/^\d{6}$/, "OTP must be a 6-digit number"),
  newPassword: z.string().min(8, "New password must be at least 8 characters").max(128, "New password cannot exceed 128 characters")
});

// src/app/middlewWire/validateRequest.ts
var validateRequest = (zodSchema) => {
  return (req, _res, next) => {
    try {
      if (req.body?.data) {
        req.body = JSON.parse(req.body.data);
      }
      const parsedResult = zodSchema.safeParse(req.body);
      if (!parsedResult.success) {
        return next(parsedResult.error);
      }
      req.body = parsedResult.data;
      return next();
    } catch (error) {
      return next(error);
    }
  };
};

// src/app/middlewWire/checkPlatformAuth.ts
import status5 from "http-status";
var checkPlatformAuth = (...authRoles) => async (req, res, next) => {
  try {
    const sessionToken = cookieUtils.getCookie(
      req,
      "better-auth.session_token"
    );
    if (!sessionToken) {
      throw new AppError_default(
        status5.UNAUTHORIZED,
        "Unauthorized access! No session token provided"
      );
    }
    const sessionExists = await prisma.session.findFirst({
      where: {
        token: sessionToken,
        expiresAt: {
          gt: /* @__PURE__ */ new Date()
        }
      },
      include: {
        user: true
      }
    });
    if (!sessionExists || !sessionExists.user) {
      throw new AppError_default(
        status5.UNAUTHORIZED,
        "Unauthorized access! Invalid or expired session"
      );
    }
    const user = sessionExists.user;
    const now = /* @__PURE__ */ new Date();
    const expiresAt = new Date(sessionExists.expiresAt);
    const createdAt = new Date(sessionExists.createdAt);
    const sessionLifetime = expiresAt.getTime() - createdAt.getTime();
    const timeRemaining = expiresAt.getTime() - now.getTime();
    const percentRemaining = timeRemaining / sessionLifetime * 100;
    if (percentRemaining < 20) {
      res.setHeader("x-session-refresh", "true");
      res.setHeader("x-session-expires-at", expiresAt.toISOString());
      res.setHeader("x-session-time-remaining", timeRemaining.toString());
    }
    if (user.status === UserStatus.INACTIVE) {
      throw new AppError_default(
        status5.UNAUTHORIZED,
        "Unauthorized access! User is inactive"
      );
    }
    if (user.status === UserStatus.SUSPENDED) {
      throw new AppError_default(
        status5.UNAUTHORIZED,
        "Unauthorized access! User is suspended"
      );
    }
    if (user.isDeleted) {
      throw new AppError_default(
        status5.UNAUTHORIZED,
        "Unauthorized access! User is deleted"
      );
    }
    if (!user.platformRole) {
      throw new AppError_default(
        status5.FORBIDDEN,
        "Forbidden access! No platform role found"
      );
    }
    if (authRoles.length > 0 && !authRoles.includes(user.platformRole)) {
      throw new AppError_default(
        status5.FORBIDDEN,
        "Forbidden access! You do not have permission to access this resource"
      );
    }
    req.user = {
      userId: user.id,
      email: user.email,
      role: user.platformRole
    };
    next();
  } catch (error) {
    next(error);
  }
};

// src/app/modules/auth/auth.route.ts
var router = Router();
router.post(
  "/register",
  validateRequest(registerUserValidationSchema),
  authController.registerUser
);
router.post(
  "/login",
  validateRequest(loginUserValidationSchema),
  authController.loginUser
);
router.get(
  "/me",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF,
    { allowWithoutSubscription: true }
  ),
  authController.getMe
);
router.post("/refresh-token", authController.getNewToken);
router.post(
  "/change-password",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF,
    { allowWithoutSubscription: true }
  ),
  validateRequest(changePasswordValidationSchema),
  authController.changePassword
);
router.post(
  "/logout",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF,
    { allowWithoutSubscription: true }
  ),
  authController.logOutUser
);
router.post(
  "/forgot-password",
  validateRequest(forgotPasswordValidationSchema),
  authController.forgotPassword
);
router.post(
  "/reset-password",
  validateRequest(resetPasswordValidationSchema),
  authController.resetPassword
);
router.get(
  "/platform/me",
  checkPlatformAuth(PlatformRole.PLATFORM_SUPER_ADMIN),
  authController.getMe
);
var authRoutes = router;

// src/app/modules/organization/organization.route.ts
import { Router as Router2 } from "express";

// src/app/modules/organization/organization.controller.ts
import status8 from "http-status";

// src/app/modules/organization/organization.service.ts
import status7 from "http-status";

// src/app/config/cloudinary.config.ts
import { v2 as cloudinary } from "cloudinary";
import status6 from "http-status";
cloudinary.config({
  cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
  api_key: envVars.CLOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY_API_SECRET
});
var deleteFileFromCloudinary = async (url) => {
  try {
    if (!url || !url.includes("res.cloudinary.com")) {
      return;
    }
    const uploadPart = url.split("/upload/")[1];
    if (!uploadPart) {
      return;
    }
    const publicIdWithExtension = uploadPart.split("/").slice(1).join("/").split("?")[0];
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");
    if (!publicId) {
      return;
    }
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image"
    });
  } catch (error) {
    console.log("Error deleting file from cloudinary", error);
    throw new AppError_default(
      status6.INTERNAL_SERVER_ERROR,
      "Failed to delete file from cloudinary"
    );
  }
};
var cloudinaryUpload = cloudinary;

// src/app/modules/organization/organization.service.ts
var getMyOrganization = async (user) => {
  const organization = await prisma.organization.findUnique({
    where: {
      id: user.organizationId
    },
    include: {
      members: {
        where: {
          isActive: true
        },
        include: {
          user: true
        }
      },
      shops: {
        where: {
          isDeleted: false
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });
  if (!organization || organization.isDeleted) {
    throw new AppError_default(status7.NOT_FOUND, "Organization not found");
  }
  if (organization.status === OrganizationStatus.INACTIVE) {
    throw new AppError_default(status7.FORBIDDEN, "Organization is inactive");
  }
  if (organization.status === OrganizationStatus.SUSPENDED) {
    throw new AppError_default(status7.FORBIDDEN, "Organization is suspended");
  }
  return organization;
};
var updateMyOrganization = async (user, payload, file) => {
  const existingOrganization = await prisma.organization.findUnique({
    where: {
      id: user.organizationId
    }
  });
  if (!existingOrganization || existingOrganization.isDeleted) {
    throw new AppError_default(status7.NOT_FOUND, "Organization not found");
  }
  if (existingOrganization.status === OrganizationStatus.SUSPENDED) {
    throw new AppError_default(
      status7.FORBIDDEN,
      "Suspended organization cannot be updated"
    );
  }
  const hasAnyUpdateField = Object.keys(payload).length > 0 || !!file;
  if (!hasAnyUpdateField) {
    throw new AppError_default(status7.BAD_REQUEST, "No update data provided");
  }
  const uploadedFile = file;
  const logoUrl = uploadedFile?.path || uploadedFile?.secure_url || existingOrganization.logo || void 0;
  const updatedOrganization = await prisma.organization.update({
    where: {
      id: user.organizationId
    },
    data: {
      ...payload,
      logo: logoUrl
    }
  });
  if (file && existingOrganization.logo && existingOrganization.logo !== logoUrl) {
    await deleteFileFromCloudinary(existingOrganization.logo);
  }
  return updatedOrganization;
};
var organizationService = {
  getMyOrganization,
  updateMyOrganization
};

// src/app/modules/organization/organization.controller.ts
var getMyOrganization2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status8.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await organizationService.getMyOrganization(user);
  sendResponse(res, {
    httpStatusCode: status8.OK,
    success: true,
    message: "Organization fetched successfully",
    data: result
  });
});
var updateMyOrganization2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status8.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await organizationService.updateMyOrganization(
    user,
    req.body,
    req.file
  );
  sendResponse(res, {
    httpStatusCode: status8.OK,
    success: true,
    message: "Organization updated successfully",
    data: result
  });
});
var organizationController = {
  getMyOrganization: getMyOrganization2,
  updateMyOrganization: updateMyOrganization2
};

// src/app/modules/organization/organization.validation.ts
import z2 from "zod";
var updateOrganizationValidationSchema = z2.object({
  name: z2.string().min(2, "Organization name must be at least 2 characters").max(100, "Organization name cannot exceed 100 characters").optional(),
  email: z2.email("Invalid email address").optional(),
  phone: z2.string().min(11, "Phone number must be at least 11 characters").max(20, "Phone number cannot exceed 20 characters").optional(),
  address: z2.string().min(3, "Address must be at least 3 characters").max(255, "Address cannot exceed 255 characters").optional()
});

// src/app/config/multer.config.ts
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
var storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: async (_req, file) => {
    const originalName = file.originalname;
    const extension = originalName.split(".").pop()?.toLowerCase();
    const filenameWithoutExtension = originalName.split(".").slice(0, -1).join(".").toLowerCase().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");
    const uniqueName = Math.random().toString(36).substring(2) + "-" + Date.now() + "-" + filenameWithoutExtension;
    const folder = extension === "pdf" ? "pdfs" : "images";
    return {
      folder: `sales-management-software/${folder}`,
      public_id: uniqueName,
      resource_type: "auto"
    };
  }
});
var multerUpload = multer({ storage });

// src/app/modules/organization/organization.route.ts
var router2 = Router2();
router2.get(
  "/me",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, {
    allowWithoutSubscription: true
  }),
  organizationController.getMyOrganization
);
router2.patch(
  "/me",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, {
    allowWithoutSubscription: true
  }),
  multerUpload.single("logo"),
  validateRequest(updateOrganizationValidationSchema),
  organizationController.updateMyOrganization
);
var organizationRoutes = router2;

// src/app/modules/shop/shop.route.ts
import { Router as Router3 } from "express";

// src/app/modules/shop/shop.controller.ts
import status10 from "http-status";

// src/app/modules/shop/shop.service.ts
import status9 from "http-status";

// src/app/modules/shop/shop.constant.ts
var shopSearchableFields = ["name", "email", "phone", "address"];
var shopFilterableFields = ["status", "email", "phone"];
var shopSortableFields = ["createdAt", "name", "status"];

// src/app/builder/QueryBuilder.ts
var QueryBuilder = class {
  constructor(model, queryParams, config2 = {}) {
    this.model = model;
    this.queryParams = queryParams;
    this.config = config2;
    this.query = {
      where: {},
      include: {},
      orderBy: {},
      skip: 0,
      take: this.config.defaultLimit ?? 10
    };
    this.countQuery = {
      where: {}
    };
  }
  model;
  queryParams;
  config;
  query;
  countQuery;
  page = 1;
  limit = 10;
  skip = 0;
  sortBy = "createdAt";
  sortOrder = "desc";
  selectFields = {};
  search() {
    const { searchTerm } = this.queryParams;
    const { searchableFields } = this.config;
    if (!searchTerm || !searchableFields || searchableFields.length === 0) {
      return this;
    }
    const searchConditions = searchableFields.map(
      (field) => {
        if (field.includes(".")) {
          return this.buildNestedCondition(field, {
            contains: searchTerm,
            mode: "insensitive"
          });
        }
        const stringFilter = {
          contains: searchTerm,
          mode: "insensitive"
        };
        return {
          [field]: stringFilter
        };
      }
    );
    const queryWhere = this.query.where;
    const countWhere = this.countQuery.where;
    queryWhere.OR = [...queryWhere.OR ?? [], ...searchConditions];
    countWhere.OR = [...countWhere.OR ?? [], ...searchConditions];
    return this;
  }
  filter() {
    const { filterableFields } = this.config;
    const excludedFields = [
      "searchTerm",
      "page",
      "limit",
      "sortBy",
      "sortOrder",
      "fields",
      "includes"
    ];
    const filterParams = {};
    Object.keys(this.queryParams).forEach((key) => {
      if (!excludedFields.includes(key)) {
        const value = this.queryParams[key];
        if (value !== void 0 && value !== "") {
          filterParams[key] = value;
        }
      }
    });
    const queryWhere = this.query.where;
    const countQueryWhere = this.countQuery.where;
    Object.keys(filterParams).forEach((key) => {
      const value = filterParams[key];
      const isAllowedField = !filterableFields || filterableFields.length === 0 || filterableFields.includes(key);
      if (!isAllowedField) {
        return;
      }
      const parsedValue = typeof value === "object" && value !== null && !Array.isArray(value) ? this.parseRangeFilter(
        value
      ) : this.parseFilterValue(value);
      if (key.includes(".")) {
        const nestedCondition = this.buildNestedCondition(key, parsedValue);
        this.query.where = this.deepMerge(queryWhere, nestedCondition);
        this.countQuery.where = this.deepMerge(
          countQueryWhere,
          nestedCondition
        );
      } else {
        queryWhere[key] = parsedValue;
        countQueryWhere[key] = parsedValue;
      }
    });
    return this;
  }
  paginate() {
    const defaultLimit = this.config.defaultLimit ?? 10;
    const maxLimit = this.config.maxLimit ?? 100;
    const page = Number(this.queryParams.page) || 1;
    const limit = Number(this.queryParams.limit) || defaultLimit;
    this.page = page < 1 ? 1 : page;
    this.limit = limit > maxLimit ? maxLimit : limit < 1 ? defaultLimit : limit;
    this.skip = (this.page - 1) * this.limit;
    this.query.skip = this.skip;
    this.query.take = this.limit;
    return this;
  }
  sort() {
    const defaultSortBy = this.config.defaultSortBy ?? "createdAt";
    const defaultSortOrder = this.config.defaultSortOrder ?? "desc";
    const requestedSortBy = typeof this.queryParams.sortBy === "string" ? this.queryParams.sortBy : defaultSortBy;
    const requestedSortOrder = this.queryParams.sortOrder === "asc" ? "asc" : defaultSortOrder;
    const isAllowedSortField = !this.config.sortableFields || this.config.sortableFields.length === 0 || this.config.sortableFields.includes(requestedSortBy);
    this.sortBy = isAllowedSortField ? requestedSortBy : defaultSortBy;
    this.sortOrder = requestedSortOrder;
    if (this.sortBy.includes(".")) {
      this.query.orderBy = this.buildNestedCondition(
        this.sortBy,
        this.sortOrder
      );
    } else {
      this.query.orderBy = {
        [this.sortBy]: this.sortOrder
      };
    }
    return this;
  }
  fields() {
    const fieldsParam = this.queryParams.fields;
    if (fieldsParam && typeof fieldsParam === "string") {
      const fieldsArray = fieldsParam.split(",").map((field) => field.trim()).filter(Boolean);
      this.selectFields = {};
      fieldsArray.forEach((field) => {
        this.selectFields[field] = true;
      });
      this.query.select = this.selectFields;
      delete this.query.include;
    }
    return this;
  }
  include(relation) {
    if (Object.keys(this.selectFields).length > 0) {
      return this;
    }
    this.query.include = {
      ...this.query.include,
      ...relation
    };
    return this;
  }
  dynamicInclude(includeConfig, defaultInclude = []) {
    if (Object.keys(this.selectFields).length > 0) {
      return this;
    }
    const result = {};
    defaultInclude.forEach((field) => {
      if (includeConfig[field]) {
        result[field] = includeConfig[field];
      }
    });
    const includeParam = this.queryParams.includes;
    if (includeParam && typeof includeParam === "string") {
      const requestedRelations = includeParam.split(",").map((relation) => relation.trim()).filter(Boolean);
      requestedRelations.forEach((relation) => {
        if (includeConfig[relation]) {
          result[relation] = includeConfig[relation];
        }
      });
    }
    this.query.include = {
      ...this.query.include,
      ...result
    };
    return this;
  }
  where(condition) {
    this.query.where = this.deepMerge(
      this.query.where,
      condition
    );
    this.countQuery.where = this.deepMerge(
      this.countQuery.where,
      condition
    );
    return this;
  }
  async execute() {
    const [total, data] = await Promise.all([
      this.model.count(
        this.countQuery
      ),
      this.model.findMany(
        this.query
      )
    ]);
    const totalPages = Math.ceil(total / this.limit);
    return {
      data,
      meta: {
        page: this.page,
        limit: this.limit,
        total,
        totalPages
      }
    };
  }
  async count() {
    return await this.model.count(
      this.countQuery
    );
  }
  getQuery() {
    return this.query;
  }
  buildNestedCondition(path4, value) {
    const keys = path4.split(".");
    return keys.reverse().reduce(
      (acc, key) => {
        return { [key]: acc };
      },
      value
    );
  }
  deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
      if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
        if (result[key] && typeof result[key] === "object" && !Array.isArray(result[key])) {
          result[key] = this.deepMerge(
            result[key],
            source[key]
          );
        } else {
          result[key] = source[key];
        }
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }
  parseFilterValue(value) {
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
    if (typeof value === "string" && value.includes(",")) {
      return {
        in: value.split(",").map((item) => item.trim()).filter(Boolean).map((item) => this.parseFilterValue(item))
      };
    }
    if (typeof value === "string" && !isNaN(Number(value)) && value !== "") {
      return Number(value);
    }
    if (Array.isArray(value)) {
      return {
        in: value.map((item) => this.parseFilterValue(item))
      };
    }
    return value;
  }
  parseRangeFilter(value) {
    const rangeQuery = {};
    Object.keys(value).forEach((operator) => {
      const operatorValue = value[operator];
      switch (operator) {
        case "lt":
        case "lte":
        case "gt":
        case "gte":
        case "equals":
        case "not":
        case "contains":
        case "startsWith":
        case "endsWith": {
          const parsedValue = typeof operatorValue === "string" && !isNaN(Number(operatorValue)) ? Number(operatorValue) : operatorValue;
          if (!Array.isArray(parsedValue)) {
            rangeQuery[operator] = parsedValue;
          }
          break;
        }
        case "in":
        case "notIn":
          if (Array.isArray(operatorValue)) {
            rangeQuery[operator] = operatorValue;
          } else {
            const parsedValue = typeof operatorValue === "string" && !isNaN(Number(operatorValue)) ? Number(operatorValue) : operatorValue;
            rangeQuery[operator] = [parsedValue];
          }
          break;
        default:
          break;
      }
    });
    return Object.keys(rangeQuery).length > 0 ? rangeQuery : value;
  }
};

// src/app/modules/shop/shop.service.ts
var generateSlug2 = (value) => value.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
var ensureOrg = (user) => {
  if (!user.organizationId) {
    throw new AppError_default(status9.BAD_REQUEST, "Organization context is missing");
  }
  return user.organizationId;
};
var generateUniqueShopSlug = async (organizationId, shopName) => {
  const baseSlug = generateSlug2(shopName) || "shop";
  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const existingShop = await prisma.shop.findFirst({
      where: {
        organizationId,
        slug
      }
    });
    if (!existingShop) {
      return slug;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};
var createShop = async (user, payload, file) => {
  const organizationId = ensureOrg(user);
  const slug = await generateUniqueShopSlug(organizationId, payload.name);
  const uploadedFile = file;
  const imageUrl = uploadedFile?.path || uploadedFile?.secure_url || null;
  const shop = await prisma.shop.create({
    data: {
      organizationId,
      name: payload.name,
      slug,
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
      image: imageUrl
    }
  });
  return shop;
};
var getAllShops = async (user, query) => {
  const organizationId = ensureOrg(user);
  const queryBuilder = new QueryBuilder(prisma.shop, query, {
    searchableFields: shopSearchableFields,
    filterableFields: shopFilterableFields,
    sortableFields: shopSortableFields,
    defaultSortBy: "createdAt",
    defaultSortOrder: "desc",
    defaultLimit: 10,
    maxLimit: 100
  });
  const result = await queryBuilder.search().filter().sort().paginate().where({
    organizationId,
    isDeleted: false
  }).execute();
  return result;
};
var getSingleShop = async (user, shopId) => {
  const organizationId = ensureOrg(user);
  const shop = await prisma.shop.findFirst({
    where: {
      id: shopId,
      organizationId,
      isDeleted: false
    }
  });
  if (!shop) {
    throw new AppError_default(status9.NOT_FOUND, "Shop not found");
  }
  return shop;
};
var updateShop = async (user, shopId, payload, file) => {
  const organizationId = ensureOrg(user);
  const existingShop = await prisma.shop.findFirst({
    where: {
      id: shopId,
      organizationId,
      isDeleted: false
    }
  });
  if (!existingShop) {
    throw new AppError_default(status9.NOT_FOUND, "Shop not found");
  }
  const hasAnyUpdateField = Object.keys(payload).length > 0 || !!file;
  if (!hasAnyUpdateField) {
    throw new AppError_default(status9.BAD_REQUEST, "No update data provided");
  }
  let slug = existingShop.slug;
  if (payload.name && payload.name !== existingShop.name) {
    slug = await generateUniqueShopSlug(organizationId, payload.name);
  }
  const uploadedFile = file;
  const imageUrl = uploadedFile?.path || uploadedFile?.secure_url || existingShop.image || void 0;
  const updatedShop = await prisma.shop.update({
    where: {
      id: existingShop.id
    },
    data: {
      ...payload,
      slug,
      image: imageUrl
    }
  });
  if (file && existingShop.image && existingShop.image !== imageUrl) {
    await deleteFileFromCloudinary(existingShop.image);
  }
  return updatedShop;
};
var updateShopStatus = async (user, shopId, payload) => {
  const organizationId = ensureOrg(user);
  const existingShop = await prisma.shop.findFirst({
    where: {
      id: shopId,
      organizationId,
      isDeleted: false
    }
  });
  if (!existingShop) {
    throw new AppError_default(status9.NOT_FOUND, "Shop not found");
  }
  const updatedShop = await prisma.shop.update({
    where: {
      id: existingShop.id
    },
    data: {
      status: payload.status
    }
  });
  return updatedShop;
};
var deleteShop = async (user, shopId) => {
  const organizationId = ensureOrg(user);
  const existingShop = await prisma.shop.findFirst({
    where: {
      id: shopId,
      organizationId,
      isDeleted: false
    }
  });
  if (!existingShop) {
    throw new AppError_default(status9.NOT_FOUND, "Shop not found");
  }
  const relatedStorageExists = await prisma.storage.findFirst({
    where: {
      shopId: existingShop.id,
      organizationId,
      isDeleted: false
    },
    select: {
      id: true
    }
  });
  if (relatedStorageExists) {
    throw new AppError_default(
      status9.BAD_REQUEST,
      "Cannot delete shop because it has active storages"
    );
  }
  const relatedInventoryExists = await prisma.inventory.findFirst({
    where: {
      shopId: existingShop.id,
      organizationId
    },
    select: {
      id: true
    }
  });
  if (relatedInventoryExists) {
    throw new AppError_default(
      status9.BAD_REQUEST,
      "Cannot delete shop because inventory exists for this shop"
    );
  }
  const relatedSaleExists = await prisma.sale.findFirst({
    where: {
      shopId: existingShop.id,
      organizationId
    },
    select: {
      id: true
    }
  });
  if (relatedSaleExists) {
    throw new AppError_default(
      status9.BAD_REQUEST,
      "Cannot delete shop because sales already exist for this shop"
    );
  }
  const relatedAssignmentExists = await prisma.shopAssignment.findFirst({
    where: {
      shopId: existingShop.id,
      organizationId,
      isActive: true
    },
    select: {
      id: true
    }
  });
  if (relatedAssignmentExists) {
    throw new AppError_default(
      status9.BAD_REQUEST,
      "Cannot delete shop because staff are still assigned to it"
    );
  }
  const deletedShop = await prisma.shop.update({
    where: {
      id: existingShop.id
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
  return deletedShop;
};
var shopService = {
  createShop,
  getAllShops,
  getSingleShop,
  updateShop,
  updateShopStatus,
  deleteShop
};

// src/app/modules/shop/shop.controller.ts
var createShop2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status10.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await shopService.createShop(
    user,
    req.body,
    req.file
  );
  sendResponse(res, {
    httpStatusCode: status10.CREATED,
    success: true,
    message: "Shop created successfully",
    data: result
  });
});
var getAllShops2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status10.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await shopService.getAllShops(user, req.query);
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Shops fetched successfully",
    meta: result.meta,
    data: result.data
  });
});
var getSingleShop2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status10.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await shopService.getSingleShop(user, req.params.id);
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Shop fetched successfully",
    data: result
  });
});
var updateShop2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status10.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await shopService.updateShop(
    user,
    req.params.id,
    req.body,
    req.file
  );
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Shop updated successfully",
    data: result
  });
});
var updateShopStatus2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status10.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await shopService.updateShopStatus(
    user,
    req.params.id,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Shop status updated successfully",
    data: result
  });
});
var deleteShop2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status10.UNAUTHORIZED, "Unauthorized access");
  }
  const { id } = req.params;
  const result = await shopService.deleteShop(user, id);
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Shop deleted successfully",
    data: result
  });
});
var shopController = {
  createShop: createShop2,
  getAllShops: getAllShops2,
  getSingleShop: getSingleShop2,
  updateShop: updateShop2,
  updateShopStatus: updateShopStatus2,
  deleteShop: deleteShop2
};

// src/app/modules/shop/shop.validation.ts
import z3 from "zod";
var createShopValidationSchema = z3.object({
  name: z3.string().min(2, "Shop name must be at least 2 characters").max(100, "Shop name cannot exceed 100 characters"),
  email: z3.email("Invalid email address").optional(),
  phone: z3.string().min(11, "Phone number must be at least 11 characters").max(20, "Phone number cannot exceed 20 characters").optional(),
  address: z3.string().min(3, "Address must be at least 3 characters").max(255, "Address cannot exceed 255 characters").optional()
});
var updateShopValidationSchema = z3.object({
  name: z3.string().min(2, "Shop name must be at least 2 characters").max(100, "Shop name cannot exceed 100 characters").optional(),
  email: z3.email("Invalid email address").optional(),
  phone: z3.string().min(11, "Phone number must be at least 11 characters").max(20, "Phone number cannot exceed 20 characters").optional(),
  address: z3.string().min(3, "Address must be at least 3 characters").max(255, "Address cannot exceed 255 characters").optional()
});
var updateShopStatusValidationSchema = z3.object({
  status: z3.enum([ShopStatus.ACTIVE, ShopStatus.INACTIVE])
});

// src/app/modules/shop/shop.route.ts
var router3 = Router3();
router3.post(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  multerUpload.single("image"),
  validateRequest(createShopValidationSchema),
  shopController.createShop
);
router3.get(
  "/",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF
  ),
  shopController.getAllShops
);
router3.get(
  "/:id",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF
  ),
  shopController.getSingleShop
);
router3.patch(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  multerUpload.single("image"),
  validateRequest(updateShopValidationSchema),
  shopController.updateShop
);
router3.patch(
  "/:id/status",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(updateShopStatusValidationSchema),
  shopController.updateShopStatus
);
router3.delete(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  shopController.deleteShop
);
var shopRoutes = router3;

// src/app/modules/staff/staff.route.ts
import { Router as Router4 } from "express";

// src/app/modules/staff/staff.controller.ts
import status12 from "http-status";

// src/app/modules/staff/staff.service.ts
import status11 from "http-status";

// src/app/modules/staff/staff.constant.ts
var staffSearchableFields = ["user.name", "user.email"];
var staffFilterableFields = ["role", "isActive", "user.status"];
var staffSortableFields = ["createdAt", "joinedAt", "role"];

// src/app/modules/staff/staff.service.ts
var createStaff = async (user, payload, file) => {
  const { name, email, password, phone, shopId, role } = payload;
  if (role === OrgRole.ORG_SUPER_ADMIN) {
    throw new AppError_default(
      status11.BAD_REQUEST,
      "ORG_SUPER_ADMIN cannot be assigned from this endpoint"
    );
  }
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (existingUser) {
    throw new AppError_default(status11.CONFLICT, "User already exists with this email");
  }
  const shop = await prisma.shop.findFirst({
    where: {
      id: shopId,
      organizationId: user.organizationId,
      isDeleted: false
    }
  });
  if (!shop) {
    throw new AppError_default(status11.NOT_FOUND, "Shop not found");
  }
  const uploadedFile = file;
  const imageUrl = uploadedFile?.path || uploadedFile?.secure_url || null;
  const authData = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password
    }
  });
  if (!authData?.user) {
    throw new AppError_default(status11.BAD_REQUEST, "Failed to create staff user");
  }
  try {
    await prisma.$transaction(async (tx) => {
      await tx.organizationMember.create({
        data: {
          organizationId: user.organizationId,
          userId: authData.user.id,
          role
        }
      });
      await tx.shopAssignment.create({
        data: {
          organizationId: user.organizationId,
          shopId,
          userId: authData.user.id
        }
      });
      await tx.user.update({
        where: {
          id: authData.user.id
        },
        data: {
          phone,
          image: imageUrl
        }
      });
    });
    const createdStaff = await prisma.user.findUnique({
      where: {
        id: authData.user.id
      },
      include: {
        organizationMembers: {
          include: {
            organization: true
          }
        },
        shopAssignments: {
          include: {
            shop: true
          }
        }
      }
    });
    return createdStaff;
  } catch (error) {
    await prisma.user.delete({
      where: {
        id: authData.user.id
      }
    }).catch(() => {
    });
    throw error;
  }
};
var getAllStaff = async (user, query) => {
  const queryBuilder = new QueryBuilder(prisma.organizationMember, query, {
    searchableFields: staffSearchableFields,
    filterableFields: staffFilterableFields,
    sortableFields: staffSortableFields,
    defaultSortBy: "createdAt",
    defaultSortOrder: "desc",
    defaultLimit: 10,
    maxLimit: 100
  });
  const result = await queryBuilder.search().filter().sort().paginate().include({
    user: true,
    organization: true
  }).where({
    organizationId: user.organizationId,
    user: {
      isDeleted: false
    }
  }).execute();
  return result;
};
var getSingleStaff = async (user, staffId) => {
  const staff = await prisma.user.findFirst({
    where: {
      id: staffId,
      isDeleted: false,
      organizationMembers: {
        some: {
          organizationId: user.organizationId
        }
      }
    },
    include: {
      organizationMembers: {
        include: {
          organization: true
        }
      },
      shopAssignments: {
        where: {
          organizationId: user.organizationId,
          isActive: true
        },
        include: {
          shop: true
        }
      }
    }
  });
  if (!staff) {
    throw new AppError_default(status11.NOT_FOUND, "Staff not found");
  }
  return staff;
};
var updateStaff = async (user, staffId, payload, file) => {
  const existingStaff = await prisma.user.findFirst({
    where: {
      id: staffId,
      isDeleted: false,
      organizationMembers: {
        some: {
          organizationId: user.organizationId
        }
      }
    },
    include: {
      organizationMembers: true,
      shopAssignments: {
        where: {
          organizationId: user.organizationId,
          isActive: true
        }
      }
    }
  });
  if (!existingStaff) {
    throw new AppError_default(status11.NOT_FOUND, "Staff not found");
  }
  const hasAnyUpdateField = Object.keys(payload).length > 0 || !!file;
  if (!hasAnyUpdateField) {
    throw new AppError_default(status11.BAD_REQUEST, "No update data provided");
  }
  if (payload.shopId) {
    const shop = await prisma.shop.findFirst({
      where: {
        id: payload.shopId,
        organizationId: user.organizationId,
        isDeleted: false
      }
    });
    if (!shop) {
      throw new AppError_default(status11.NOT_FOUND, "Shop not found");
    }
  }
  const uploadedFile = file;
  const imageUrl = uploadedFile?.path || uploadedFile?.secure_url || existingStaff.image || void 0;
  await prisma.$transaction(async (tx) => {
    if (payload.name || payload.phone || file) {
      await tx.user.update({
        where: {
          id: existingStaff.id
        },
        data: {
          name: payload.name,
          phone: payload.phone,
          image: imageUrl
        }
      });
    }
    if (payload.role) {
      await tx.organizationMember.updateMany({
        where: {
          userId: existingStaff.id,
          organizationId: user.organizationId
        },
        data: {
          role: payload.role
        }
      });
    }
    if (payload.shopId) {
      await tx.shopAssignment.updateMany({
        where: {
          userId: existingStaff.id,
          organizationId: user.organizationId
        },
        data: {
          isActive: false
        }
      });
      await tx.shopAssignment.create({
        data: {
          organizationId: user.organizationId,
          shopId: payload.shopId,
          userId: existingStaff.id
        }
      });
    }
  });
  if (file && existingStaff.image && existingStaff.image !== imageUrl) {
    await deleteFileFromCloudinary(existingStaff.image);
  }
  const updatedStaff = await prisma.user.findUnique({
    where: {
      id: existingStaff.id
    },
    include: {
      organizationMembers: {
        include: {
          organization: true
        }
      },
      shopAssignments: {
        where: {
          organizationId: user.organizationId,
          isActive: true
        },
        include: {
          shop: true
        }
      }
    }
  });
  return updatedStaff;
};
var updateStaffStatus = async (user, staffId, payload) => {
  const existingStaff = await prisma.user.findFirst({
    where: {
      id: staffId,
      isDeleted: false,
      organizationMembers: {
        some: {
          organizationId: user.organizationId
        }
      }
    }
  });
  if (!existingStaff) {
    throw new AppError_default(status11.NOT_FOUND, "Staff not found");
  }
  const updatedStaff = await prisma.user.update({
    where: {
      id: existingStaff.id
    },
    data: {
      status: payload.status
    }
  });
  return updatedStaff;
};
var staffService = {
  createStaff,
  getAllStaff,
  getSingleStaff,
  updateStaff,
  updateStaffStatus
};

// src/app/modules/staff/staff.controller.ts
var createStaff2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status12.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await staffService.createStaff(
    user,
    req.body,
    req.file
  );
  sendResponse(res, {
    httpStatusCode: status12.CREATED,
    success: true,
    message: "Staff created successfully",
    data: result
  });
});
var getAllStaff2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status12.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await staffService.getAllStaff(user, req.query);
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Staffs fetched successfully",
    meta: result.meta,
    data: result.data
  });
});
var getSingleStaff2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status12.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await staffService.getSingleStaff(
    user,
    req.params.id
  );
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Staff fetched successfully",
    data: result
  });
});
var updateStaff2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status12.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await staffService.updateStaff(
    user,
    req.params.id,
    req.body,
    req.file
  );
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Staff updated successfully",
    data: result
  });
});
var updateStaffStatus2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status12.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await staffService.updateStaffStatus(
    user,
    req.params.id,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status12.OK,
    success: true,
    message: "Staff status updated successfully",
    data: result
  });
});
var staffController = {
  createStaff: createStaff2,
  getAllStaff: getAllStaff2,
  getSingleStaff: getSingleStaff2,
  updateStaff: updateStaff2,
  updateStaffStatus: updateStaffStatus2
};

// src/app/modules/staff/staff.validation.ts
import z4 from "zod";
var createStaffValidationSchema = z4.object({
  name: z4.string().min(2, "Name must be at least 2 characters").max(60, "Name cannot exceed 60 characters"),
  email: z4.email("Invalid email address"),
  password: z4.string().min(8, "Password must be at least 8 characters").max(128, "Password cannot exceed 128 characters"),
  phone: z4.string().min(11, "Phone number must be at least 11 characters").max(20, "Phone number cannot exceed 20 characters").optional(),
  shopId: z4.string().min(1, "Shop id is required"),
  role: z4.enum([OrgRole.ORG_ADMIN, OrgRole.SHOP_ADMIN, OrgRole.STAFF])
});
var updateStaffValidationSchema = z4.object({
  name: z4.string().min(2, "Name must be at least 2 characters").max(60, "Name cannot exceed 60 characters").optional(),
  phone: z4.string().min(11, "Phone number must be at least 11 characters").max(20, "Phone number cannot exceed 20 characters").optional(),
  shopId: z4.string().min(1, "Shop id is required").optional(),
  role: z4.enum([OrgRole.ORG_ADMIN, OrgRole.SHOP_ADMIN, OrgRole.STAFF]).optional()
});
var updateStaffStatusValidationSchema = z4.object({
  status: z4.enum(["ACTIVE", "INACTIVE", "SUSPENDED"])
});

// src/app/modules/staff/staff.route.ts
var router4 = Router4();
router4.post(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  multerUpload.single("image"),
  validateRequest(createStaffValidationSchema),
  staffController.createStaff
);
router4.get(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  staffController.getAllStaff
);
router4.get(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  staffController.getSingleStaff
);
router4.patch(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  multerUpload.single("image"),
  validateRequest(updateStaffValidationSchema),
  staffController.updateStaff
);
router4.patch(
  "/:id/status",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(updateStaffStatusValidationSchema),
  staffController.updateStaffStatus
);
var staffRoutes = router4;

// src/app/modules/category/category.route.ts
import { Router as Router5 } from "express";

// src/app/modules/category/category.controller.ts
import status14 from "http-status";

// src/app/modules/category/category.service.ts
import status13 from "http-status";

// src/app/modules/category/category.constant.ts
var categorySearchableFields = ["name", "description"];
var categoryFilterableFields = ["status", "name"];
var categorySortableFields = ["createdAt", "name", "status"];

// src/app/modules/category/category.service.ts
var generateSlug3 = (value) => value.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
var generateUniqueCategorySlug = async (organizationId, categoryName) => {
  const baseSlug = generateSlug3(categoryName) || "category";
  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const existingCategory = await prisma.category.findFirst({
      where: {
        organizationId,
        slug
      }
    });
    if (!existingCategory) {
      return slug;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};
var createCategory = async (user, payload) => {
  const existingCategoryByName = await prisma.category.findFirst({
    where: {
      organizationId: user.organizationId,
      name: payload.name,
      isDeleted: false
    }
  });
  if (existingCategoryByName) {
    throw new AppError_default(
      status13.CONFLICT,
      "Category already exists with this name"
    );
  }
  const slug = await generateUniqueCategorySlug(
    user.organizationId,
    payload.name
  );
  const category = await prisma.category.create({
    data: {
      organizationId: user.organizationId,
      name: payload.name,
      slug,
      description: payload.description
    }
  });
  return category;
};
var getAllCategories = async (user, query) => {
  const queryBuilder = new QueryBuilder(prisma.category, query, {
    searchableFields: categorySearchableFields,
    filterableFields: categoryFilterableFields,
    sortableFields: categorySortableFields,
    defaultSortBy: "createdAt",
    defaultSortOrder: "desc",
    defaultLimit: 10,
    maxLimit: 100
  });
  const result = await queryBuilder.search().filter().sort().paginate().where({
    organizationId: user.organizationId,
    isDeleted: false
  }).execute();
  return result;
};
var getSingleCategory = async (user, categoryId) => {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      organizationId: user.organizationId,
      isDeleted: false
    }
  });
  if (!category) {
    throw new AppError_default(status13.NOT_FOUND, "Category not found");
  }
  return category;
};
var updateCategory = async (user, categoryId, payload) => {
  const existingCategory = await prisma.category.findFirst({
    where: {
      id: categoryId,
      organizationId: user.organizationId,
      isDeleted: false
    }
  });
  if (!existingCategory) {
    throw new AppError_default(status13.NOT_FOUND, "Category not found");
  }
  const hasAnyUpdateField = Object.keys(payload).length > 0;
  if (!hasAnyUpdateField) {
    throw new AppError_default(status13.BAD_REQUEST, "No update data provided");
  }
  let slug = existingCategory.slug;
  if (payload.name && payload.name !== existingCategory.name) {
    const duplicateNameCategory = await prisma.category.findFirst({
      where: {
        organizationId: user.organizationId,
        name: payload.name,
        isDeleted: false,
        NOT: {
          id: existingCategory.id
        }
      }
    });
    if (duplicateNameCategory) {
      throw new AppError_default(
        status13.CONFLICT,
        "Category already exists with this name"
      );
    }
    slug = await generateUniqueCategorySlug(user.organizationId, payload.name);
  }
  const updatedCategory = await prisma.category.update({
    where: {
      id: existingCategory.id
    },
    data: {
      ...payload,
      slug
    }
  });
  return updatedCategory;
};
var deleteCategory = async (user, categoryId) => {
  const existingCategory = await prisma.category.findFirst({
    where: {
      id: categoryId,
      organizationId: user.organizationId,
      isDeleted: false
    }
  });
  if (!existingCategory) {
    throw new AppError_default(status13.NOT_FOUND, "Category not found");
  }
  const categoryWithProducts = await prisma.category.findFirst({
    where: {
      id: categoryId,
      organizationId: user.organizationId,
      isDeleted: false
    },
    include: {
      products: {
        where: {
          isDeleted: false
        }
      }
    }
  });
  if (categoryWithProducts && categoryWithProducts.products.length > 0) {
    throw new AppError_default(
      status13.BAD_REQUEST,
      "This category cannot be deleted because products are associated with it"
    );
  }
  const deletedCategory = await prisma.category.update({
    where: {
      id: existingCategory.id
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date(),
      status: CategoryStatus.INACTIVE
    }
  });
  return deletedCategory;
};
var categoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory
};

// src/app/modules/category/category.controller.ts
var createCategory2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status14.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await categoryService.createCategory(user, req.body);
  sendResponse(res, {
    httpStatusCode: status14.CREATED,
    success: true,
    message: "Category created successfully",
    data: result
  });
});
var getAllCategories2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status14.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await categoryService.getAllCategories(user, req.query);
  sendResponse(res, {
    httpStatusCode: status14.OK,
    success: true,
    message: "Categories fetched successfully",
    meta: result.meta,
    data: result.data
  });
});
var getSingleCategory2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status14.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await categoryService.getSingleCategory(
    user,
    req.params.id
  );
  sendResponse(res, {
    httpStatusCode: status14.OK,
    success: true,
    message: "Category fetched successfully",
    data: result
  });
});
var updateCategory2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status14.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await categoryService.updateCategory(
    user,
    req.params.id,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status14.OK,
    success: true,
    message: "Category updated successfully",
    data: result
  });
});
var deleteCategory2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status14.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await categoryService.deleteCategory(
    user,
    req.params.id
  );
  sendResponse(res, {
    httpStatusCode: status14.OK,
    success: true,
    message: "Category deleted successfully",
    data: result
  });
});
var categoryController = {
  createCategory: createCategory2,
  getAllCategories: getAllCategories2,
  getSingleCategory: getSingleCategory2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/app/modules/category/category.validation.ts
import z5 from "zod";
var createCategoryValidationSchema = z5.object({
  name: z5.string().min(2, "Category name must be at least 2 characters").max(100, "Category name cannot exceed 100 characters"),
  description: z5.string().max(255, "Description cannot exceed 255 characters").optional()
});
var updateCategoryValidationSchema = z5.object({
  name: z5.string().min(2, "Category name must be at least 2 characters").max(100, "Category name cannot exceed 100 characters").optional(),
  description: z5.string().max(255, "Description cannot exceed 255 characters").optional()
});

// src/app/modules/category/category.route.ts
var router5 = Router5();
router5.post(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(createCategoryValidationSchema),
  categoryController.createCategory
);
router5.get(
  "/",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF
  ),
  categoryController.getAllCategories
);
router5.get(
  "/",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF
  ),
  categoryController.getAllCategories
);
router5.patch(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(updateCategoryValidationSchema),
  categoryController.updateCategory
);
router5.delete(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  categoryController.deleteCategory
);
var categoryRoutes = router5;

// src/app/modules/product/product.route.ts
import { Router as Router6 } from "express";

// src/app/modules/product/product.controller.ts
import status16 from "http-status";

// src/app/modules/product/product.service.ts
import status15 from "http-status";

// src/app/modules/product/product.constant.ts
var productSearchableFields = ["name", "sku"];
var productFilterableFields = [
  "categoryId",
  "status",
  "sku",
  "price",
  "category.name"
];
var productSortableFields = ["createdAt", "name", "price", "sku"];

// src/app/modules/product/product.service.ts
var generateSlug4 = (value) => value.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
var generateUniqueProductSlug = async (organizationId, productName) => {
  const baseSlug = generateSlug4(productName) || "product";
  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const existingProduct = await prisma.product.findFirst({
      where: { organizationId, slug }
    });
    if (!existingProduct) return slug;
    slug = `${baseSlug}-${counter++}`;
  }
};
var ensureOrg2 = (user) => {
  if (!user.organizationId) {
    throw new AppError_default(status15.BAD_REQUEST, "Organization context is missing");
  }
  return user.organizationId;
};
var createProduct = async (user, payload, file) => {
  const organizationId = ensureOrg2(user);
  const category = await prisma.category.findFirst({
    where: {
      id: payload.categoryId,
      organizationId,
      isDeleted: false
    }
  });
  if (!category) {
    throw new AppError_default(status15.NOT_FOUND, "Category not found");
  }
  const existingSkuProduct = await prisma.product.findFirst({
    where: {
      organizationId,
      sku: payload.sku
    }
  });
  if (existingSkuProduct) {
    throw new AppError_default(status15.CONFLICT, "Product already exists with this SKU");
  }
  const slug = await generateUniqueProductSlug(organizationId, payload.name);
  const imageUrl = file?.path ?? null;
  const product = await prisma.product.create({
    data: {
      organizationId,
      categoryId: payload.categoryId,
      name: payload.name,
      slug,
      sku: payload.sku,
      description: payload.description,
      image: imageUrl,
      price: new prismaNamespace_exports.Decimal(payload.price)
    },
    include: {
      category: true
    }
  });
  return product;
};
var getAllProducts = async (user, query) => {
  const organizationId = ensureOrg2(user);
  const queryBuilder = new QueryBuilder(prisma.product, query, {
    searchableFields: productSearchableFields,
    filterableFields: productFilterableFields,
    sortableFields: productSortableFields,
    defaultSortBy: "createdAt",
    defaultSortOrder: "desc",
    defaultLimit: 10,
    maxLimit: 100
  });
  return await queryBuilder.search().filter().sort().paginate().include({ category: true }).where({
    organizationId,
    isDeleted: false
  }).execute();
};
var getSingleProduct = async (user, productId) => {
  const organizationId = ensureOrg2(user);
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      organizationId,
      isDeleted: false
    },
    include: { category: true }
  });
  if (!product) {
    throw new AppError_default(status15.NOT_FOUND, "Product not found");
  }
  return product;
};
var updateProduct = async (user, productId, payload, file) => {
  const organizationId = ensureOrg2(user);
  const existingProduct = await prisma.product.findFirst({
    where: {
      id: productId,
      organizationId,
      isDeleted: false
    },
    include: { category: true }
  });
  if (!existingProduct) {
    throw new AppError_default(status15.NOT_FOUND, "Product not found");
  }
  if (!Object.keys(payload).length && !file) {
    throw new AppError_default(status15.BAD_REQUEST, "No update data provided");
  }
  if (payload.categoryId) {
    const category = await prisma.category.findFirst({
      where: {
        id: payload.categoryId,
        organizationId,
        isDeleted: false
      }
    });
    if (!category) {
      throw new AppError_default(status15.NOT_FOUND, "Category not found");
    }
  }
  if (payload.sku && payload.sku !== existingProduct.sku) {
    const duplicate = await prisma.product.findFirst({
      where: {
        organizationId,
        sku: payload.sku,
        NOT: { id: existingProduct.id }
      }
    });
    if (duplicate) {
      throw new AppError_default(
        status15.CONFLICT,
        "Product already exists with this SKU"
      );
    }
  }
  let slug = existingProduct.slug;
  if (payload.name && payload.name !== existingProduct.name) {
    slug = await generateUniqueProductSlug(organizationId, payload.name);
  }
  const newImageUrl = file?.path ?? existingProduct.image ?? void 0;
  const updatedProduct = await prisma.product.update({
    where: { id: existingProduct.id },
    data: {
      ...payload,
      slug,
      image: newImageUrl,
      ...payload.price !== void 0 && {
        price: new prismaNamespace_exports.Decimal(payload.price)
      }
    },
    include: { category: true }
  });
  if (file?.path && existingProduct.image && existingProduct.image !== file.path) {
    await deleteFileFromCloudinary(existingProduct.image);
  }
  return updatedProduct;
};
var updateProductStatus = async (user, productId, payload) => {
  const organizationId = ensureOrg2(user);
  const existingProduct = await prisma.product.findFirst({
    where: {
      id: productId,
      organizationId,
      isDeleted: false
    }
  });
  if (!existingProduct) {
    throw new AppError_default(status15.NOT_FOUND, "Product not found");
  }
  return await prisma.product.update({
    where: { id: existingProduct.id },
    data: {
      status: payload.status
    },
    include: { category: true }
  });
};
var deleteProduct = async (user, productId) => {
  if (!user.organizationId) {
    throw new AppError_default(status15.BAD_REQUEST, "Organization context is missing");
  }
  const organizationId = user.organizationId;
  const existingProduct = await prisma.product.findFirst({
    where: {
      id: productId,
      organizationId,
      isDeleted: false
    }
  });
  if (!existingProduct) {
    throw new AppError_default(status15.NOT_FOUND, "Product not found");
  }
  const deletedProduct = await prisma.product.update({
    where: {
      id: existingProduct.id
    },
    data: {
      isDeleted: true
    }
  });
  if (existingProduct.image) {
    await deleteFileFromCloudinary(existingProduct.image);
  }
  return deletedProduct;
};
var productService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  updateProductStatus,
  deleteProduct
};

// src/app/modules/product/product.controller.ts
var createProduct2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status16.UNAUTHORIZED, "Unauthorized access");
  }
  console.log("controller req.file =>", req.file);
  console.log("content-type =>", req.headers);
  const result = await productService.createProduct(
    user,
    req.body,
    req.file
  );
  sendResponse(res, {
    httpStatusCode: status16.CREATED,
    success: true,
    message: "Product created successfully",
    data: result
  });
});
var getAllProducts2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status16.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await productService.getAllProducts(user, req.query);
  sendResponse(res, {
    httpStatusCode: status16.OK,
    success: true,
    message: "Products fetched successfully",
    data: result.data,
    meta: result.meta
  });
});
var getSingleProduct2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status16.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await productService.getSingleProduct(
    user,
    req.params.id
  );
  sendResponse(res, {
    httpStatusCode: status16.OK,
    success: true,
    message: "Product fetched successfully",
    data: result
  });
});
var updateProduct2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status16.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await productService.updateProduct(
    user,
    req.params.id,
    req.body,
    req.file
  );
  sendResponse(res, {
    httpStatusCode: status16.OK,
    success: true,
    message: "Product updated successfully",
    data: result
  });
});
var updateProductStatus2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status16.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await productService.updateProductStatus(
    user,
    req.params.id,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status16.OK,
    success: true,
    message: "Product status updated successfully",
    data: result
  });
});
var deleteProduct2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status16.UNAUTHORIZED, "Unauthorized access");
  }
  const { id } = req.params;
  const result = await productService.deleteProduct(user, id);
  sendResponse(res, {
    httpStatusCode: status16.OK,
    success: true,
    message: "Product deleted successfully",
    data: result
  });
});
var productController = {
  createProduct: createProduct2,
  getAllProducts: getAllProducts2,
  getSingleProduct: getSingleProduct2,
  updateProduct: updateProduct2,
  updateProductStatus: updateProductStatus2,
  deleteProduct: deleteProduct2
};

// src/app/modules/product/product.validation.ts
import z6 from "zod";
var createProductValidationSchema = z6.object({
  name: z6.string().min(2, "Product name must be at least 2 characters").max(120, "Product name cannot exceed 120 characters"),
  categoryId: z6.string().min(1, "Category id is required"),
  sku: z6.string().min(2, "SKU must be at least 2 characters").max(50, "SKU cannot exceed 50 characters"),
  description: z6.string().max(500, "Description cannot exceed 500 characters").optional(),
  price: z6.number({ error: "Price must be a number" }).positive("Price must be greater than 0")
});
var updateProductValidationSchema = z6.object({
  name: z6.string().min(2, "Product name must be at least 2 characters").max(120, "Product name cannot exceed 120 characters").optional(),
  categoryId: z6.string().min(1, "Category id is required").optional(),
  sku: z6.string().min(2, "SKU must be at least 2 characters").max(50, "SKU cannot exceed 50 characters").optional(),
  description: z6.string().max(500, "Description cannot exceed 500 characters").optional(),
  image: z6.url("Image must be a valid URL").optional(),
  price: z6.number({ error: "Price must be a number" }).positive("Price must be greater than 0").optional()
});
var updateProductStatusValidationSchema = z6.object({
  status: z6.enum([
    ProductStatus.ACTIVE,
    ProductStatus.INACTIVE,
    ProductStatus.OUT_OF_STOCK
  ])
});

// src/app/modules/product/product.route.ts
var router6 = Router6();
router6.post(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  multerUpload.single("image"),
  validateRequest(createProductValidationSchema),
  productController.createProduct
);
router6.get(
  "/",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF
  ),
  productController.getAllProducts
);
router6.get(
  "/:id",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF
  ),
  productController.getSingleProduct
);
router6.patch(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  multerUpload.single("image"),
  validateRequest(updateProductValidationSchema),
  productController.updateProduct
);
router6.patch(
  "/:id/status",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(updateProductStatusValidationSchema),
  productController.updateProductStatus
);
router6.delete(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, OrgRole.SHOP_ADMIN),
  productController.deleteProduct
);
var productRoutes = router6;

// src/app/modules/storage/storage.route.ts
import { Router as Router7 } from "express";

// src/app/modules/storage/storage.controller.ts
import status18 from "http-status";

// src/app/modules/storage/storage.service.ts
import status17 from "http-status";

// src/app/modules/storage/storage.constant.ts
var storageSearchableFields = ["name", "description", "shop.name"];
var storageFilterableFields = ["shopId", "status"];
var storageSortableFields = ["createdAt", "name", "status"];

// src/app/modules/storage/storage.service.ts
var ensureOrg3 = (user) => {
  if (!user.organizationId) {
    throw new AppError_default(status17.BAD_REQUEST, "Organization context is missing");
  }
  return user.organizationId;
};
var createStorage = async (user, payload) => {
  const shop = await prisma.shop.findFirst({
    where: {
      id: payload.shopId,
      organizationId: ensureOrg3(user),
      isDeleted: false
    }
  });
  if (!shop) {
    throw new AppError_default(status17.NOT_FOUND, "Shop not found");
  }
  const existingStorage = await prisma.storage.findFirst({
    where: {
      shopId: payload.shopId,
      name: payload.name,
      isDeleted: false
    }
  });
  if (existingStorage) {
    throw new AppError_default(
      status17.CONFLICT,
      "Storage already exists with this name in this shop"
    );
  }
  const storage2 = await prisma.storage.create({
    data: {
      organizationId: ensureOrg3(user),
      shopId: payload.shopId,
      name: payload.name,
      description: payload.description
    },
    include: {
      shop: true
    }
  });
  return storage2;
};
var getAllStorages = async (user, query) => {
  const queryBuilder = new QueryBuilder(prisma.storage, query, {
    searchableFields: storageSearchableFields,
    filterableFields: storageFilterableFields,
    sortableFields: storageSortableFields,
    defaultSortBy: "createdAt",
    defaultSortOrder: "desc",
    defaultLimit: 10,
    maxLimit: 100
  });
  const result = await queryBuilder.search().filter().sort().paginate().include({
    shop: true
  }).where({
    organizationId: user.organizationId,
    isDeleted: false
  }).execute();
  return result;
};
var getSingleStorage = async (user, storageId) => {
  const storage2 = await prisma.storage.findFirst({
    where: {
      id: storageId,
      organizationId: ensureOrg3(user),
      isDeleted: false
    },
    include: {
      shop: true
    }
  });
  if (!storage2) {
    throw new AppError_default(status17.NOT_FOUND, "Storage not found");
  }
  return storage2;
};
var updateStorage = async (user, storageId, payload) => {
  const existingStorage = await prisma.storage.findFirst({
    where: {
      id: storageId,
      organizationId: ensureOrg3(user),
      isDeleted: false
    }
  });
  if (!existingStorage) {
    throw new AppError_default(status17.NOT_FOUND, "Storage not found");
  }
  const hasAnyUpdateField = Object.keys(payload).length > 0;
  if (!hasAnyUpdateField) {
    throw new AppError_default(status17.BAD_REQUEST, "No update data provided");
  }
  let finalShopId = existingStorage.shopId;
  if (payload.shopId && payload.shopId !== existingStorage.shopId) {
    const shop = await prisma.shop.findFirst({
      where: {
        id: payload.shopId,
        organizationId: ensureOrg3(user),
        isDeleted: false
      }
    });
    if (!shop) {
      throw new AppError_default(status17.NOT_FOUND, "Shop not found");
    }
    finalShopId = payload.shopId;
  }
  if (payload.name && payload.name !== existingStorage.name || finalShopId !== existingStorage.shopId) {
    const duplicateStorage = await prisma.storage.findFirst({
      where: {
        shopId: finalShopId,
        name: payload.name ?? existingStorage.name,
        isDeleted: false,
        NOT: {
          id: existingStorage.id
        }
      }
    });
    if (duplicateStorage) {
      throw new AppError_default(
        status17.CONFLICT,
        "Storage already exists with this name in this shop"
      );
    }
  }
  const updatedStorage = await prisma.storage.update({
    where: {
      id: existingStorage.id
    },
    data: {
      shopId: finalShopId,
      name: payload.name,
      description: payload.description
    },
    include: {
      shop: true
    }
  });
  return updatedStorage;
};
var updateStorageStatus = async (user, storageId, payload) => {
  const existingStorage = await prisma.storage.findFirst({
    where: {
      id: storageId,
      organizationId: ensureOrg3(user),
      isDeleted: false
    }
  });
  if (!existingStorage) {
    throw new AppError_default(status17.NOT_FOUND, "Storage not found");
  }
  const updatedStorage = await prisma.storage.update({
    where: {
      id: existingStorage.id
    },
    data: {
      status: payload.status
    },
    include: {
      shop: true
    }
  });
  return updatedStorage;
};
var deleteStorage = async (user, storageId) => {
  if (!user.organizationId) {
    throw new AppError_default(status17.BAD_REQUEST, "Organization context is missing");
  }
  const organizationId = user.organizationId;
  const existingStorage = await prisma.storage.findFirst({
    where: {
      id: storageId,
      organizationId,
      isDeleted: false
    }
  });
  if (!existingStorage) {
    throw new AppError_default(status17.NOT_FOUND, "Storage not found");
  }
  const relatedInventoryExists = await prisma.inventory.findFirst({
    where: {
      storageId: existingStorage.id,
      organizationId
    },
    select: {
      id: true
    }
  });
  if (relatedInventoryExists) {
    throw new AppError_default(
      status17.BAD_REQUEST,
      "Cannot delete storage because inventory exists in this storage"
    );
  }
  const relatedInventoryTxnExists = await prisma.inventoryTransaction.findFirst(
    {
      where: {
        storageId: existingStorage.id,
        organizationId
      },
      select: {
        id: true
      }
    }
  );
  if (relatedInventoryTxnExists) {
    throw new AppError_default(
      status17.BAD_REQUEST,
      "Cannot delete storage because inventory transactions exist for this storage"
    );
  }
  const relatedSaleReturnExists = await prisma.saleReturn.findFirst({
    where: {
      storageId: existingStorage.id,
      organizationId
    },
    select: {
      id: true
    }
  });
  if (relatedSaleReturnExists) {
    throw new AppError_default(
      status17.BAD_REQUEST,
      "Cannot delete storage because sale returns exist for this storage"
    );
  }
  const deletedStorage = await prisma.storage.update({
    where: {
      id: existingStorage.id
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    },
    include: {
      shop: true
    }
  });
  return deletedStorage;
};
var storageService = {
  createStorage,
  getAllStorages,
  getSingleStorage,
  updateStorage,
  updateStorageStatus,
  deleteStorage
};

// src/app/modules/storage/storage.controller.ts
var createStorage2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status18.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await storageService.createStorage(user, req.body);
  sendResponse(res, {
    httpStatusCode: status18.CREATED,
    success: true,
    message: "Storage created successfully",
    data: result
  });
});
var getAllStorages2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status18.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await storageService.getAllStorages(user, req.query);
  sendResponse(res, {
    httpStatusCode: status18.OK,
    success: true,
    message: "Storages fetched successfully",
    meta: result.meta,
    data: result.data
  });
});
var getSingleStorage2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status18.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await storageService.getSingleStorage(
    user,
    req.params.id
  );
  sendResponse(res, {
    httpStatusCode: status18.OK,
    success: true,
    message: "Storage fetched successfully",
    data: result
  });
});
var updateStorage2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status18.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await storageService.updateStorage(
    user,
    req.params.id,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status18.OK,
    success: true,
    message: "Storage updated successfully",
    data: result
  });
});
var updateStorageStatus2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status18.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await storageService.updateStorageStatus(
    user,
    req.params.id,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status18.OK,
    success: true,
    message: "Storage status updated successfully",
    data: result
  });
});
var deleteStorage2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status18.UNAUTHORIZED, "Unauthorized access");
  }
  const { id } = req.params;
  const result = await storageService.deleteStorage(user, id);
  sendResponse(res, {
    httpStatusCode: status18.OK,
    success: true,
    message: "Storage deleted successfully",
    data: result
  });
});
var storageController = {
  createStorage: createStorage2,
  getAllStorages: getAllStorages2,
  getSingleStorage: getSingleStorage2,
  updateStorage: updateStorage2,
  updateStorageStatus: updateStorageStatus2,
  deleteStorage: deleteStorage2
};

// src/app/modules/storage/storage.validation.ts
import z7 from "zod";
var createStorageValidationSchema = z7.object({
  shopId: z7.string().min(1, "Shop id is required"),
  name: z7.string().min(2, "Storage name must be at least 2 characters").max(100, "Storage name cannot exceed 100 characters"),
  description: z7.string().max(255, "Description cannot exceed 255 characters").optional()
});
var updateStorageValidationSchema = z7.object({
  shopId: z7.string().min(1, "Shop id is required").optional(),
  name: z7.string().min(2, "Storage name must be at least 2 characters").max(100, "Storage name cannot exceed 100 characters").optional(),
  description: z7.string().max(255, "Description cannot exceed 255 characters").optional()
});
var updateStorageStatusValidationSchema = z7.object({
  status: z7.enum([StorageStatus.ACTIVE, StorageStatus.INACTIVE])
});

// src/app/modules/storage/storage.route.ts
var router7 = Router7();
router7.post(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(createStorageValidationSchema),
  storageController.createStorage
);
router7.get(
  "/",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF
  ),
  storageController.getAllStorages
);
router7.get(
  "/:id",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF
  ),
  storageController.getSingleStorage
);
router7.patch(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(updateStorageValidationSchema),
  storageController.updateStorage
);
router7.patch(
  "/:id/status",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(updateStorageStatusValidationSchema),
  storageController.updateStorageStatus
);
router7.delete(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, OrgRole.SHOP_ADMIN),
  storageController.deleteStorage
);
var storageRoutes = router7;

// src/app/modules/inventory/inventory.route.ts
import { Router as Router8 } from "express";

// src/app/modules/inventory/inventory.controller.ts
import status20 from "http-status";

// src/app/modules/inventory/inventory.service.ts
import status19 from "http-status";

// src/app/modules/inventory/inventory.constant.ts
var inventorySearchableFields = [
  "product.name",
  "product.sku",
  "shop.name",
  "storage.name"
];
var inventoryFilterableFields = ["shopId", "storageId", "productId"];
var inventorySortableFields = [
  "createdAt",
  "updatedAt",
  "quantity",
  "lowStockThreshold"
];
var inventoryTransactionSearchableFields = [
  "product.name",
  "product.sku",
  "shop.name",
  "storage.name",
  "createdBy.name"
];
var inventoryTransactionFilterableFields = [
  "shopId",
  "storageId",
  "productId",
  "type",
  "createdById"
];
var inventoryTransactionSortableFields = [
  "createdAt",
  "quantity",
  "type"
];

// src/app/modules/inventory/inventory.service.ts
var ensureOrg4 = (user) => {
  if (!user.organizationId) {
    throw new AppError_default(status19.BAD_REQUEST, "Organization context is missing");
  }
  return user.organizationId;
};
var validateInventoryReferences = async (organizationId, shopId, storageId, productId) => {
  const [shop, storage2, product] = await Promise.all([
    prisma.shop.findFirst({
      where: {
        id: shopId,
        organizationId,
        isDeleted: false
      }
    }),
    prisma.storage.findFirst({
      where: {
        id: storageId,
        organizationId,
        isDeleted: false
      }
    }),
    prisma.product.findFirst({
      where: {
        id: productId,
        organizationId,
        isDeleted: false
      }
    })
  ]);
  if (!shop) {
    throw new AppError_default(status19.NOT_FOUND, "Shop not found");
  }
  if (!storage2) {
    throw new AppError_default(status19.NOT_FOUND, "Storage not found");
  }
  if (!product) {
    throw new AppError_default(status19.NOT_FOUND, "Product not found");
  }
  if (storage2.shopId !== shopId) {
    throw new AppError_default(
      status19.BAD_REQUEST,
      "Selected storage does not belong to the selected shop"
    );
  }
  return { shop, storage: storage2, product };
};
var stockIn = async (user, payload) => {
  const { shopId, storageId, productId, quantity, lowStockThreshold, note } = payload;
  await validateInventoryReferences(
    ensureOrg4(user),
    shopId,
    storageId,
    productId
  );
  const result = await prisma.$transaction(
    async (tx) => {
      const existingInventory = await tx.inventory.findFirst({
        where: {
          organizationId: ensureOrg4(user),
          shopId,
          storageId,
          productId
        }
      });
      let inventory;
      if (existingInventory) {
        inventory = await tx.inventory.update({
          where: {
            id: existingInventory.id
          },
          data: {
            quantity: {
              increment: quantity
            },
            ...lowStockThreshold !== void 0 && { lowStockThreshold }
          }
        });
      } else {
        inventory = await tx.inventory.create({
          data: {
            organizationId: ensureOrg4(user),
            shopId,
            storageId,
            productId,
            quantity,
            lowStockThreshold: lowStockThreshold ?? 5
          }
        });
      }
      await tx.inventoryTransaction.create({
        data: {
          organizationId: ensureOrg4(user),
          shopId,
          storageId,
          productId,
          createdById: user.userId,
          type: InventoryTransactionType.STOCK_IN,
          quantity,
          note
        }
      });
      return inventory;
    }
  );
  return result;
};
var stockOut = async (user, payload) => {
  const { shopId, storageId, productId, quantity, note } = payload;
  await validateInventoryReferences(
    ensureOrg4(user),
    shopId,
    storageId,
    productId
  );
  const result = await prisma.$transaction(
    async (tx) => {
      const existingInventory = await tx.inventory.findFirst({
        where: {
          organizationId: ensureOrg4(user),
          shopId,
          storageId,
          productId
        }
      });
      if (!existingInventory) {
        throw new AppError_default(status19.NOT_FOUND, "Inventory not found");
      }
      if (existingInventory.quantity < quantity) {
        throw new AppError_default(
          status19.BAD_REQUEST,
          "Insufficient stock quantity for stock out"
        );
      }
      const inventory = await tx.inventory.update({
        where: {
          id: existingInventory.id
        },
        data: {
          quantity: {
            decrement: quantity
          }
        }
      });
      await tx.inventoryTransaction.create({
        data: {
          organizationId: ensureOrg4(user),
          shopId,
          storageId,
          productId,
          createdById: user.userId,
          type: InventoryTransactionType.STOCK_OUT,
          quantity,
          note
        }
      });
      return inventory;
    }
  );
  return result;
};
var getAllInventory = async (user, query) => {
  const queryBuilder = new QueryBuilder(prisma.inventory, query, {
    searchableFields: inventorySearchableFields,
    filterableFields: inventoryFilterableFields,
    sortableFields: inventorySortableFields,
    defaultSortBy: "updatedAt",
    defaultSortOrder: "desc",
    defaultLimit: 10,
    maxLimit: 100
  });
  const result = await queryBuilder.search().filter().sort().paginate().include({
    shop: true,
    storage: true,
    product: {
      include: {
        category: true
      }
    }
  }).where({
    organizationId: user.organizationId
  }).execute();
  return result;
};
var getSingleInventory = async (user, inventoryId) => {
  const inventory = await prisma.inventory.findFirst({
    where: {
      id: inventoryId,
      organizationId: ensureOrg4(user)
    },
    include: {
      shop: true,
      storage: true,
      product: {
        include: {
          category: true
        }
      }
    }
  });
  if (!inventory) {
    throw new AppError_default(status19.NOT_FOUND, "Inventory not found");
  }
  return inventory;
};
var getInventoryTransactions = async (user, query) => {
  const queryBuilder = new QueryBuilder(prisma.inventoryTransaction, query, {
    searchableFields: inventoryTransactionSearchableFields,
    filterableFields: inventoryTransactionFilterableFields,
    sortableFields: inventoryTransactionSortableFields,
    defaultSortBy: "createdAt",
    defaultSortOrder: "desc",
    defaultLimit: 10,
    maxLimit: 100
  });
  const result = await queryBuilder.search().filter().sort().paginate().include({
    shop: true,
    storage: true,
    product: {
      include: {
        category: true
      }
    },
    createdBy: true
  }).where({
    organizationId: user.organizationId
  }).execute();
  return result;
};
var inventoryService = {
  stockIn,
  stockOut,
  getAllInventory,
  getSingleInventory,
  getInventoryTransactions
};

// src/app/modules/inventory/inventory.controller.ts
var stockIn2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status20.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await inventoryService.stockIn(user, req.body);
  sendResponse(res, {
    httpStatusCode: status20.OK,
    success: true,
    message: "Stock added successfully",
    data: result
  });
});
var stockOut2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status20.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await inventoryService.stockOut(user, req.body);
  sendResponse(res, {
    httpStatusCode: status20.OK,
    success: true,
    message: "Stock removed successfully",
    data: result
  });
});
var getAllInventory2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status20.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await inventoryService.getAllInventory(user, req.query);
  sendResponse(res, {
    httpStatusCode: status20.OK,
    success: true,
    message: "Inventories fetched successfully",
    meta: result.meta,
    data: result.data
  });
});
var getSingleInventory2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status20.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await inventoryService.getSingleInventory(
    user,
    req.params.id
  );
  sendResponse(res, {
    httpStatusCode: status20.OK,
    success: true,
    message: "Inventory fetched successfully",
    data: result
  });
});
var getInventoryTransactions2 = catchAsync(
  async (req, res) => {
    const user = req.user;
    if (!user) {
      throw new AppError_default(status20.UNAUTHORIZED, "Unauthorized access");
    }
    const result = await inventoryService.getInventoryTransactions(
      user,
      req.query
    );
    sendResponse(res, {
      httpStatusCode: status20.OK,
      success: true,
      message: "Inventory transactions fetched successfully",
      meta: result.meta,
      data: result.data
    });
  }
);
var inventoryController = {
  stockIn: stockIn2,
  stockOut: stockOut2,
  getAllInventory: getAllInventory2,
  getSingleInventory: getSingleInventory2,
  getInventoryTransactions: getInventoryTransactions2
};

// src/app/modules/inventory/inventory.validation.ts
import z8 from "zod";
var stockInValidationSchema = z8.object({
  shopId: z8.string().min(1, "Shop id is required"),
  storageId: z8.string().min(1, "Storage id is required"),
  productId: z8.string().min(1, "Product id is required"),
  quantity: z8.number({ error: "Quantity must be a number" }).int("Quantity must be an integer").positive("Quantity must be greater than 0"),
  lowStockThreshold: z8.number({ error: "Low stock threshold must be a number" }).int("Low stock threshold must be an integer").nonnegative("Low stock threshold cannot be negative").optional(),
  note: z8.string().max(255, "Note cannot exceed 255 characters").optional()
});
var stockOutValidationSchema = z8.object({
  shopId: z8.string().min(1, "Shop id is required"),
  storageId: z8.string().min(1, "Storage id is required"),
  productId: z8.string().min(1, "Product id is required"),
  quantity: z8.number({ error: "Quantity must be a number" }).int("Quantity must be an integer").positive("Quantity must be greater than 0"),
  note: z8.string().max(255, "Note cannot exceed 255 characters").optional()
});

// src/app/modules/inventory/inventory.route.ts
var router8 = Router8();
router8.post(
  "/stock-in",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(stockInValidationSchema),
  inventoryController.stockIn
);
router8.post(
  "/stock-out",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(stockOutValidationSchema),
  inventoryController.stockOut
);
router8.get(
  "/transactions",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  inventoryController.getInventoryTransactions
);
router8.get(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  inventoryController.getSingleInventory
);
router8.get(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, OrgRole.STAFF),
  inventoryController.getAllInventory
);
var inventoryRoutes = router8;

// src/app/modules/sale/sale.route.ts
import { Router as Router9 } from "express";

// src/app/modules/sale/sale.controller.ts
import status22 from "http-status";

// src/app/modules/sale/sale.service.ts
import status21 from "http-status";

// src/app/modules/sale/sale.constant.ts
var saleSearchableFields = [
  "invoiceNo",
  "shop.name",
  "createdBy.name"
];
var saleFilterableFields = [
  "shopId",
  "paymentMethod",
  "status",
  "createdById"
];
var saleSortableFields = [
  "createdAt",
  "subtotal",
  "discount",
  "total",
  "invoiceNo"
];

// src/app/modules/sale/sale.service.ts
var generateInvoiceNo = async (organizationId) => {
  const count = await prisma.sale.count({
    where: {
      organizationId
    }
  });
  const nextNumber = count + 1;
  return `INV-${nextNumber.toString().padStart(6, "0")}`;
};
var validateSaleReferences = async (organizationId, shopId, storageId) => {
  const [shop, storage2] = await Promise.all([
    prisma.shop.findFirst({
      where: {
        id: shopId,
        organizationId,
        isDeleted: false
      }
    }),
    prisma.storage.findFirst({
      where: {
        id: storageId,
        organizationId,
        isDeleted: false
      }
    })
  ]);
  if (!shop) {
    throw new AppError_default(status21.NOT_FOUND, "Shop not found");
  }
  if (!storage2) {
    throw new AppError_default(status21.NOT_FOUND, "Storage not found");
  }
  if (storage2.shopId !== shopId) {
    throw new AppError_default(
      status21.BAD_REQUEST,
      "Selected storage does not belong to the selected shop"
    );
  }
  return { shop, storage: storage2 };
};
var createSale = async (user, payload) => {
  const {
    shopId,
    storageId,
    paymentMethod,
    discount = 0,
    note,
    paidAmount = 0,
    items
  } = payload;
  if (!user.organizationId) {
    throw new AppError_default(status21.BAD_REQUEST, "Organization context is missing");
  }
  await validateSaleReferences(user.organizationId, shopId, storageId);
  const invoiceNo = await generateInvoiceNo(user.organizationId);
  const productIds = items.map((item) => item.productId);
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds
      },
      organizationId: user.organizationId,
      isDeleted: false
    }
  });
  if (products.length !== productIds.length) {
    throw new AppError_default(
      status21.NOT_FOUND,
      "One or more selected products were not found"
    );
  }
  const productMap = new Map(products.map((product) => [product.id, product]));
  const inventoryRows = await prisma.inventory.findMany({
    where: {
      organizationId: user.organizationId,
      shopId,
      storageId,
      productId: {
        in: productIds
      }
    }
  });
  const inventoryMap = new Map(
    inventoryRows.map((inventory) => [inventory.productId, inventory])
  );
  let subtotal = 0;
  const preparedItems = items.map((item) => {
    const product = productMap.get(item.productId);
    const inventory = inventoryMap.get(item.productId);
    if (!product) {
      throw new AppError_default(status21.NOT_FOUND, "Product not found");
    }
    if (!inventory) {
      throw new AppError_default(
        status21.BAD_REQUEST,
        `No inventory found for product: ${product.name}`
      );
    }
    if (inventory.quantity < item.quantity) {
      throw new AppError_default(
        status21.BAD_REQUEST,
        `Insufficient stock for product: ${product.name}`
      );
    }
    const unitPrice = Number(product.price);
    const totalPrice = unitPrice * item.quantity;
    subtotal += totalPrice;
    return {
      productId: item.productId,
      quantity: item.quantity,
      unitPrice,
      totalPrice
    };
  });
  const total = subtotal - discount;
  if (total < 0) {
    throw new AppError_default(status21.BAD_REQUEST, "Discount cannot exceed subtotal");
  }
  if (paidAmount < 0) {
    throw new AppError_default(status21.BAD_REQUEST, "Paid amount cannot be negative");
  }
  if (paidAmount > total) {
    throw new AppError_default(
      status21.BAD_REQUEST,
      "Paid amount cannot exceed total amount"
    );
  }
  const dueAmount = total - paidAmount;
  let paymentStatus = SalePaymentStatus.PAID;
  if (paidAmount === 0) {
    paymentStatus = SalePaymentStatus.UNPAID;
  } else if (dueAmount > 0) {
    paymentStatus = SalePaymentStatus.PARTIAL;
  }
  const sale = await prisma.$transaction(
    async (tx) => {
      const createdSale = await tx.sale.create({
        data: {
          organizationId: user.organizationId,
          shopId,
          createdById: user.userId,
          invoiceNo,
          subtotal: new prismaNamespace_exports.Decimal(subtotal),
          discount: new prismaNamespace_exports.Decimal(discount),
          total: new prismaNamespace_exports.Decimal(total),
          paymentMethod,
          paymentStatus,
          paidAmount: new prismaNamespace_exports.Decimal(paidAmount),
          dueAmount: new prismaNamespace_exports.Decimal(dueAmount),
          note
        }
      });
      for (const item of preparedItems) {
        await tx.saleItem.create({
          data: {
            saleId: createdSale.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: new prismaNamespace_exports.Decimal(item.unitPrice),
            totalPrice: new prismaNamespace_exports.Decimal(item.totalPrice)
          }
        });
        const inventory = inventoryMap.get(item.productId);
        if (!inventory) {
          throw new AppError_default(status21.BAD_REQUEST, "Inventory not found");
        }
        await tx.inventory.update({
          where: {
            id: inventory.id
          },
          data: {
            quantity: {
              decrement: item.quantity
            }
          }
        });
        await tx.inventoryTransaction.create({
          data: {
            organizationId: user.organizationId,
            shopId,
            storageId,
            productId: item.productId,
            createdById: user.userId,
            type: InventoryTransactionType.SALE,
            quantity: item.quantity,
            note: `Sale invoice: ${invoiceNo}`,
            saleId: createdSale.id
          }
        });
      }
      if (paidAmount > 0) {
        await tx.salePayment.create({
          data: {
            saleId: createdSale.id,
            receivedById: user.userId,
            amount: new prismaNamespace_exports.Decimal(paidAmount),
            paymentMethod,
            note: "Initial payment collected during sale creation"
          }
        });
      }
      return createdSale;
    }
  );
  const saleWithDetails = await prisma.sale.findUnique({
    where: {
      id: sale.id
    },
    include: {
      shop: true,
      createdBy: true,
      items: {
        include: {
          product: {
            include: {
              category: true
            }
          }
        }
      },
      payments: {
        include: {
          receivedBy: true
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });
  return saleWithDetails;
};
var addSalePayment = async (user, saleId, payload) => {
  const { amount, paymentMethod, note } = payload;
  if (!user.organizationId) {
    throw new AppError_default(status21.BAD_REQUEST, "Organization context is missing");
  }
  const sale = await prisma.sale.findFirst({
    where: {
      id: saleId,
      organizationId: user.organizationId
    }
  });
  if (!sale) {
    throw new AppError_default(status21.NOT_FOUND, "Sale not found");
  }
  const currentDue = Number(sale.dueAmount);
  if (currentDue <= 0) {
    throw new AppError_default(status21.BAD_REQUEST, "This sale has no due amount");
  }
  if (amount > currentDue) {
    throw new AppError_default(
      status21.BAD_REQUEST,
      "Payment amount cannot exceed due amount"
    );
  }
  if (sale.status === SaleStatus.CANCELLED) {
    throw new AppError_default(
      status21.BAD_REQUEST,
      "Cannot collect payment for a cancelled sale"
    );
  }
  const updatedPaidAmount = Number(sale.paidAmount) + amount;
  const updatedDueAmount = Number(sale.total) - updatedPaidAmount;
  const updatedPaymentStatus = updatedDueAmount <= 0 ? SalePaymentStatus.PAID : updatedPaidAmount > 0 ? SalePaymentStatus.PARTIAL : SalePaymentStatus.UNPAID;
  const result = await prisma.$transaction(
    async (tx) => {
      await tx.salePayment.create({
        data: {
          saleId: sale.id,
          receivedById: user.userId,
          amount: new prismaNamespace_exports.Decimal(amount),
          paymentMethod,
          note
        }
      });
      const updatedSale = await tx.sale.update({
        where: {
          id: sale.id
        },
        data: {
          paidAmount: new prismaNamespace_exports.Decimal(updatedPaidAmount),
          dueAmount: new prismaNamespace_exports.Decimal(updatedDueAmount),
          paymentStatus: updatedPaymentStatus
        },
        include: {
          shop: true,
          createdBy: true,
          items: {
            include: {
              product: true
            }
          },
          payments: {
            include: {
              receivedBy: true
            },
            orderBy: {
              createdAt: "desc"
            }
          }
        }
      });
      return updatedSale;
    }
  );
  return result;
};
var getSalePayments = async (user, saleId) => {
  if (!user.organizationId) {
    throw new AppError_default(status21.BAD_REQUEST, "Organization context is missing");
  }
  const sale = await prisma.sale.findFirst({
    where: {
      id: saleId,
      organizationId: user.organizationId
    },
    select: {
      id: true,
      invoiceNo: true,
      total: true,
      paidAmount: true,
      dueAmount: true,
      paymentStatus: true
    }
  });
  if (!sale) {
    throw new AppError_default(status21.NOT_FOUND, "Sale not found");
  }
  const payments = await prisma.salePayment.findMany({
    where: {
      saleId
    },
    include: {
      receivedBy: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return {
    sale,
    payments
  };
};
var createSaleReturn = async (user, saleId, payload) => {
  const { storageId, note, items } = payload;
  if (!user.organizationId) {
    throw new AppError_default(status21.BAD_REQUEST, "Organization context is missing");
  }
  const sale = await prisma.sale.findFirst({
    where: {
      id: saleId,
      organizationId: user.organizationId
    },
    include: {
      items: true,
      returns: {
        include: {
          items: true
        }
      }
    }
  });
  if (!sale) {
    throw new AppError_default(status21.NOT_FOUND, "Sale not found");
  }
  if (sale.status === SaleStatus.CANCELLED) {
    throw new AppError_default(
      status21.BAD_REQUEST,
      "Cannot create return for a cancelled sale"
    );
  }
  const storage2 = await prisma.storage.findFirst({
    where: {
      id: storageId,
      organizationId: user.organizationId,
      shopId: sale.shopId,
      isDeleted: false
    }
  });
  if (!storage2) {
    throw new AppError_default(
      status21.NOT_FOUND,
      "Storage not found for this sale shop"
    );
  }
  const saleItemMap = new Map(sale.items.map((item) => [item.id, item]));
  const existingReturnQuantityMap = /* @__PURE__ */ new Map();
  sale.returns.forEach((saleReturn) => {
    saleReturn.items.forEach((item) => {
      existingReturnQuantityMap.set(
        item.saleItemId,
        (existingReturnQuantityMap.get(item.saleItemId) || 0) + item.quantity
      );
    });
  });
  let refundAmount = 0;
  const preparedItems = items.map((item) => {
    const saleItem = saleItemMap.get(item.saleItemId);
    if (!saleItem) {
      throw new AppError_default(status21.BAD_REQUEST, "Invalid sale item selected");
    }
    const alreadyReturned = existingReturnQuantityMap.get(item.saleItemId) || 0;
    const remainingQuantity = saleItem.quantity - alreadyReturned;
    if (item.quantity > remainingQuantity) {
      throw new AppError_default(
        status21.BAD_REQUEST,
        `Return quantity cannot exceed remaining quantity for sale item ${item.saleItemId}`
      );
    }
    const unitPrice = Number(saleItem.unitPrice);
    const totalPrice = unitPrice * item.quantity;
    refundAmount += totalPrice;
    return {
      saleItem,
      quantity: item.quantity,
      unitPrice,
      totalPrice
    };
  });
  const totalSoldQuantity = sale.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const alreadyReturnedQuantity = Array.from(
    existingReturnQuantityMap.values()
  ).reduce((sum, quantity) => sum + quantity, 0);
  const newReturnedQuantity = preparedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const returnStatus = alreadyReturnedQuantity + newReturnedQuantity >= totalSoldQuantity ? SaleReturnStatus.FULL : SaleReturnStatus.PARTIAL;
  const result = await prisma.$transaction(
    async (tx) => {
      const createdReturn = await tx.saleReturn.create({
        data: {
          saleId: sale.id,
          organizationId: user.organizationId,
          shopId: sale.shopId,
          storageId,
          returnedById: user.userId,
          refundAmount: new prismaNamespace_exports.Decimal(refundAmount),
          status: returnStatus,
          note
        }
      });
      for (const item of preparedItems) {
        await tx.saleReturnItem.create({
          data: {
            saleReturnId: createdReturn.id,
            saleItemId: item.saleItem.id,
            productId: item.saleItem.productId,
            quantity: item.quantity,
            unitPrice: new prismaNamespace_exports.Decimal(item.unitPrice),
            totalPrice: new prismaNamespace_exports.Decimal(item.totalPrice)
          }
        });
        const inventory = await tx.inventory.findFirst({
          where: {
            organizationId: user.organizationId,
            shopId: sale.shopId,
            storageId,
            productId: item.saleItem.productId
          }
        });
        if (inventory) {
          await tx.inventory.update({
            where: {
              id: inventory.id
            },
            data: {
              quantity: {
                increment: item.quantity
              }
            }
          });
        } else {
          await tx.inventory.create({
            data: {
              organizationId: user.organizationId,
              shopId: sale.shopId,
              storageId,
              productId: item.saleItem.productId,
              quantity: item.quantity
            }
          });
        }
        await tx.inventoryTransaction.create({
          data: {
            organizationId: user.organizationId,
            shopId: sale.shopId,
            storageId,
            productId: item.saleItem.productId,
            createdById: user.userId,
            type: InventoryTransactionType.STOCK_IN,
            quantity: item.quantity,
            note: `Sale return for invoice: ${sale.invoiceNo}`,
            saleId: sale.id
          }
        });
      }
      if (returnStatus === SaleReturnStatus.FULL) {
        await tx.sale.update({
          where: {
            id: sale.id
          },
          data: {
            status: SaleStatus.REFUNDED
          }
        });
      }
      return tx.saleReturn.findUnique({
        where: {
          id: createdReturn.id
        },
        include: {
          returnedBy: true,
          storage: true,
          items: {
            include: {
              product: true,
              saleItem: true
            }
          }
        }
      });
    }
  );
  return result;
};
var getSaleReturns = async (user, saleId) => {
  if (!user.organizationId) {
    throw new AppError_default(status21.BAD_REQUEST, "Organization context is missing");
  }
  const sale = await prisma.sale.findFirst({
    where: {
      id: saleId,
      organizationId: user.organizationId
    },
    select: {
      id: true
    }
  });
  if (!sale) {
    throw new AppError_default(status21.NOT_FOUND, "Sale not found");
  }
  return prisma.saleReturn.findMany({
    where: {
      saleId,
      organizationId: user.organizationId
    },
    include: {
      returnedBy: true,
      storage: true,
      items: {
        include: {
          product: true,
          saleItem: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var getAllSales = async (user, query) => {
  if (!user.organizationId) {
    throw new AppError_default(status21.BAD_REQUEST, "Organization context is missing");
  }
  const queryBuilder = new QueryBuilder(prisma.sale, query, {
    searchableFields: saleSearchableFields,
    filterableFields: saleFilterableFields,
    sortableFields: saleSortableFields,
    defaultSortBy: "createdAt",
    defaultSortOrder: "desc",
    defaultLimit: 10,
    maxLimit: 100
  });
  const result = await queryBuilder.search().filter().sort().paginate().include({
    shop: true,
    createdBy: true,
    items: {
      include: {
        product: true
      }
    },
    payments: true
  }).where({
    organizationId: user.organizationId
  }).execute();
  return result;
};
var getSingleSale = async (user, saleId) => {
  if (!user.organizationId) {
    throw new AppError_default(status21.BAD_REQUEST, "Organization context is missing");
  }
  const sale = await prisma.sale.findFirst({
    where: {
      id: saleId,
      organizationId: user.organizationId
    },
    include: {
      shop: true,
      createdBy: true,
      items: {
        include: {
          product: {
            include: {
              category: true
            }
          }
        }
      },
      payments: {
        include: {
          receivedBy: true
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });
  if (!sale) {
    throw new AppError_default(status21.NOT_FOUND, "Sale not found");
  }
  return sale;
};
var cancelSale = async (user, saleId, payload) => {
  const { note } = payload;
  if (!user.organizationId) {
    throw new AppError_default(status21.BAD_REQUEST, "Organization context is missing");
  }
  const sale = await prisma.sale.findFirst({
    where: {
      id: saleId,
      organizationId: user.organizationId
    },
    include: {
      items: true,
      returns: {
        include: {
          items: true
        }
      }
    }
  });
  if (!sale) {
    throw new AppError_default(status21.NOT_FOUND, "Sale not found");
  }
  if (sale.status === SaleStatus.CANCELLED) {
    throw new AppError_default(status21.BAD_REQUEST, "Sale is already cancelled");
  }
  if (sale.returns.length > 0) {
    throw new AppError_default(
      status21.BAD_REQUEST,
      "Cannot cancel a sale that already has return records"
    );
  }
  const result = await prisma.$transaction(
    async (tx) => {
      for (const item of sale.items) {
        const inventory = await tx.inventory.findFirst({
          where: {
            organizationId: user.organizationId,
            shopId: sale.shopId,
            productId: item.productId
          },
          orderBy: {
            createdAt: "desc"
          }
        });
        if (inventory) {
          await tx.inventory.update({
            where: {
              id: inventory.id
            },
            data: {
              quantity: {
                increment: item.quantity
              }
            }
          });
          await tx.inventoryTransaction.create({
            data: {
              organizationId: user.organizationId,
              shopId: sale.shopId,
              storageId: inventory.storageId,
              productId: item.productId,
              createdById: user.userId,
              type: InventoryTransactionType.STOCK_IN,
              quantity: item.quantity,
              note: `Sale cancelled: ${sale.invoiceNo}`,
              saleId: sale.id
            }
          });
        } else {
          throw new AppError_default(
            status21.BAD_REQUEST,
            "Related inventory not found for sale item restoration"
          );
        }
      }
      const updatedSale = await tx.sale.update({
        where: {
          id: sale.id
        },
        data: {
          status: SaleStatus.CANCELLED,
          paymentStatus: SalePaymentStatus.UNPAID,
          paidAmount: new prismaNamespace_exports.Decimal(0),
          dueAmount: new prismaNamespace_exports.Decimal(0),
          note: note ? `${sale.note ? `${sale.note}

` : ""}Cancellation note: ${note}` : sale.note
        },
        include: {
          shop: true,
          createdBy: true,
          items: {
            include: {
              product: true
            }
          },
          payments: {
            include: {
              receivedBy: true
            },
            orderBy: {
              createdAt: "desc"
            }
          },
          returns: {
            include: {
              returnedBy: true,
              items: {
                include: {
                  product: true
                }
              }
            },
            orderBy: {
              createdAt: "desc"
            }
          }
        }
      });
      return updatedSale;
    }
  );
  return result;
};
var saleService = {
  createSale,
  createSaleReturn,
  getSaleReturns,
  addSalePayment,
  getSalePayments,
  getAllSales,
  getSingleSale,
  cancelSale
};

// src/app/modules/sale/sale.controller.ts
var createSale2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status22.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await saleService.createSale(user, req.body);
  sendResponse(res, {
    httpStatusCode: status22.CREATED,
    success: true,
    message: "Sale created successfully",
    data: result
  });
});
var getAllSales2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status22.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await saleService.getAllSales(user, req.query);
  sendResponse(res, {
    httpStatusCode: status22.OK,
    success: true,
    message: "Sales fetched successfully",
    meta: result.meta,
    data: result.data
  });
});
var getSingleSale2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status22.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await saleService.getSingleSale(user, req.params.id);
  sendResponse(res, {
    httpStatusCode: status22.OK,
    success: true,
    message: "Sale fetched successfully",
    data: result
  });
});
var addSalePayment2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status22.UNAUTHORIZED, "Unauthorized access");
  }
  const { id } = req.params;
  const result = await saleService.addSalePayment(user, id, req.body);
  sendResponse(res, {
    httpStatusCode: status22.OK,
    success: true,
    message: "Sale payment collected successfully",
    data: result
  });
});
var getSalePayments2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status22.UNAUTHORIZED, "Unauthorized access");
  }
  const { id } = req.params;
  const result = await saleService.getSalePayments(user, id);
  sendResponse(res, {
    httpStatusCode: status22.OK,
    success: true,
    message: "Sale payment history fetched successfully",
    data: result
  });
});
var createSaleReturn2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status22.UNAUTHORIZED, "Unauthorized access");
  }
  const { id } = req.params;
  const result = await saleService.createSaleReturn(
    user,
    id,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status22.CREATED,
    success: true,
    message: "Sale return created successfully",
    data: result
  });
});
var getSaleReturns2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status22.UNAUTHORIZED, "Unauthorized access");
  }
  const { id } = req.params;
  const result = await saleService.getSaleReturns(user, id);
  sendResponse(res, {
    httpStatusCode: status22.OK,
    success: true,
    message: "Sale returns fetched successfully",
    data: result
  });
});
var cancelSale2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status22.UNAUTHORIZED, "Unauthorized access");
  }
  const { id } = req.params;
  const result = await saleService.cancelSale(user, id, req.body);
  sendResponse(res, {
    httpStatusCode: status22.OK,
    success: true,
    message: "Sale cancelled successfully",
    data: result
  });
});
var saleController = {
  createSale: createSale2,
  createSaleReturn: createSaleReturn2,
  getSaleReturns: getSaleReturns2,
  addSalePayment: addSalePayment2,
  getSalePayments: getSalePayments2,
  getAllSales: getAllSales2,
  getSingleSale: getSingleSale2,
  cancelSale: cancelSale2
};

// src/app/modules/sale/sale.validation.ts
import z9 from "zod";
var createSaleValidationSchema = z9.object({
  shopId: z9.string().min(1, "Shop id is required"),
  storageId: z9.string().min(1, "Storage id is required"),
  paymentMethod: z9.enum(["CASH", "CARD", "MOBILE_BANKING", "BANK_TRANSFER"]),
  discount: z9.number().min(0).optional(),
  note: z9.string().optional(),
  paidAmount: z9.number().min(0).optional(),
  items: z9.array(
    z9.object({
      productId: z9.string().min(1, "Product id is required"),
      quantity: z9.number().int().positive("Quantity must be greater than 0")
    })
  ).min(1, "At least one sale item is required")
});
var addSalePaymentValidationSchema = z9.object({
  amount: z9.number().positive("Amount must be greater than 0"),
  paymentMethod: z9.enum(["CASH", "CARD", "MOBILE_BANKING", "BANK_TRANSFER"]),
  note: z9.string().optional()
});
var createSaleReturnValidationSchema = z9.object({
  storageId: z9.string().min(1, "Storage id is required"),
  note: z9.string().optional(),
  items: z9.array(
    z9.object({
      saleItemId: z9.string().min(1, "Sale item id is required"),
      quantity: z9.number().int().positive("Quantity must be greater than 0")
    })
  ).min(1, "At least one return item is required")
});
var cancelSaleValidationSchema = z9.object({
  note: z9.string().optional()
});

// src/app/modules/sale/sale.route.ts
var router9 = Router9();
router9.post(
  "/",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF
  ),
  validateRequest(createSaleValidationSchema),
  saleController.createSale
);
router9.get(
  "/",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF
  ),
  saleController.getAllSales
);
router9.get(
  "/:id",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF
  ),
  saleController.getSingleSale
);
router9.post(
  "/:id/payments",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, OrgRole.SHOP_ADMIN),
  validateRequest(addSalePaymentValidationSchema),
  saleController.addSalePayment
);
router9.get(
  "/:id/payments",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF
  ),
  saleController.getSalePayments
);
router9.post(
  "/:id/returns",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, OrgRole.SHOP_ADMIN),
  validateRequest(createSaleReturnValidationSchema),
  saleController.createSaleReturn
);
router9.get(
  "/:id/returns",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF
  ),
  saleController.getSaleReturns
);
router9.patch(
  "/:id/cancel",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, OrgRole.SHOP_ADMIN),
  validateRequest(cancelSaleValidationSchema),
  saleController.cancelSale
);
var saleRoutes = router9;

// src/app/modules/billing/billing.route.ts
import { Router as Router10 } from "express";

// src/app/modules/billing/billing.controller.ts
import status24 from "http-status";

// src/app/modules/billing/billing.service.ts
import status23 from "http-status";

// src/app/config/stripe.ts
import Stripe from "stripe";
var stripe = new Stripe(envVars.STRIPE_SECRET_KEY, {
  typescript: true
});

// src/app/modules/billing/billing.service.ts
var getBillingPlans = async () => {
  const plans = await prisma.billingPlan.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      amount: "asc"
    }
  });
  return plans;
};
var createPaymentIntent = async (user, payload) => {
  if (!user.organizationId) {
    throw new AppError_default(status23.BAD_REQUEST, "Organization context is missing");
  }
  const billingPlan = await prisma.billingPlan.findFirst({
    where: {
      id: payload.billingPlanId,
      isActive: true
    }
  });
  if (!billingPlan) {
    throw new AppError_default(status23.NOT_FOUND, "Billing plan not found");
  }
  const organization = await prisma.organization.findUnique({
    where: {
      id: user.organizationId
    }
  });
  if (!organization || organization.isDeleted) {
    throw new AppError_default(status23.NOT_FOUND, "Organization not found");
  }
  let subscription = await prisma.organizationSubscription.findFirst({
    where: {
      organizationId: user.organizationId,
      billingPlanId: billingPlan.id
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  if (!subscription) {
    subscription = await prisma.organizationSubscription.create({
      data: {
        organizationId: user.organizationId,
        billingPlanId: billingPlan.id,
        status: SubscriptionStatus.INACTIVE
      }
    });
  }
  const amount = Math.round(Number(billingPlan.amount) * 100);
  if (amount <= 0) {
    throw new AppError_default(status23.BAD_REQUEST, "Invalid billing amount");
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: billingPlan.currency.toLowerCase(),
    automatic_payment_methods: {
      enabled: true
    },
    metadata: {
      organizationId: user.organizationId,
      subscriptionId: subscription.id,
      billingPlanId: billingPlan.id,
      createdById: user.userId,
      paymentType: "subscription"
    }
  });
  const paymentTransaction = await prisma.paymentTransaction.create({
    data: {
      organizationId: user.organizationId,
      subscriptionId: subscription.id,
      createdById: user.userId,
      amount: billingPlan.amount,
      currency: billingPlan.currency,
      status: PaymentStatus.PENDING,
      stripePaymentIntentId: paymentIntent.id,
      stripeClientSecret: paymentIntent.client_secret,
      note: `Subscription payment initiated for ${billingPlan.name} plan`
    }
  });
  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    paymentTransaction,
    billingPlan,
    publishableKey: envVars.STRIPE_PUBLISHABLE_KEY
  };
};
var getBillingStatus = async (user) => {
  if (!user.organizationId) {
    throw new AppError_default(status23.BAD_REQUEST, "Organization context is missing");
  }
  const subscription = await prisma.organizationSubscription.findFirst({
    where: {
      organizationId: user.organizationId
    },
    include: {
      billingPlan: true,
      payments: {
        orderBy: {
          createdAt: "desc"
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return subscription;
};
var getBillingHistory = async (user) => {
  if (!user.organizationId) {
    throw new AppError_default(status23.BAD_REQUEST, "Organization context is missing");
  }
  const payments = await prisma.paymentTransaction.findMany({
    where: {
      organizationId: user.organizationId
    },
    include: {
      subscription: {
        include: {
          billingPlan: true
        }
      },
      createdBy: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return payments;
};
var handleStripeWebhook = async (rawBody, signature) => {
  const event = stripe.webhooks.constructEvent(
    rawBody,
    signature,
    envVars.STRIPE_WEBHOOK_SECRET
  );
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const paymentTransaction = await prisma.paymentTransaction.findFirst({
      where: {
        stripePaymentIntentId: paymentIntent.id
      },
      include: {
        subscription: true
      }
    });
    if (!paymentTransaction) {
      return { received: true };
    }
    await prisma.$transaction(async (tx) => {
      await tx.paymentTransaction.update({
        where: {
          id: paymentTransaction.id
        },
        data: {
          status: PaymentStatus.SUCCEEDED
        }
      });
      if (paymentTransaction.subscriptionId) {
        await tx.organizationSubscription.update({
          where: {
            id: paymentTransaction.subscriptionId
          },
          data: {
            status: SubscriptionStatus.ACTIVE,
            startsAt: /* @__PURE__ */ new Date()
          }
        });
      }
    });
  }
  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;
    const paymentTransaction = await prisma.paymentTransaction.findFirst({
      where: {
        stripePaymentIntentId: paymentIntent.id
      }
    });
    if (paymentTransaction) {
      await prisma.paymentTransaction.update({
        where: {
          id: paymentTransaction.id
        },
        data: {
          status: PaymentStatus.FAILED
        }
      });
    }
  }
  return { received: true };
};
var billingService = {
  getBillingPlans,
  createPaymentIntent,
  getBillingStatus,
  getBillingHistory,
  handleStripeWebhook
};

// src/app/modules/billing/billing.controller.ts
var getBillingPlans2 = catchAsync(async (_req, res) => {
  const result = await billingService.getBillingPlans();
  sendResponse(res, {
    httpStatusCode: status24.OK,
    success: true,
    message: "Subscription plans fetched successfully",
    data: result
  });
});
var createPaymentIntent2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status24.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await billingService.createPaymentIntent(user, req.body);
  sendResponse(res, {
    httpStatusCode: status24.OK,
    success: true,
    message: "Subscription payment intent created successfully",
    data: result
  });
});
var getBillingStatus2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status24.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await billingService.getBillingStatus(user);
  sendResponse(res, {
    httpStatusCode: status24.OK,
    success: true,
    message: "Subscription status fetched successfully",
    data: result
  });
});
var getBillingHistory2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status24.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await billingService.getBillingHistory(user);
  sendResponse(res, {
    httpStatusCode: status24.OK,
    success: true,
    message: "Subscription payment history fetched successfully",
    data: result
  });
});
var stripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  if (!signature || typeof signature !== "string") {
    throw new AppError_default(status24.BAD_REQUEST, "Stripe signature is missing");
  }
  const result = await billingService.handleStripeWebhook(
    req.body,
    signature
  );
  return res.status(status24.OK).json(result);
};
var billingController = {
  getBillingPlans: getBillingPlans2,
  createPaymentIntent: createPaymentIntent2,
  getBillingStatus: getBillingStatus2,
  getBillingHistory: getBillingHistory2,
  stripeWebhook
};

// src/app/modules/billing/billing.validation.ts
import z10 from "zod";
var createPaymentIntentValidationSchema = z10.object({
  billingPlanId: z10.string().min(1, "Billing plan id is required")
});

// src/app/modules/billing/billing.route.ts
var router10 = Router10();
router10.get(
  "/plans",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, {
    allowWithoutSubscription: true
  }),
  billingController.getBillingPlans
);
router10.post(
  "/create-payment-intent",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, {
    allowWithoutSubscription: true
  }),
  validateRequest(createPaymentIntentValidationSchema),
  billingController.createPaymentIntent
);
router10.get(
  "/status",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, {
    allowWithoutSubscription: true
  }),
  billingController.getBillingStatus
);
router10.get(
  "/history",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, {
    allowWithoutSubscription: true
  }),
  billingController.getBillingHistory
);
router10.post("/webhook", billingController.stripeWebhook);
var billingRoutes = router10;

// src/app/modules/dashboard/dashboard.route.ts
import { Router as Router11 } from "express";

// src/app/modules/dashboard/dashboard.controller.ts
import status25 from "http-status";

// src/app/modules/dashboard/dashboard.service.ts
var getAccessibleShopIds = async (user) => {
  if (user.role === OrgRole.ORG_SUPER_ADMIN || user.role === OrgRole.ORG_ADMIN) {
    return null;
  }
  const assignments = await prisma.shopAssignment.findMany({
    where: {
      userId: user.userId,
      isActive: true,
      shop: {
        organizationId: user.organizationId,
        isDeleted: false
      }
    },
    select: {
      shopId: true
    }
  });
  return assignments.map((item) => item.shopId);
};
var getDashboardOverview = async (user) => {
  const organizationId = user.organizationId;
  const shopIds = await getAccessibleShopIds(user);
  const now = /* @__PURE__ */ new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const startOfTomorrow = new Date(now);
  startOfTomorrow.setHours(24, 0, 0, 0);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const shopFilter = shopIds === null ? {} : {
    shopId: {
      in: shopIds
    }
  };
  const [
    totalShops,
    totalStaff,
    totalProducts,
    totalStorages,
    totalInventoryRecords,
    todaySalesAggregate,
    monthlySalesAggregate,
    todaySalesCount,
    monthlySalesCount,
    recentSales,
    recentInventoryTransactions,
    inventories
  ] = await Promise.all([
    prisma.shop.count({
      where: {
        organizationId,
        isDeleted: false,
        ...shopIds === null ? {} : {
          id: {
            in: shopIds
          }
        }
      }
    }),
    prisma.organizationMember.count({
      where: {
        organizationId,
        isActive: true,
        user: {
          isDeleted: false
        },
        ...shopIds === null ? {} : {
          user: {
            isDeleted: false,
            shopAssignments: {
              some: {
                shopId: {
                  in: shopIds
                },
                isActive: true
              }
            }
          }
        }
      }
    }),
    prisma.product.count({
      where: {
        organizationId,
        isDeleted: false
      }
    }),
    prisma.storage.count({
      where: {
        organizationId,
        isDeleted: false,
        ...shopFilter
      }
    }),
    prisma.inventory.count({
      where: {
        organizationId,
        ...shopFilter
      }
    }),
    prisma.sale.aggregate({
      where: {
        organizationId,
        ...shopFilter,
        createdAt: {
          gte: startOfToday,
          lt: startOfTomorrow
        }
      },
      _sum: {
        total: true
      }
    }),
    prisma.sale.aggregate({
      where: {
        organizationId,
        ...shopFilter,
        createdAt: {
          gte: startOfMonth
        }
      },
      _sum: {
        total: true
      }
    }),
    prisma.sale.count({
      where: {
        organizationId,
        ...shopFilter,
        createdAt: {
          gte: startOfToday,
          lt: startOfTomorrow
        }
      }
    }),
    prisma.sale.count({
      where: {
        organizationId,
        ...shopFilter,
        createdAt: {
          gte: startOfMonth
        }
      }
    }),
    prisma.sale.findMany({
      where: {
        organizationId,
        ...shopFilter
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 5,
      select: {
        id: true,
        invoiceNo: true,
        subtotal: true,
        discount: true,
        total: true,
        createdAt: true,
        shop: {
          select: {
            id: true,
            name: true
          }
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    }),
    prisma.inventoryTransaction.findMany({
      where: {
        organizationId,
        ...shopFilter
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 8,
      select: {
        id: true,
        type: true,
        quantity: true,
        note: true,
        createdAt: true,
        product: {
          select: {
            id: true,
            name: true,
            sku: true
          }
        },
        shop: {
          select: {
            id: true,
            name: true
          }
        },
        storage: {
          select: {
            id: true,
            name: true
          }
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    }),
    prisma.inventory.findMany({
      where: {
        organizationId,
        ...shopFilter
      },
      select: {
        quantity: true,
        lowStockThreshold: true
      }
    })
  ]);
  const lowStockProducts = inventories.filter(
    (item) => item.quantity <= item.lowStockThreshold
  ).length;
  return {
    summary: {
      totalShops,
      totalStaff,
      totalProducts,
      totalStorages,
      totalInventoryRecords,
      lowStockProducts
    },
    sales: {
      todaySalesCount,
      todaySalesAmount: Number(todaySalesAggregate._sum?.total ?? 0),
      monthlySalesCount,
      monthlySalesAmount: Number(monthlySalesAggregate._sum?.total ?? 0)
    },
    recentSales,
    recentInventoryTransactions
  };
};
var getSalesAnalytics = async (user, period = "daily") => {
  const organizationId = user.organizationId;
  const shopIds = await getAccessibleShopIds(user);
  const now = /* @__PURE__ */ new Date();
  let startDate;
  let mode;
  if (period === "monthly") {
    startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    mode = "monthly";
  } else {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);
    mode = "daily";
  }
  const shopFilter = shopIds === null ? {} : {
    shopId: {
      in: shopIds
    }
  };
  const sales = await prisma.sale.findMany({
    where: {
      organizationId,
      ...shopFilter,
      createdAt: {
        gte: startDate
      }
    },
    select: {
      createdAt: true,
      total: true
    },
    orderBy: {
      createdAt: "asc"
    }
  });
  const grouped = {};
  for (const sale of sales) {
    const date = new Date(sale.createdAt);
    const key = mode === "daily" ? date.toISOString().split("T")[0] : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    grouped[key] = (grouped[key] || 0) + Number(sale.total);
  }
  return Object.entries(grouped).map(([label, total]) => ({
    label,
    total
  }));
};
var getTopSellingProducts = async (user) => {
  const organizationId = user.organizationId;
  const shopIds = await getAccessibleShopIds(user);
  const items = await prisma.saleItem.findMany({
    where: {
      sale: {
        organizationId,
        ...shopIds === null ? {} : {
          shopId: {
            in: shopIds
          }
        }
      }
    },
    select: {
      productId: true,
      quantity: true,
      totalPrice: true,
      product: {
        select: {
          id: true,
          name: true,
          sku: true
        }
      }
    }
  });
  const grouped = /* @__PURE__ */ new Map();
  for (const item of items) {
    const existing = grouped.get(item.productId);
    if (existing) {
      existing.totalSold += item.quantity;
      existing.revenue += Number(item.totalPrice);
    } else {
      grouped.set(item.productId, {
        product: item.product,
        totalSold: item.quantity,
        revenue: Number(item.totalPrice)
      });
    }
  }
  return Array.from(grouped.values()).sort((a, b) => b.totalSold - a.totalSold).slice(0, 5);
};
var getLowStockProducts = async (user) => {
  const organizationId = user.organizationId;
  const shopIds = await getAccessibleShopIds(user);
  const shopFilter = shopIds === null ? {} : {
    shopId: {
      in: shopIds
    }
  };
  const inventories = await prisma.inventory.findMany({
    where: {
      organizationId,
      ...shopFilter
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          sku: true,
          price: true
        }
      },
      shop: {
        select: {
          id: true,
          name: true
        }
      },
      storage: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      quantity: "asc"
    }
  });
  return inventories.filter((item) => item.quantity <= item.lowStockThreshold).map((item) => ({
    id: item.id,
    quantity: item.quantity,
    lowStockThreshold: item.lowStockThreshold,
    product: item.product,
    shop: item.shop,
    storage: item.storage
  }));
};
var dashboardService = {
  getDashboardOverview,
  getSalesAnalytics,
  getTopSellingProducts,
  getLowStockProducts
};

// src/app/modules/dashboard/dashboard.controller.ts
var getDashboardOverview2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status25.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await dashboardService.getDashboardOverview(user);
  sendResponse(res, {
    httpStatusCode: status25.OK,
    success: true,
    message: "Dashboard overview fetched successfully",
    data: result
  });
});
var getSalesAnalytics2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status25.UNAUTHORIZED, "Unauthorized access");
  }
  const rawPeriod = req.query.period;
  const period = rawPeriod === "monthly" ? "monthly" : "daily";
  const result = await dashboardService.getSalesAnalytics(user, period);
  sendResponse(res, {
    httpStatusCode: status25.OK,
    success: true,
    message: "Sales analytics fetched successfully",
    data: result
  });
});
var getTopSellingProducts2 = catchAsync(
  async (req, res) => {
    const user = req.user;
    if (!user) {
      throw new AppError_default(status25.UNAUTHORIZED, "Unauthorized access");
    }
    const result = await dashboardService.getTopSellingProducts(user);
    sendResponse(res, {
      httpStatusCode: status25.OK,
      success: true,
      message: "Top selling products fetched successfully",
      data: result
    });
  }
);
var getLowStockProducts2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError_default(status25.UNAUTHORIZED, "Unauthorized access");
  }
  const result = await dashboardService.getLowStockProducts(user);
  sendResponse(res, {
    httpStatusCode: status25.OK,
    success: true,
    message: "Low stock products fetched successfully",
    data: result
  });
});
var dashboardController = {
  getDashboardOverview: getDashboardOverview2,
  getSalesAnalytics: getSalesAnalytics2,
  getTopSellingProducts: getTopSellingProducts2,
  getLowStockProducts: getLowStockProducts2
};

// src/app/modules/dashboard/dashboard.route.ts
var router11 = Router11();
router11.get(
  "/overview",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF
  ),
  dashboardController.getDashboardOverview
);
router11.get(
  "/sales-analytics",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF
  ),
  dashboardController.getSalesAnalytics
);
router11.get(
  "/top-products",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF
  ),
  dashboardController.getTopSellingProducts
);
router11.get(
  "/low-stock",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF
  ),
  dashboardController.getLowStockProducts
);
var dashboardRoutes = router11;

// src/app/modules/platform/platform.route.ts
import { Router as Router12 } from "express";

// src/app/modules/platform/platform.controller.ts
import status27 from "http-status";

// src/app/modules/platform/platform.service.ts
import status26 from "http-status";
var getPlatformDashboard = async () => {
  const [
    totalOrganizations,
    activeOrganizations,
    suspendedOrganizations,
    totalUsers,
    totalShops,
    totalProducts,
    totalSales,
    totalRevenueAggregate,
    recentOrganizations
  ] = await Promise.all([
    prisma.organization.count({
      where: {
        isDeleted: false
      }
    }),
    prisma.organization.count({
      where: {
        isDeleted: false,
        status: OrganizationStatus.ACTIVE
      }
    }),
    prisma.organization.count({
      where: {
        isDeleted: false,
        status: OrganizationStatus.SUSPENDED
      }
    }),
    prisma.user.count({
      where: {
        isDeleted: false
      }
    }),
    prisma.shop.count({
      where: {
        isDeleted: false
      }
    }),
    prisma.product.count({
      where: {
        isDeleted: false
      }
    }),
    prisma.sale.count(),
    prisma.sale.aggregate({
      _sum: {
        total: true
      }
    }),
    prisma.organization.findMany({
      where: {
        isDeleted: false
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 5,
      select: {
        id: true,
        name: true,
        slug: true,
        email: true,
        phone: true,
        logo: true,
        status: true,
        createdAt: true
      }
    })
  ]);
  return {
    summary: {
      totalOrganizations,
      activeOrganizations,
      suspendedOrganizations,
      totalUsers,
      totalShops,
      totalProducts,
      totalSales,
      totalRevenue: Number(totalRevenueAggregate._sum?.total ?? 0)
    },
    recentOrganizations
  };
};
var getAllOrganizations = async () => {
  const organizations = await prisma.organization.findMany({
    where: {
      isDeleted: false
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      _count: {
        select: {
          members: true,
          shops: true,
          storages: true,
          products: true,
          sales: true,
          subscriptions: true
        }
      }
    }
  });
  return organizations;
};
var getSingleOrganization = async (organizationId) => {
  const organization = await prisma.organization.findFirst({
    where: {
      id: organizationId,
      isDeleted: false
    },
    include: {
      members: {
        include: {
          user: true
        },
        orderBy: {
          createdAt: "asc"
        }
      },
      shops: {
        where: {
          isDeleted: false
        }
      },
      storages: {
        where: {
          isDeleted: false
        }
      },
      products: {
        where: {
          isDeleted: false
        }
      },
      subscriptions: {
        orderBy: {
          createdAt: "desc"
        },
        take: 5
      },
      paymentTransactions: {
        orderBy: {
          createdAt: "desc"
        },
        take: 10
      },
      _count: {
        select: {
          members: true,
          shops: true,
          storages: true,
          products: true,
          sales: true
        }
      }
    }
  });
  if (!organization) {
    throw new AppError_default(status26.NOT_FOUND, "Organization not found");
  }
  return organization;
};
var updateOrganizationStatus = async (organizationId, payload) => {
  const organization = await prisma.organization.findFirst({
    where: {
      id: organizationId,
      isDeleted: false
    }
  });
  if (!organization) {
    throw new AppError_default(status26.NOT_FOUND, "Organization not found");
  }
  const updateData = {
    status: payload.status
  };
  if (payload.status === OrganizationStatus.SUSPENDED) {
    updateData.suspendedAt = /* @__PURE__ */ new Date();
  } else {
    updateData.suspendedAt = null;
  }
  const updatedOrganization = await prisma.organization.update({
    where: {
      id: organizationId
    },
    data: updateData
  });
  return updatedOrganization;
};
var platformService = {
  getPlatformDashboard,
  getAllOrganizations,
  getSingleOrganization,
  updateOrganizationStatus
};

// src/app/modules/platform/platform.controller.ts
var getPlatformDashboard2 = catchAsync(async (req, res) => {
  const result = await platformService.getPlatformDashboard();
  sendResponse(res, {
    httpStatusCode: status27.OK,
    success: true,
    message: "Platform dashboard fetched successfully",
    data: result
  });
});
var getAllOrganizations2 = catchAsync(async (req, res) => {
  const result = await platformService.getAllOrganizations();
  sendResponse(res, {
    httpStatusCode: status27.OK,
    success: true,
    message: "Organizations fetched successfully",
    data: result
  });
});
var getSingleOrganization2 = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const result = await platformService.getSingleOrganization(id);
    sendResponse(res, {
      httpStatusCode: status27.OK,
      success: true,
      message: "Organization fetched successfully",
      data: result
    });
  }
);
var updateOrganizationStatus2 = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await platformService.updateOrganizationStatus(
      id,
      payload
    );
    sendResponse(res, {
      httpStatusCode: status27.OK,
      success: true,
      message: "Organization status updated successfully",
      data: result
    });
  }
);
var platformController = {
  getPlatformDashboard: getPlatformDashboard2,
  getAllOrganizations: getAllOrganizations2,
  getSingleOrganization: getSingleOrganization2,
  updateOrganizationStatus: updateOrganizationStatus2
};

// src/app/modules/platform/platform.validation.ts
import z11 from "zod";
var updateOrganizationStatusValidationSchema = z11.object({
  status: z11.enum(["ACTIVE", "INACTIVE", "SUSPENDED"])
});

// src/app/modules/platform/platform.route.ts
var router12 = Router12();
router12.get(
  "/dashboard",
  checkPlatformAuth(PlatformRole.PLATFORM_SUPER_ADMIN),
  platformController.getPlatformDashboard
);
router12.get(
  "/organizations",
  checkPlatformAuth(PlatformRole.PLATFORM_SUPER_ADMIN),
  platformController.getAllOrganizations
);
router12.get(
  "/organizations/:id",
  checkPlatformAuth(PlatformRole.PLATFORM_SUPER_ADMIN),
  platformController.getSingleOrganization
);
router12.patch(
  "/organizations/:id",
  checkPlatformAuth(PlatformRole.PLATFORM_SUPER_ADMIN),
  validateRequest(updateOrganizationStatusValidationSchema),
  platformController.updateOrganizationStatus
);
var platformRoutes = router12;

// src/app/modules/customer-interaction/customer-interaction.route.ts
import { Router as Router13 } from "express";

// src/app/modules/customer-interaction/customer-interaction.controller.ts
import status29 from "http-status";

// src/app/modules/customer-interaction/customer-interaction.service.ts
import status28 from "http-status";
var getPagination = (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};
var buildSearch = (searchTerm) => {
  if (!searchTerm || typeof searchTerm !== "string") {
    return void 0;
  }
  return {
    contains: searchTerm,
    mode: "insensitive"
  };
};
var createContactMessage = async (payload) => {
  return prisma.contactMessage.create({
    data: payload
  });
};
var getContactMessages = async (query) => {
  const { page, limit, skip } = getPagination(query);
  const search = buildSearch(query.searchTerm);
  const where = {
    ...query.status ? { status: query.status } : {},
    ...search ? {
      OR: [
        { name: search },
        { email: search },
        { company: search },
        { message: search }
      ]
    } : {}
  };
  const [total, data] = await Promise.all([
    prisma.contactMessage.count({ where }),
    prisma.contactMessage.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" }
    })
  ]);
  return {
    data,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) }
  };
};
var updateContactMessageStatus = async (id, nextStatus) => {
  const message = await prisma.contactMessage.findUnique({ where: { id } });
  if (!message) {
    throw new AppError_default(status28.NOT_FOUND, "Contact message not found");
  }
  return prisma.contactMessage.update({
    where: { id },
    data: { status: nextStatus }
  });
};
var createDemoRequest = async (payload) => {
  return prisma.demoRequest.create({
    data: {
      ...payload,
      preferredDate: payload.preferredDate ? new Date(payload.preferredDate) : void 0
    }
  });
};
var getDemoRequests = async (query) => {
  const { page, limit, skip } = getPagination(query);
  const search = buildSearch(query.searchTerm);
  const where = {
    ...query.status ? { status: query.status } : {},
    ...search ? {
      OR: [
        { name: search },
        { email: search },
        { company: search },
        { businessType: search },
        { message: search }
      ]
    } : {}
  };
  const [total, data] = await Promise.all([
    prisma.demoRequest.count({ where }),
    prisma.demoRequest.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" }
    })
  ]);
  return {
    data,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) }
  };
};
var updateDemoRequestStatus = async (id, nextStatus) => {
  const demoRequest = await prisma.demoRequest.findUnique({ where: { id } });
  if (!demoRequest) {
    throw new AppError_default(status28.NOT_FOUND, "Demo request not found");
  }
  return prisma.demoRequest.update({
    where: { id },
    data: { status: nextStatus }
  });
};
var createNewsletterSubscriber = async (email) => {
  return prisma.newsletterSubscriber.upsert({
    where: { email },
    update: { isActive: true },
    create: { email }
  });
};
var createSupportTicket = async (payload) => {
  return prisma.supportTicket.create({
    data: payload
  });
};
var getSupportTickets = async (query) => {
  const { page, limit, skip } = getPagination(query);
  const search = buildSearch(query.searchTerm);
  const where = {
    ...query.status ? { status: query.status } : {},
    ...query.category ? { category: String(query.category) } : {},
    ...search ? {
      OR: [
        { name: search },
        { email: search },
        { subject: search },
        { category: search },
        { message: search }
      ]
    } : {}
  };
  const [total, data] = await Promise.all([
    prisma.supportTicket.count({ where }),
    prisma.supportTicket.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" }
    })
  ]);
  return {
    data,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) }
  };
};
var updateSupportTicketStatus = async (id, nextStatus) => {
  const ticket = await prisma.supportTicket.findUnique({ where: { id } });
  if (!ticket) {
    throw new AppError_default(status28.NOT_FOUND, "Support ticket not found");
  }
  return prisma.supportTicket.update({
    where: { id },
    data: { status: nextStatus }
  });
};
var customerInteractionService = {
  createContactMessage,
  getContactMessages,
  updateContactMessageStatus,
  createDemoRequest,
  getDemoRequests,
  updateDemoRequestStatus,
  createNewsletterSubscriber,
  createSupportTicket,
  getSupportTickets,
  updateSupportTicketStatus
};

// src/app/modules/customer-interaction/customer-interaction.controller.ts
var createContactMessage2 = catchAsync(async (req, res) => {
  const result = await customerInteractionService.createContactMessage(req.body);
  sendResponse(res, {
    httpStatusCode: status29.CREATED,
    success: true,
    message: "Contact message submitted successfully",
    data: result
  });
});
var getContactMessages2 = catchAsync(async (req, res) => {
  const result = await customerInteractionService.getContactMessages(req.query);
  sendResponse(res, {
    httpStatusCode: status29.OK,
    success: true,
    message: "Contact messages fetched successfully",
    meta: result.meta,
    data: result.data
  });
});
var updateContactMessageStatus2 = catchAsync(
  async (req, res) => {
    const result = await customerInteractionService.updateContactMessageStatus(
      req.params.id,
      req.body.status
    );
    sendResponse(res, {
      httpStatusCode: status29.OK,
      success: true,
      message: "Contact message status updated successfully",
      data: result
    });
  }
);
var createDemoRequest2 = catchAsync(async (req, res) => {
  const result = await customerInteractionService.createDemoRequest(req.body);
  sendResponse(res, {
    httpStatusCode: status29.CREATED,
    success: true,
    message: "Demo request submitted successfully",
    data: result
  });
});
var getDemoRequests2 = catchAsync(async (req, res) => {
  const result = await customerInteractionService.getDemoRequests(req.query);
  sendResponse(res, {
    httpStatusCode: status29.OK,
    success: true,
    message: "Demo requests fetched successfully",
    meta: result.meta,
    data: result.data
  });
});
var updateDemoRequestStatus2 = catchAsync(
  async (req, res) => {
    const result = await customerInteractionService.updateDemoRequestStatus(
      req.params.id,
      req.body.status
    );
    sendResponse(res, {
      httpStatusCode: status29.OK,
      success: true,
      message: "Demo request status updated successfully",
      data: result
    });
  }
);
var createNewsletterSubscriber2 = catchAsync(
  async (req, res) => {
    const result = await customerInteractionService.createNewsletterSubscriber(
      req.body.email
    );
    sendResponse(res, {
      httpStatusCode: status29.CREATED,
      success: true,
      message: "Newsletter subscription saved successfully",
      data: result
    });
  }
);
var createSupportTicket2 = catchAsync(async (req, res) => {
  const result = await customerInteractionService.createSupportTicket(req.body);
  sendResponse(res, {
    httpStatusCode: status29.CREATED,
    success: true,
    message: "Support ticket submitted successfully",
    data: result
  });
});
var getSupportTickets2 = catchAsync(async (req, res) => {
  const result = await customerInteractionService.getSupportTickets(req.query);
  sendResponse(res, {
    httpStatusCode: status29.OK,
    success: true,
    message: "Support tickets fetched successfully",
    meta: result.meta,
    data: result.data
  });
});
var updateSupportTicketStatus2 = catchAsync(
  async (req, res) => {
    const result = await customerInteractionService.updateSupportTicketStatus(
      req.params.id,
      req.body.status
    );
    sendResponse(res, {
      httpStatusCode: status29.OK,
      success: true,
      message: "Support ticket status updated successfully",
      data: result
    });
  }
);
var customerInteractionController = {
  createContactMessage: createContactMessage2,
  getContactMessages: getContactMessages2,
  updateContactMessageStatus: updateContactMessageStatus2,
  createDemoRequest: createDemoRequest2,
  getDemoRequests: getDemoRequests2,
  updateDemoRequestStatus: updateDemoRequestStatus2,
  createNewsletterSubscriber: createNewsletterSubscriber2,
  createSupportTicket: createSupportTicket2,
  getSupportTickets: getSupportTickets2,
  updateSupportTicketStatus: updateSupportTicketStatus2
};

// src/app/modules/customer-interaction/customer-interaction.validation.ts
import z12 from "zod";
var createContactMessageValidationSchema = z12.object({
  name: z12.string().min(2, "Name must be at least 2 characters"),
  email: z12.email("Enter a valid email address"),
  phone: z12.string().optional(),
  company: z12.string().optional(),
  message: z12.string().min(20, "Message must be at least 20 characters")
});
var updateContactMessageStatusValidationSchema = z12.object({
  status: z12.enum(["NEW", "CONTACTED", "SCHEDULED", "CLOSED"])
});
var createDemoRequestValidationSchema = z12.object({
  name: z12.string().min(2, "Name must be at least 2 characters"),
  email: z12.email("Enter a valid email address"),
  phone: z12.string().optional(),
  company: z12.string().min(2, "Company name is required"),
  businessType: z12.string().optional(),
  teamSize: z12.string().optional(),
  preferredDate: z12.string().datetime().optional(),
  message: z12.string().optional()
});
var updateDemoRequestStatusValidationSchema = z12.object({
  status: z12.enum(["PENDING", "CONTACTED", "SCHEDULED", "COMPLETED", "CANCELLED"])
});
var createNewsletterSubscriberValidationSchema = z12.object({
  email: z12.email("Enter a valid email address")
});
var createSupportTicketValidationSchema = z12.object({
  name: z12.string().min(2, "Name must be at least 2 characters"),
  email: z12.email("Enter a valid email address"),
  subject: z12.string().min(4, "Subject must be at least 4 characters"),
  category: z12.string().min(2, "Category is required"),
  priority: z12.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  message: z12.string().min(20, "Message must be at least 20 characters")
});
var updateSupportTicketStatusValidationSchema = z12.object({
  status: z12.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"])
});

// src/app/modules/customer-interaction/customer-interaction.route.ts
var router13 = Router13();
var adminRoles = [
  OrgRole.ORG_SUPER_ADMIN,
  OrgRole.ORG_ADMIN,
  OrgRole.SHOP_ADMIN
];
router13.post(
  "/contact",
  validateRequest(createContactMessageValidationSchema),
  customerInteractionController.createContactMessage
);
router13.get(
  "/contact-messages",
  checkAuth(...adminRoles, { allowWithoutSubscription: true }),
  customerInteractionController.getContactMessages
);
router13.patch(
  "/contact-messages/:id/status",
  checkAuth(...adminRoles, { allowWithoutSubscription: true }),
  validateRequest(updateContactMessageStatusValidationSchema),
  customerInteractionController.updateContactMessageStatus
);
router13.post(
  "/demo-requests",
  validateRequest(createDemoRequestValidationSchema),
  customerInteractionController.createDemoRequest
);
router13.get(
  "/demo-requests",
  checkAuth(...adminRoles, { allowWithoutSubscription: true }),
  customerInteractionController.getDemoRequests
);
router13.patch(
  "/demo-requests/:id/status",
  checkAuth(...adminRoles, { allowWithoutSubscription: true }),
  validateRequest(updateDemoRequestStatusValidationSchema),
  customerInteractionController.updateDemoRequestStatus
);
router13.post(
  "/newsletter",
  validateRequest(createNewsletterSubscriberValidationSchema),
  customerInteractionController.createNewsletterSubscriber
);
router13.post(
  "/support-tickets",
  validateRequest(createSupportTicketValidationSchema),
  customerInteractionController.createSupportTicket
);
router13.get(
  "/support-tickets",
  checkAuth(...adminRoles, { allowWithoutSubscription: true }),
  customerInteractionController.getSupportTickets
);
router13.patch(
  "/support-tickets/:id/status",
  checkAuth(...adminRoles, { allowWithoutSubscription: true }),
  validateRequest(updateSupportTicketStatusValidationSchema),
  customerInteractionController.updateSupportTicketStatus
);
var customerInteractionRoutes = router13;

// src/app/routes/index.ts
var router14 = Router14();
router14.use("/auth", authRoutes);
router14.use("/organizations", organizationRoutes);
router14.use("/shops", shopRoutes);
router14.use("/staff", staffRoutes);
router14.use("/categories", categoryRoutes);
router14.use("/products", productRoutes);
router14.use("/storages", storageRoutes);
router14.use("/inventory", inventoryRoutes);
router14.use("/sales", saleRoutes);
router14.use("/billing", billingRoutes);
router14.use("/dashboard", dashboardRoutes);
router14.use("/platform", platformRoutes);
router14.use("/", customerInteractionRoutes);
var indexRoutes = router14;

// src/app.ts
import path3 from "path";
import { toNodeHandler } from "better-auth/node";

// src/app/middlewWire/notFound.ts
import status30 from "http-status";
var notFound = (req, res) => {
  res.status(status30.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
};

// src/app/middlewWire/globalErrorHandler.ts
import status32 from "http-status";
import z13 from "zod";

// src/app/errorHelper/handleZoderror.ts
import status31 from "http-status";
var handleZodError = (err) => {
  const statusCode = status31.BAD_REQUEST;
  const message = "Validation failed";
  const errorSources = err.issues.map((issue) => ({
    path: issue.path.length > 0 ? issue.path.map(String).join(" => ") : "unknown",
    message: issue.message
  }));
  return {
    success: false,
    message,
    errorSources,
    statusCode
  };
};

// src/app/middlewWire/globalErrorHandler.ts
var globalErrorHandler = async (err, req, res, next) => {
  if (envVars.NODE_ENV === "development") {
    console.error(err);
  }
  try {
    if (req.file && "path" in req.file && req.file.path) {
      await deleteFileFromCloudinary(req.file.path);
    }
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const imageUrls = req.files.filter((file) => "path" in file && file.path).map((file) => file.path);
      await Promise.all(imageUrls.map((url) => deleteFileFromCloudinary(url)));
    }
  } catch (cleanupError) {
    if (envVars.NODE_ENV === "development") {
      console.error("Cloudinary cleanup failed:", cleanupError);
    }
  }
  let errorSources = [];
  let statusCode = status32.INTERNAL_SERVER_ERROR;
  let message = "Internal Server Error";
  if (err instanceof z13.ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode ?? status32.BAD_REQUEST;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err instanceof AppError_default) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message
      }
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message
      }
    ];
  }
  const errorResponse = {
    success: false,
    message,
    errorSources,
    error: envVars.NODE_ENV === "development" ? err instanceof Error ? {
      name: err.name,
      message: err.message,
      stack: err.stack
    } : err : void 0
  };
  return res.status(statusCode).json(errorResponse);
};

// src/app.ts
var app = express();
app.set("view engine", "ejs");
app.set("views", path3.resolve(process.cwd(), `src/app/templates`));
app.use(
  cors({
    origin: [
      envVars.FRONTEND_URL,
      envVars.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:5000"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/api/auth", toNodeHandler(auth));
app.use(cookieParser());
app.post(
  "/api/v1/billing/webhook",
  express.raw({ type: "application/json" }),
  billingController.stripeWebhook
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1", indexRoutes);
app.use(notFound);
app.use(globalErrorHandler);
app.get("/", (req, res) => {
  res.send("Hello, TypeScript + Express!");
});

// api/index.ts
var index_default = app;
export {
  index_default as default
};
