import { NextFunction, Request, Response } from "express";
import status from "http-status";
import z from "zod";

import { envVars } from "../config/env";
import { TErrorResponse, TerrorSources } from "../interfaces/error.interface";
import { handleZodError } from "../errorHelper/handleZoderror";
import AppError from "../errorHelper/AppError";

export const globalErrorHandler = async (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (envVars.NODE_ENV === "development") {
    console.error(err);
  }

  let errorSources: TerrorSources[] = [];
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message = "Internal Server Error";

  if (err instanceof z.ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode ?? status.BAD_REQUEST;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  const errorResponse: TErrorResponse = {
    success: false,
    message,
    errorSources,
    error:
      envVars.NODE_ENV === "development"
        ? err instanceof Error
          ? {
              name: err.name,
              message: err.message,
              stack: err.stack,
            }
          : err
        : undefined,
  };

  return res.status(statusCode).json(errorResponse);
};
