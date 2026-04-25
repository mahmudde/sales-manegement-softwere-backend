import { CookieOptions, Request, Response } from "express";
import { envVars } from "../config/env";

const cookieSecure = envVars.NODE_ENV === "production";

const defaultOptions: CookieOptions = {
  httpOnly: true,
  secure: cookieSecure,
  sameSite: cookieSecure ? "none" : "lax",
  path: "/",
};

const setCookie = (
  res: Response,
  key: string,
  value: string,
  options?: CookieOptions,
) => {
  res.cookie(key, value, {
    ...defaultOptions,
    ...options,
  });
};

const getCookie = (req: Request, key: string) => {
  return req.cookies[key];
};

const clearCookie = (res: Response, key: string) => {
  res.clearCookie(key, defaultOptions);
};

export const cookieUtils = {
  setCookie,
  getCookie,
  clearCookie,
};
