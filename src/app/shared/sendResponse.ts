import { Response } from "express";

interface IResponse<T> {
  httpStatusCode: number;
  success: boolean;
  message: string;
  data?: T;
}

export const sendResponse = <T>(res: Response, response: IResponse<T>) => {
  const { httpStatusCode, success, message, data } = response;
  res.status(httpStatusCode).json({
    success,
    message,
    data,
  });
};
