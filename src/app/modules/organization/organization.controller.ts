import { Request, Response } from "express";
import status from "http-status";

import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import AppError from "../../errorHelper/AppError";
import { organizationService } from "./organization.service";

const getMyOrganization = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await organizationService.getMyOrganization(user);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Organization fetched successfully",
    data: result,
  });
});

const updateMyOrganization = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const payload = req.body;
  const result = await organizationService.updateMyOrganization(user, payload);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Organization updated successfully",
    data: result,
  });
});

export const organizationController = {
  getMyOrganization,
  updateMyOrganization,
};
