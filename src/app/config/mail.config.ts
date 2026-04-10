import nodemailer from "nodemailer";

import { envVars } from "./env";

export const mailTransporter = nodemailer.createTransport({
  host: envVars.EMAIL_SENDER_SMTP_HOST,
  port: Number(envVars.EMAIL_SENDER_SMTP_PORT),
  secure: Number(envVars.EMAIL_SENDER_SMTP_PORT) === 465,
  auth: {
    user: envVars.EMAIL_SENDER_SMTP_USER,
    pass: envVars.EMAIL_SENDER_SMTP_PASS,
  },
});
