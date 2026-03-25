import { Request, Response } from "express";
import status from "http-status";

import AppError from "../../errorHelper/AppError";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { storageService } from "./storage.service";

const createStorage = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await storageService.createStorage(user, req.body);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Storage created successfully",
    data: result,
  });
});

const getAllStorages = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await storageService.getAllStorages(user);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Storages fetched successfully",
    data: result,
  });
});

const getSingleStorage = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await storageService.getSingleStorage(
    user,
    req.params.id as string,
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Storage fetched successfully",
    data: result,
  });
});

const updateStorage = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await storageService.updateStorage(
    user,
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Storage updated successfully",
    data: result,
  });
});

const updateStorageStatus = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await storageService.updateStorageStatus(
    user,
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Storage status updated successfully",
    data: result,
  });
});

export const storageController = {
  createStorage,
  getAllStorages,
  getSingleStorage,
  updateStorage,
  updateStorageStatus,
};
