import { NextFunction, Request, Response } from "express";
import status from "http-status";
import {
  OrgRole,
  OrganizationStatus,
  UserStatus,
} from "../../generated/prisma/client";

import { cookieUtils } from "../utils/cookie";
import AppError from "../errorHelper/AppError";
import { prisma } from "../lib/prisma";

interface ICheckAuthOptions {
  allowWithoutSubscription?: boolean;
}

export const checkAuth =
  (...args: (OrgRole | ICheckAuthOptions)[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authRoles = args.filter(
        (arg): arg is OrgRole => typeof arg === "string",
      );

      const options =
        args.find(
          (arg): arg is ICheckAuthOptions =>
            typeof arg === "object" && arg !== null,
        ) || {};

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
          user: {
            include: {
              organizationMembers: {
                where: {
                  isActive: true,
                },
                include: {
                  organization: true,
                },
                orderBy: {
                  createdAt: "asc",
                },
                take: 1,
              },
            },
          },
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

      const membership = user.organizationMembers[0];

      if (!membership) {
        throw new AppError(
          status.FORBIDDEN,
          "Forbidden access! No active organization membership found",
        );
      }

      const organization = membership.organization;

      if (!organization || organization.isDeleted) {
        throw new AppError(
          status.FORBIDDEN,
          "Forbidden access! Organization not found",
        );
      }

      if (organization.status === OrganizationStatus.INACTIVE) {
        throw new AppError(
          status.FORBIDDEN,
          "Your organization is inactive. Please contact support",
        );
      }

      if (organization.status === OrganizationStatus.SUSPENDED) {
        throw new AppError(
          status.FORBIDDEN,
          "Your organization is suspended. Please contact support",
        );
      }

      if (authRoles.length > 0 && !authRoles.includes(membership.role)) {
        throw new AppError(
          status.FORBIDDEN,
          "Forbidden access! You do not have permission to access this resource",
        );
      }

      if (!options.allowWithoutSubscription) {
        const activeSubscription =
          await prisma.organizationSubscription.findFirst({
            where: {
              organizationId: membership.organizationId,
              status: "ACTIVE",
              startsAt: {
                lte: new Date(),
              },
              endsAt: {
                gte: new Date(),
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          });

        if (!activeSubscription) {
          throw new AppError(
            status.FORBIDDEN,
            "No active subscription found. Please subscribe or renew your plan",
          );
        }
      }

      req.user = {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: membership.role,
        organizationId: membership.organizationId,
        status: user.status,
        isDeleted: user.isDeleted,
        emailVerified: user.emailVerified,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
