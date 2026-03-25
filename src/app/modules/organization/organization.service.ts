import status from "http-status";

import AppError from "../../errorHelper/AppError";
import { IRequestUser } from "../auth/auth.interface";
import { IUpdateOrganizationPayload } from "./organization.interface";
import { prisma } from "../../lib/prisma";
import { OrganizationStatus } from "../../../generated/prisma/enums";

const getMyOrganization = async (user: IRequestUser) => {
  const organization = await prisma.organization.findUnique({
    where: {
      id: user.organizationId,
    },
    include: {
      members: {
        where: {
          isActive: true,
        },
        include: {
          user: true,
        },
      },
      shops: {
        where: {
          isDeleted: false,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!organization || organization.isDeleted) {
    throw new AppError(status.NOT_FOUND, "Organization not found");
  }

  if (organization.status === OrganizationStatus.INACTIVE) {
    throw new AppError(status.FORBIDDEN, "Organization is inactive");
  }

  if (organization.status === OrganizationStatus.SUSPENDED) {
    throw new AppError(status.FORBIDDEN, "Organization is suspended");
  }

  return organization;
};

const updateMyOrganization = async (
  user: IRequestUser,
  payload: IUpdateOrganizationPayload,
) => {
  const existingOrganization = await prisma.organization.findUnique({
    where: {
      id: user.organizationId,
    },
  });

  if (!existingOrganization || existingOrganization.isDeleted) {
    throw new AppError(status.NOT_FOUND, "Organization not found");
  }

  if (existingOrganization.status === OrganizationStatus.SUSPENDED) {
    throw new AppError(
      status.FORBIDDEN,
      "Suspended organization cannot be updated",
    );
  }

  const hasAnyUpdateField = Object.keys(payload).length > 0;

  if (!hasAnyUpdateField) {
    throw new AppError(status.BAD_REQUEST, "No update data provided");
  }

  const updatedOrganization = await prisma.organization.update({
    where: {
      id: user.organizationId,
    },
    data: {
      ...payload,
    },
  });

  return updatedOrganization;
};

export const organizationService = {
  getMyOrganization,
  updateMyOrganization,
};
