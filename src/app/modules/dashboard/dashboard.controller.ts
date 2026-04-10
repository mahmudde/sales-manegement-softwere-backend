import { Request, Response } from "express";
import status from "http-status";

import AppError from "../../errorHelper/AppError";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { dashboardService } from "./dashboard.service";

const getDashboardOverview = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await dashboardService.getDashboardOverview(user);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Dashboard overview fetched successfully",
    data: result,
  });
});

const getSalesAnalytics = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const rawPeriod = req.query.period;
  const period = rawPeriod === "monthly" ? "monthly" : "daily";

  const result = await dashboardService.getSalesAnalytics(user, period);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Sales analytics fetched successfully",
    data: result,
  });
});

const getTopSellingProducts = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
      throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
    }

    const result = await dashboardService.getTopSellingProducts(user);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Top selling products fetched successfully",
      data: result,
    });
  },
);

const getLowStockProducts = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await dashboardService.getLowStockProducts(user);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Low stock products fetched successfully",
    data: result,
  });
});

export const dashboardController = {
  getDashboardOverview,
  getSalesAnalytics,
  getTopSellingProducts,
  getLowStockProducts,
};
