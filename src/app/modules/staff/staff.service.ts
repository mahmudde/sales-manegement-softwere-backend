import status from "http-status";

import AppError from "../../errorHelper/AppError";
import { auth } from "../../lib/auth";
import { IRequestUser } from "../auth/auth.interface";
import {
  ICreateStaffPayload,
  IUpdateStaffPayload,
  IUpdateStaffStatusPayload,
} from "./staff.interface";
import { OrgRole, UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { Prisma } from "../../../generated/prisma/client";

const createStaff = async (
  user: IRequestUser,
  payload: ICreateStaffPayload,
) => {
  const { name, email, password, phone, shopId, role } = payload;

  if (role === OrgRole.ORG_SUPER_ADMIN) {
    throw new AppError(
      status.BAD_REQUEST,
      "ORG_SUPER_ADMIN cannot be assigned from this endpoint",
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new AppError(status.CONFLICT, "User already exists with this email");
  }

  const shop = await prisma.shop.findFirst({
    where: {
      id: shopId,
      organizationId: user.organizationId,
      isDeleted: false,
    },
  });

  if (!shop) {
    throw new AppError(status.NOT_FOUND, "Shop not found");
  }

  const authData = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  if (!authData?.user) {
    throw new AppError(status.BAD_REQUEST, "Failed to create staff user");
  }

  try {
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.organizationMember.create({
        data: {
          organizationId: user.organizationId,
          userId: authData.user.id,
          role,
        },
      });

      await tx.shopAssignment.create({
        data: {
          organizationId: user.organizationId,
          shopId,
          userId: authData.user.id,
        },
      });

      await tx.user.update({
        where: {
          id: authData.user.id,
        },
        data: {
          phone,
        },
      });
    });

    const createdStaff = await prisma.user.findUnique({
      where: {
        id: authData.user.id,
      },
      include: {
        organizationMembers: {
          include: {
            organization: true,
          },
        },
        shopAssignments: {
          include: {
            shop: true,
          },
        },
      },
    });

    return createdStaff;
  } catch (error) {
    await prisma.user
      .delete({
        where: {
          id: authData.user.id,
        },
      })
      .catch(() => {});

    throw error;
  }
};

const getAllStaff = async (user: IRequestUser) => {
  const staffs = await prisma.organizationMember.findMany({
    where: {
      organizationId: user.organizationId,
      user: {
        isDeleted: false,
      },
    },
    include: {
      user: true,
      organization: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return staffs;
};

const getSingleStaff = async (user: IRequestUser, staffId: string) => {
  const staff = await prisma.user.findFirst({
    where: {
      id: staffId,
      isDeleted: false,
      organizationMembers: {
        some: {
          organizationId: user.organizationId,
        },
      },
    },
    include: {
      organizationMembers: {
        include: {
          organization: true,
        },
      },
      shopAssignments: {
        where: {
          organizationId: user.organizationId,
          isActive: true,
        },
        include: {
          shop: true,
        },
      },
    },
  });

  if (!staff) {
    throw new AppError(status.NOT_FOUND, "Staff not found");
  }

  return staff;
};

const updateStaff = async (
  user: IRequestUser,
  staffId: string,
  payload: IUpdateStaffPayload,
) => {
  const existingStaff = await prisma.user.findFirst({
    where: {
      id: staffId,
      isDeleted: false,
      organizationMembers: {
        some: {
          organizationId: user.organizationId,
        },
      },
    },
    include: {
      organizationMembers: true,
      shopAssignments: {
        where: {
          organizationId: user.organizationId,
          isActive: true,
        },
      },
    },
  });

  if (!existingStaff) {
    throw new AppError(status.NOT_FOUND, "Staff not found");
  }

  const hasAnyUpdateField = Object.keys(payload).length > 0;

  if (!hasAnyUpdateField) {
    throw new AppError(status.BAD_REQUEST, "No update data provided");
  }

  if (payload.shopId) {
    const shop = await prisma.shop.findFirst({
      where: {
        id: payload.shopId,
        organizationId: user.organizationId,
        isDeleted: false,
      },
    });

    if (!shop) {
      throw new AppError(status.NOT_FOUND, "Shop not found");
    }
  }

  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    if (payload.name || payload.phone || payload.image) {
      await tx.user.update({
        where: {
          id: existingStaff.id,
        },
        data: {
          name: payload.name,
          phone: payload.phone,
          image: payload.image,
        },
      });
    }

    if (payload.role) {
      await tx.organizationMember.updateMany({
        where: {
          userId: existingStaff.id,
          organizationId: user.organizationId,
        },
        data: {
          role: payload.role,
        },
      });
    }

    if (payload.shopId) {
      await tx.shopAssignment.updateMany({
        where: {
          userId: existingStaff.id,
          organizationId: user.organizationId,
        },
        data: {
          isActive: false,
        },
      });

      await tx.shopAssignment.create({
        data: {
          organizationId: user.organizationId,
          shopId: payload.shopId,
          userId: existingStaff.id,
        },
      });
    }
  });

  const updatedStaff = await prisma.user.findUnique({
    where: {
      id: existingStaff.id,
    },
    include: {
      organizationMembers: {
        include: {
          organization: true,
        },
      },
      shopAssignments: {
        where: {
          organizationId: user.organizationId,
          isActive: true,
        },
        include: {
          shop: true,
        },
      },
    },
  });

  return updatedStaff;
};

const updateStaffStatus = async (
  user: IRequestUser,
  staffId: string,
  payload: IUpdateStaffStatusPayload,
) => {
  const existingStaff = await prisma.user.findFirst({
    where: {
      id: staffId,
      isDeleted: false,
      organizationMembers: {
        some: {
          organizationId: user.organizationId,
        },
      },
    },
  });

  if (!existingStaff) {
    throw new AppError(status.NOT_FOUND, "Staff not found");
  }

  const updatedStaff = await prisma.user.update({
    where: {
      id: existingStaff.id,
    },
    data: {
      status: payload.status as UserStatus,
    },
  });

  return updatedStaff;
};

export const staffService = {
  createStaff,
  getAllStaff,
  getSingleStaff,
  updateStaff,
  updateStaffStatus,
};
