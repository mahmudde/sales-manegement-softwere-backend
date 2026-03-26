import { Response } from "express";

type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type TResponse<T> = {
  httpStatusCode: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: TMeta;
};

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const responseData: {
    success: boolean;
    message: string;
    meta?: TMeta;
    data?: T;
  } = {
    success: data.success,
    message: data.message,
  };

  if (data.meta) {
    responseData.meta = data.meta;
  }

  if (data.data !== undefined) {
    responseData.data = data.data;
  }

  return res.status(data.httpStatusCode).json(responseData);
};
