import { Request, Response } from "express";
import status from "http-status";

import AppError from "../../errorHelper/AppError";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { inventoryService } from "./inventory.service";

const stockIn = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await inventoryService.stockIn(user, req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Stock added successfully",
    data: result,
  });
});

const stockOut = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await inventoryService.stockOut(user, req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Stock removed successfully",
    data: result,
  });
});

const getAllInventory = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await inventoryService.getAllInventory(user, req.query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Inventories fetched successfully",
    data: result,
    meta: result.meta,
  });
});

const getSingleInventory = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await inventoryService.getSingleInventory(
    user,
    req.params.id as string,
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Inventory fetched successfully",
    data: result,
  });
});

const getInventoryTransactions = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
      throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
    }

    const result = await inventoryService.getInventoryTransactions(
      user,
      req.query,
    );

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Inventory transactions fetched successfully",
      data: result,
      meta: result.meta,
    });
  },
);

export const inventoryController = {
  stockIn,
  stockOut,
  getAllInventory,
  getSingleInventory,
  getInventoryTransactions,
};
