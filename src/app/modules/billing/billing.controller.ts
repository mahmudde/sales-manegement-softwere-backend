import { Request, Response } from "express";
import status from "http-status";

import AppError from "../../errorHelper/AppError";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { billingService } from "./billing.service";

const getBillingPlans = catchAsync(async (_req: Request, res: Response) => {
  const result = await billingService.getBillingPlans();

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Subscription plans fetched successfully",
    data: result,
  });
});

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await billingService.createPaymentIntent(user, req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Subscription payment intent created successfully",
    data: result,
  });
});

const getBillingStatus = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await billingService.getBillingStatus(user);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Subscription status fetched successfully",
    data: result,
  });
});

const getBillingHistory = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await billingService.getBillingHistory(user);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Subscription payment history fetched successfully",
    data: result,
  });
});

const stripeWebhook = async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"];

  if (!signature || typeof signature !== "string") {
    throw new AppError(status.BAD_REQUEST, "Stripe signature is missing");
  }

  const result = await billingService.handleStripeWebhook(
    req.body as Buffer,
    signature,
  );

  return res.status(status.OK).json(result);
};

export const billingController = {
  getBillingPlans,
  createPaymentIntent,
  getBillingStatus,
  getBillingHistory,
  stripeWebhook,
};
