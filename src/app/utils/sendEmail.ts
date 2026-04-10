import path from "path";
import ejs from "ejs";
import status from "http-status";

import { mailTransporter } from "../config/mail.config";
import { envVars } from "../config/env";
import AppError from "../errorHelper/AppError";

interface ISendEmailOptions {
  to: string;
  subject: string;
  templateName: string;
  templateData: Record<string, unknown>;
}

export const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
}: ISendEmailOptions) => {
  try {
    const templatePath = path.join(
      process.cwd(),
      "src",
      "emails",
      "layouts",
      `${templateName}.ejs`,
    );

    console.log("Using template path:", templatePath);

    const html = await ejs.renderFile(templatePath, {
      ...templateData,
      appName: "Sales Management Software",
      frontendUrl: envVars.FRONTEND_URL,
      currentYear: new Date().getFullYear(),
    });

    const info = await mailTransporter.sendMail({
      from: envVars.EMAIL_SENDER_SMTP_FROM,
      to,
      subject,
      html,
    });

    return info;
  } catch (error) {
    console.log("Email sending error:", error);

    throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to send email");
  }
};
