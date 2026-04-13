import { Request, Response } from "express";
import status from "http-status";

import AppError from "../../errorHelper/AppError";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { saleService } from "./sale.service";

const createSale = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await saleService.createSale(user, req.body);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Sale created successfully",
    data: result,
  });
});

const getAllSales = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await saleService.getAllSales(user, req.query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Sales fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSale = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await saleService.getSingleSale(user, req.params.id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Sale fetched successfully",
    data: result,
  });
});

const addSalePayment = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const { id } = req.params;
  const result = await saleService.addSalePayment(user, id as string, req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Sale payment collected successfully",
    data: result,
  });
});

const getSalePayments = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const { id } = req.params;
  const result = await saleService.getSalePayments(user, id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Sale payment history fetched successfully",
    data: result,
  });
});

const cancelSale = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
  }

  const { id } = req.params;
  const result = await saleService.cancelSale(user, id as string, req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Sale cancelled successfully",
    data: result,
  });
});

export const saleController = {
  createSale,
  addSalePayment,
  getSalePayments,
  getAllSales,
  getSingleSale,
  cancelSale,
};
