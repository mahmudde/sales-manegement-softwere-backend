import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { envVars } from "./app/config/env";
import { indexRoutes } from "./app/routes";
import { billingController } from "./app/modules/billing/billing.controller";
import path from "path";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import { notFound } from "./app/middlewWire/notFound";
import { globalErrorHandler } from "./app/middlewWire/globalErrorHandler";

export const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/app/templates`));

app.use(
  cors({
    origin: [
      envVars.FRONTEND_URL,
      envVars.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:5000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api/auth", toNodeHandler(auth));

app.use(cookieParser());

// Stripe webhook
app.post(
  "/api/v1/billing/webhook",
  express.raw({ type: "application/json" }),
  billingController.stripeWebhook,
);

// data parsing
app.use(express.urlencoded({ extended: true }));

//parse JSON bodies
app.use(express.json());

app.use("/api/v1", indexRoutes);

// Basic route
app.get("/", (req: Request, res: Response) => {
  const oauthError = typeof req.query.error === "string" ? req.query.error : "";

  if (oauthError) {
    const rawFrontendUrl =
      envVars.FRONTEND_URL || "https://sales-manegement-softwere-frontend.vercel.app";

    try {
      const normalizedBase = rawFrontendUrl.startsWith("http")
        ? rawFrontendUrl
        : `https://${rawFrontendUrl}`;
      const redirectUrl = new URL("/login", normalizedBase);
      redirectUrl.searchParams.set("error", oauthError);
      return res.redirect(302, redirectUrl.toString());
    } catch {
      const fallbackUrl = new URL(
        "/login",
        "https://sales-manegement-softwere-frontend.vercel.app",
      );
      fallbackUrl.searchParams.set("error", oauthError);
      return res.redirect(302, fallbackUrl.toString());
    }
  }

  res.send("Hello, TypeScript + Express!");
});

app.use(notFound);
app.use(globalErrorHandler);
