import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { toNodeHandler } from "better-auth/node";

import { envVars } from "./app/config/env";
import { indexRoutes } from "./app/routes";
import { billingController } from "./app/modules/billing/billing.controller";
import { auth } from "./app/lib/auth";
import { notFound } from "./app/middlewWire/notFound";
import { globalErrorHandler } from "./app/middlewWire/globalErrorHandler";

export const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), "src/app/templates"));

const allowedOrigins =
  envVars.NODE_ENV === "production"
    ? [envVars.FRONTEND_URL, envVars.BETTER_AUTH_URL]
    : [
        envVars.FRONTEND_URL,
        envVars.BETTER_AUTH_URL,
        "http://localhost:3000",
        "http://localhost:5000",
      ];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  }),
);

app.use(cookieParser());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Sales Management Backend API is running",
  });
});

app.use("/api/auth", toNodeHandler(auth));

app.post(
  "/api/v1/billing/webhook",
  express.raw({ type: "application/json" }),
  billingController.stripeWebhook,
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", indexRoutes);

app.use(notFound);
app.use(globalErrorHandler);
