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

app.get("/auth/google/start", (req: Request, res: Response) => {
  const callbackURL =
    typeof req.query.callbackURL === "string" && req.query.callbackURL
      ? req.query.callbackURL
      : `${envVars.FRONTEND_URL}/dashboard`;

  const errorCallbackURL =
    typeof req.query.errorCallbackURL === "string" && req.query.errorCallbackURL
      ? req.query.errorCallbackURL
      : `${envVars.FRONTEND_URL}/login`;

  const html = `<!doctype html>
<html>
  <head><meta charset="utf-8"><title>Redirecting to Google</title></head>
  <body>
    <script>
      (async function () {
        try {
          const response = await fetch("/api/auth/sign-in/social", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              provider: "google",
              callbackURL: ${JSON.stringify(callbackURL)},
              errorCallbackURL: ${JSON.stringify(errorCallbackURL)}
            })
          });
          const data = await response.json();
          if (!response.ok || !data.url) {
            window.location.href = ${JSON.stringify(`${envVars.FRONTEND_URL}/login`)};
            return;
          }
          window.location.href = data.url;
        } catch (err) {
          window.location.href = ${JSON.stringify(`${envVars.FRONTEND_URL}/login`)};
        }
      })();
    </script>
  </body>
</html>`;

  res.status(200).type("html").send(html);
});

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
