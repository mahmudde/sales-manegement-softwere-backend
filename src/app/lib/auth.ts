import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";

import { prisma } from "./prisma";
import { envVars } from "../config/env";
import { UserStatus } from "../../generated/prisma/enums";
import { sendEmail } from "../utils/sendEmail";

export const auth = betterAuth({
  baseURL: envVars.BETTER_AUTH_URL,
  secret: envVars.BETTER_AUTH_SECRET,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  trustedOrigins: ["http://localhost:3000", "http://localhost:5000"],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
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
          verificationUrl: url,
        },
      });
    },
  },

  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        required: false,
        defaultValue: UserStatus.ACTIVE,
      },
    },
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
          where: { email },
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
            expiryMinutes: 10,
          },
        });
      },
    }),
  ],
});
