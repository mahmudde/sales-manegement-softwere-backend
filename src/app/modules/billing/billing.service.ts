import status from "http-status";

import AppError from "../../errorHelper/AppError";
import { stripe } from "../../config/stripe";
import { envVars } from "../../config/env";
import { IRequestUser } from "../auth/auth.interface";
import { ICreatePaymentIntentPayload } from "./billing.interface";
import { prisma } from "../../lib/prisma";
import {
  PaymentStatus,
  SubscriptionStatus,
} from "../../../generated/prisma/enums";

const createPaymentIntent = async (
  user: IRequestUser,
  payload: ICreatePaymentIntentPayload,
) => {
  const billingPlan = await prisma.billingPlan.findFirst({
    where: {
      id: payload.billingPlanId,
      isActive: true,
    },
  });

  if (!billingPlan) {
    throw new AppError(status.NOT_FOUND, "Billing plan not found");
  }

  const organization = await prisma.organization.findUnique({
    where: {
      id: user.organizationId,
    },
  });

  if (!organization || organization.isDeleted) {
    throw new AppError(status.NOT_FOUND, "Organization not found");
  }

  let subscription = await prisma.organizationSubscription.findFirst({
    where: {
      organizationId: user.organizationId,
      billingPlanId: billingPlan.id,
    },
  });

  if (!subscription) {
    subscription = await prisma.organizationSubscription.create({
      data: {
        organizationId: user.organizationId,
        billingPlanId: billingPlan.id,
        status: SubscriptionStatus.INACTIVE,
      },
    });
  }

  const amount = Math.round(Number(billingPlan.amount) * 100);

  if (amount <= 0) {
    throw new AppError(status.BAD_REQUEST, "Invalid billing amount");
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: billingPlan.currency.toLowerCase(),
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      organizationId: user.organizationId,
      subscriptionId: subscription.id,
      billingPlanId: billingPlan.id,
      createdById: user.userId,
    },
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
      note: `Payment initiated for ${billingPlan.name} plan`,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    paymentTransaction,
    billingPlan,
    publishableKey: envVars.STRIPE_PUBLISHABLE_KEY,
  };
};

const getBillingStatus = async (user: IRequestUser) => {
  const subscription = await prisma.organizationSubscription.findFirst({
    where: {
      organizationId: user.organizationId,
    },
    include: {
      billingPlan: true,
      payments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return subscription;
};

const getBillingHistory = async (user: IRequestUser) => {
  const payments = await prisma.paymentTransaction.findMany({
    where: {
      organizationId: user.organizationId,
    },
    include: {
      subscription: {
        include: {
          billingPlan: true,
        },
      },
      createdBy: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return payments;
};

const handleStripeWebhook = async (rawBody: Buffer, signature: string) => {
  const event = stripe.webhooks.constructEvent(
    rawBody,
    signature,
    envVars.STRIPE_WEBHOOK_SECRET,
  );

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    const paymentTransaction = await prisma.paymentTransaction.findFirst({
      where: {
        stripePaymentIntentId: paymentIntent.id,
      },
      include: {
        subscription: true,
      },
    });

    if (!paymentTransaction) {
      throw new AppError(status.NOT_FOUND, "Payment transaction not found");
    }

    await prisma.$transaction(async (tx) => {
      await tx.paymentTransaction.update({
        where: {
          id: paymentTransaction.id,
        },
        data: {
          status: PaymentStatus.SUCCEEDED,
        },
      });

      if (paymentTransaction.subscriptionId) {
        await tx.organizationSubscription.update({
          where: {
            id: paymentTransaction.subscriptionId,
          },
          data: {
            status: SubscriptionStatus.ACTIVE,
            startsAt: new Date(),
          },
        });
      }
    });
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;

    const paymentTransaction = await prisma.paymentTransaction.findFirst({
      where: {
        stripePaymentIntentId: paymentIntent.id,
      },
    });

    if (paymentTransaction) {
      await prisma.paymentTransaction.update({
        where: {
          id: paymentTransaction.id,
        },
        data: {
          status: PaymentStatus.FAILED,
        },
      });
    }
  }

  return { received: true };
};

export const billingService = {
  createPaymentIntent,
  getBillingStatus,
  getBillingHistory,
  handleStripeWebhook,
};
