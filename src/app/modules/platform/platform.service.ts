import status from "http-status";

import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import { OrganizationStatus } from "../../../generated/prisma/client";
import { IUpdateOrganizationStatusPayload } from "./platform.interface";

const getPlatformDashboard = async () => {
  const [
    totalOrganizations,
    activeOrganizations,
    suspendedOrganizations,
    totalUsers,
    totalShops,
    totalProducts,
    totalSales,
    totalRevenueAggregate,
    recentOrganizations,
  ] = await Promise.all([
    prisma.organization.count({
      where: {
        isDeleted: false,
      },
    }),

    prisma.organization.count({
      where: {
        isDeleted: false,
        status: OrganizationStatus.ACTIVE,
      },
    }),

    prisma.organization.count({
      where: {
        isDeleted: false,
        status: OrganizationStatus.SUSPENDED,
      },
    }),

    prisma.user.count({
      where: {
        isDeleted: false,
      },
    }),

    prisma.shop.count({
      where: {
        isDeleted: false,
      },
    }),

    prisma.product.count({
      where: {
        isDeleted: false,
      },
    }),

    prisma.sale.count(),

    prisma.sale.aggregate({
      _sum: {
        total: true,
      },
    }),

    prisma.organization.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        name: true,
        slug: true,
        email: true,
        phone: true,
        logo: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    summary: {
      totalOrganizations,
      activeOrganizations,
      suspendedOrganizations,
      totalUsers,
      totalShops,
      totalProducts,
      totalSales,
      totalRevenue: Number(totalRevenueAggregate._sum?.total ?? 0),
    },
    recentOrganizations,
  };
};

const getAllOrganizations = async () => {
  const organizations = await prisma.organization.findMany({
    where: {
      isDeleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          members: true,
          shops: true,
          storages: true,
          products: true,
          sales: true,
          subscriptions: true,
        },
      },
    },
  });

  return organizations;
};

const getSingleOrganization = async (organizationId: string) => {
  const organization = await prisma.organization.findFirst({
    where: {
      id: organizationId,
      isDeleted: false,
    },
    include: {
      members: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      shops: {
        where: {
          isDeleted: false,
        },
      },
      storages: {
        where: {
          isDeleted: false,
        },
      },
      products: {
        where: {
          isDeleted: false,
        },
      },
      subscriptions: {
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      },
      paymentTransactions: {
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      },
      _count: {
        select: {
          members: true,
          shops: true,
          storages: true,
          products: true,
          sales: true,
        },
      },
    },
  });

  if (!organization) {
    throw new AppError(status.NOT_FOUND, "Organization not found");
  }

  return organization;
};

const updateOrganizationStatus = async (
  organizationId: string,
  payload: IUpdateOrganizationStatusPayload,
) => {
  const organization = await prisma.organization.findFirst({
    where: {
      id: organizationId,
      isDeleted: false,
    },
  });

  if (!organization) {
    throw new AppError(status.NOT_FOUND, "Organization not found");
  }

  const updateData: {
    status: OrganizationStatus;
    suspendedAt?: Date | null;
  } = {
    status: payload.status as OrganizationStatus,
  };

  if (payload.status === OrganizationStatus.SUSPENDED) {
    updateData.suspendedAt = new Date();
  } else {
    updateData.suspendedAt = null;
  }

  const updatedOrganization = await prisma.organization.update({
    where: {
      id: organizationId,
    },
    data: updateData,
  });

  return updatedOrganization;
};

export const platformService = {
  getPlatformDashboard,
  getAllOrganizations,
  getSingleOrganization,
  updateOrganizationStatus,
};
