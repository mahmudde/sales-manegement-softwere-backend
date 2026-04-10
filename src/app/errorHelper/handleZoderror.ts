import status from "http-status";
import z from "zod";
import { TErrorResponse, TerrorSources } from "../interfaces/error.interface";

export const handleZodError = (err: z.ZodError): TErrorResponse => {
  const statusCode = status.BAD_REQUEST;
  const message = "Validation failed";

  const errorSources: TerrorSources[] = err.issues.map((issue) => ({
    path:
      issue.path.length > 0 ? issue.path.map(String).join(" => ") : "unknown",
    message: issue.message,
  }));

  return {
    success: false,
    message,
    errorSources,
    statusCode,
  };
};
