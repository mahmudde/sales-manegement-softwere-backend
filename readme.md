Sales Management Software – Backend API

A scalable, production-ready backend for a multi-tenant Sales Management System (POS + SaaS) built with modern technologies.
This system supports organizations, staff management, inventory tracking, sales, billing, and subscription-based access control.

Features

Authentication & Security
JWT + session-based authentication
Email verification system
OTP-based password reset
Role-based access control (RBAC)
Secure cookie handling

Multi-Tenant Architecture
Organization-based data isolation
Multiple roles:
ORG_SUPER_ADMIN
ORG_ADMIN
SHOP_ADMIN
STAFF
Organization member management

Sales Management (POS Core)
Create sales with invoice generation
Inventory deduction on sale
Discount support
Payment methods (cash, card, etc.)
Partial / full payment handling
Due tracking

Payment & Billing (Customer Level)
Record multiple payments per sale
Payment history tracking
Automatic payment status updates:
PAID
PARTIAL
UNPAID

Return & Refund System
Partial and full returns
Inventory restoration
Refund calculation
Payment recalculation after refund

Sale Cancellation / Void
Cancel invalid sales
Restore inventory automatically
Reset payment state
Prevent further actions on cancelled sales

Inventory Management
Stock tracking per shop/storage
Inventory transactions (IN/OUT)
Low stock monitoring

Dashboard Analytics
Sales overview
Daily / monthly analytics
Top selling products
Low stock alerts

Subscription & SaaS Billing
Subscription plans
Organization subscriptions
Payment integration ready (Stripe)
Subscription enforcement middleware

Error Handling
Centralized global error handler
Zod validation with structured error responses
Production-safe error formatting

Tech Stack
Node.js
Express.js
TypeScript
Prisma ORM
PostgreSQL
Zod (validation)
Better Auth (auth/session)
Stripe (billing)
Cloudinary (file upload)

API Response Format

Success:
{
"success": true,
"message": "Success message",
"data": {}
}

Error:
{
"success": false,
"message": "Validation failed",
"errorSources": [
{
"path": "field",
"message": "Error message"
}
]
}

Future Improvements
Audit logging system
Report export (PDF/Excel)
Notification system (email/SMS)
Advanced analytics
Redis caching
Background job queue
