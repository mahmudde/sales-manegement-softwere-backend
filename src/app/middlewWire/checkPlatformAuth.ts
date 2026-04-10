import { NextFunction, Request, Response } from "express";
import status from "http-status";

import AppError from "../errorHelper/AppError";
import { prisma } from "../lib/prisma";
import { cookieUtils } from "../utils/cookie";
import { PlatformRole, UserStatus } from "../../generated/prisma/client";

export const checkPlatformAuth =
  (...authRoles: PlatformRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionToken = cookieUtils.getCookie(
        req,
        "better-auth.session_token",
      );

      if (!sessionToken) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! No session token provided",
        );
      }

      const sessionExists = await prisma.session.findFirst({
        where: {
          token: sessionToken,
          expiresAt: {
            gt: new Date(),
          },
        },
        include: {
          user: true,
        },
      });

      if (!sessionExists || !sessionExists.user) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! Invalid or expired session",
        );
      }

      const user = sessionExists.user;

      const now = new Date();
      const expiresAt = new Date(sessionExists.expiresAt);
      const createdAt = new Date(sessionExists.createdAt);

      const sessionLifetime = expiresAt.getTime() - createdAt.getTime();
      const timeRemaining = expiresAt.getTime() - now.getTime();
      const percentRemaining = (timeRemaining / sessionLifetime) * 100;

      if (percentRemaining < 20) {
        res.setHeader("x-session-refresh", "true");
        res.setHeader("x-session-expires-at", expiresAt.toISOString());
        res.setHeader("x-session-time-remaining", timeRemaining.toString());
      }

      if (user.status === UserStatus.INACTIVE) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! User is inactive",
        );
      }

      if (user.status === UserStatus.SUSPENDED) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! User is suspended",
        );
      }

      if (user.isDeleted) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! User is deleted",
        );
      }

      if (!user.platformRole) {
        throw new AppError(
          status.FORBIDDEN,
          "Forbidden access! No platform role found",
        );
      }

      if (authRoles.length > 0 && !authRoles.includes(user.platformRole)) {
        throw new AppError(
          status.FORBIDDEN,
          "Forbidden access! You do not have permission to access this resource",
        );
      }

      req.user = {
        userId: user.id,
        email: user.email,
        role: user.platformRole,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
