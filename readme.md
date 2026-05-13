# M ITSales Backend

Express, TypeScript, Prisma, PostgreSQL, Better Auth, Stripe, and Cloudinary backend for a multi-tenant sales management and open agency platform.

## What This Backend Supports

- Organization, shop, staff, category, product, storage, inventory, sales, billing, and platform-admin modules.
- Role-based access for `PLATFORM_SUPER_ADMIN`, `ORG_SUPER_ADMIN`, `ORG_ADMIN`, `SHOP_ADMIN`, and `STAFF`.
- Public customer interaction APIs for the agency-facing website:
  - `POST /api/v1/contact`
  - `POST /api/v1/demo-requests`
  - `POST /api/v1/newsletter`
  - `POST /api/v1/support-tickets`
- Admin customer management APIs:
  - `GET /api/v1/contact-messages`
  - `GET /api/v1/demo-requests`
  - `GET /api/v1/support-tickets`
- Sales workflow with partial payments, payment history, cancellation, and sale returns.
- Inventory restoration on sale return and cancellation.

## Local Setup

```bash
npm install
cp .env.example .env
npm run generate
npm run migrate
npm run seed
npm run seed:platform-admin
npm run dev
```

The API runs at `http://localhost:5000` by default.

## Demo Credentials

These are the review credentials expected by the frontend demo login buttons.

```txt
Platform Admin
Email: platformadmin@gmail.com
Password: 12345678

Organization Admin
Email: admin@mitsales.demo
Password: 12345678

Staff
Email: staff@mitsales.demo
Password: 12345678
```

Create matching organization admin and staff accounts through your seed data or dashboard before final deployment.

## Important Notes

- The Prisma generator output is configured to `src/generated/prisma`.
- Run migrations before using customer interaction or sale return features.
- Google/Facebook OAuth buttons are visible in the frontend, but real OAuth requires provider keys in the backend auth configuration.
- Full repo TypeScript currently reports older category/dashboard/staff type issues that predate the agency conversion work. New customer interaction and sale-return files have been checked with targeted scans.

## GitHub

Backend repository:
https://github.com/mahmudde/sales-manegement-softwere-backend.git
