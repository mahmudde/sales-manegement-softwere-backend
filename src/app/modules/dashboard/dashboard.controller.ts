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

export const dashboardController = {
  getDashboardOverview,
};
