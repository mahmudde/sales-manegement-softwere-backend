import { Request, Response } from "express";
import status from "http-status";

import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { platformService } from "./platform.service";

const getPlatformDashboard = catchAsync(async (req: Request, res: Response) => {
  const result = await platformService.getPlatformDashboard();

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Platform dashboard fetched successfully",
    data: result,
  });
});

const getAllOrganizations = catchAsync(async (req: Request, res: Response) => {
  const result = await platformService.getAllOrganizations();

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Organizations fetched successfully",
    data: result,
  });
});

const getSingleOrganization = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await platformService.getSingleOrganization(id as string);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Organization fetched successfully",
      data: result,
    });
  },
);

const updateOrganizationStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    const result = await platformService.updateOrganizationStatus(
      id as string,
      payload,
    );

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Organization status updated successfully",
      data: result,
    });
  },
);

export const platformController = {
  getPlatformDashboard,
  getAllOrganizations,
  getSingleOrganization,
  updateOrganizationStatus,
};
