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
import {
  staffFilterableFields,
  staffSearchableFields,
  staffSortableFields,
} from "./staff.constant";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { IQueryParams } from "../../interfaces/query.interface";
import { deleteFileFromCloudinary } from "../../config/cloudinary.config";

const createStaff = async (
  user: IRequestUser,
  payload: ICreateStaffPayload,
  file?: Express.Multer.File,
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

  const uploadedFile = file as Express.Multer.File & {
    path?: string;
    secure_url?: string;
  };

  const imageUrl = uploadedFile?.path || uploadedFile?.secure_url || null;

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
          image: imageUrl,
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

const getAllStaff = async (user: IRequestUser, query: IQueryParams) => {
  const queryBuilder = new QueryBuilder(prisma.organizationMember, query, {
    searchableFields: staffSearchableFields,
    filterableFields: staffFilterableFields,
    sortableFields: staffSortableFields,
    defaultSortBy: "createdAt",
    defaultSortOrder: "desc",
    defaultLimit: 10,
    maxLimit: 100,
  });

  const result = await queryBuilder
    .search()
    .filter()
    .sort()
    .paginate()
    .include({
      user: true,
      organization: true,
    })
    .where({
      organizationId: user.organizationId,
      user: {
        isDeleted: false,
      },
    })
    .execute();

  return result;
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
  file?: Express.Multer.File,
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

  const hasAnyUpdateField = Object.keys(payload).length > 0 || !!file;

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

  const uploadedFile = file as Express.Multer.File & {
    path?: string;
    secure_url?: string;
  };

  const imageUrl =
    uploadedFile?.path ||
    uploadedFile?.secure_url ||
    existingStaff.image ||
    undefined;

  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    if (payload.name || payload.phone || file) {
      await tx.user.update({
        where: {
          id: existingStaff.id,
        },
        data: {
          name: payload.name,
          phone: payload.phone,
          image: imageUrl,
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

  if (file && existingStaff.image && existingStaff.image !== imageUrl) {
    await deleteFileFromCloudinary(existingStaff.image);
  }

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
