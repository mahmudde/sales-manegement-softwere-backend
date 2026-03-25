import status from "http-status";

import AppError from "../../errorHelper/AppError";
import { auth } from "../../lib/auth";
import { tokenUtils } from "../../utils/token";
import { jwtUtils } from "../../utils/jwt";
import { envVars } from "../../config/env";
import {
  IChangePasswordPayload,
  ILoginUserPayload,
  IRegisterUserPayload,
  IRequestUser,
} from "./auth.interface";
import { prisma } from "../../lib/prisma";
import { OrgRole, UserStatus } from "../../../generated/prisma/enums";
import { Prisma } from "../../../generated/prisma/browser";

const generateSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const generateUniqueOrganizationSlug = async (organizationName: string) => {
  const baseSlug = generateSlug(organizationName) || "organization";
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingOrganization = await prisma.organization.findUnique({
      where: {
        slug,
      },
    });

    if (!existingOrganization) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

const buildJwtPayload = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
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
  });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (user.status === UserStatus.INACTIVE) {
    throw new AppError(status.FORBIDDEN, "User is inactive");
  }

  if (user.status === UserStatus.SUSPENDED) {
    throw new AppError(status.FORBIDDEN, "User is suspended");
  }

  if (user.isDeleted) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const membership = user.organizationMembers[0];

  if (!membership) {
    throw new AppError(
      status.FORBIDDEN,
      "No active organization membership found",
    );
  }

  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: membership.role,
    organizationId: membership.organizationId,
    status: user.status,
    isDeleted: user.isDeleted,
    emailVerified: user.emailVerified,
  };
};

const registerUser = async (payload: IRegisterUserPayload) => {
  const { organizationName, name, email, password, phone } = payload;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new AppError(status.CONFLICT, "User already exists with this email");
  }

  const slug = await generateUniqueOrganizationSlug(organizationName);

  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  if (!data?.user) {
    throw new AppError(status.BAD_REQUEST, "Failed to register user");
  }

  try {
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const organization = await tx.organization.create({
        data: {
          name: organizationName,
          slug,
        },
      });

      await tx.organizationMember.create({
        data: {
          organizationId: organization.id,
          userId: data.user.id,
          role: OrgRole.ORG_SUPER_ADMIN,
        },
      });

      if (phone) {
        await tx.user.update({
          where: {
            id: data.user.id,
          },
          data: {
            phone,
          },
        });
      }
    });

    const jwtPayload = await buildJwtPayload(data.user.id);

    const accessToken = tokenUtils.getAccessToken(jwtPayload);
    const refreshToken = tokenUtils.getRefreshToken(jwtPayload);

    return {
      ...data,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    await prisma.user
      .delete({
        where: {
          id: data.user.id,
        },
      })
      .catch(() => {});

    throw error;
  }
};

const loginUser = async (payload: ILoginUserPayload) => {
  const { email, password } = payload;

  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (!data?.user) {
    throw new AppError(status.BAD_REQUEST, "Failed to login user");
  }

  const jwtPayload = await buildJwtPayload(data.user.id);

  const accessToken = tokenUtils.getAccessToken(jwtPayload);
  const refreshToken = tokenUtils.getRefreshToken(jwtPayload);

  return {
    ...data,
    accessToken,
    refreshToken,
  };
};

const getMe = async (user: IRequestUser) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
    include: {
      organizationMembers: {
        where: {
          isActive: true,
        },
        include: {
          organization: true,
        },
      },
      shopAssignments: {
        where: {
          isActive: true,
        },
        include: {
          shop: true,
        },
      },
    },
  });

  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  return isUserExist;
};

const getNewToken = async (refreshToken: string, sessionToken: string) => {
  const isSessionTokenExists = await prisma.session.findUnique({
    where: {
      token: sessionToken,
    },
    include: {
      user: true,
    },
  });

  if (!isSessionTokenExists) {
    throw new AppError(status.BAD_REQUEST, "Invalid session token");
  }

  if (isSessionTokenExists.expiresAt < new Date()) {
    throw new AppError(status.UNAUTHORIZED, "Session expired");
  }

  const verifiedRefreshToken = jwtUtils.verifyToken(
    refreshToken,
    envVars.REFRESH_TOKEN_SECRET,
  );

  if (!verifiedRefreshToken.success || !verifiedRefreshToken.data) {
    throw new AppError(status.UNAUTHORIZED, "Invalid refresh token");
  }

  const data = verifiedRefreshToken.data;

  const jwtPayload = await buildJwtPayload(data.userId);

  const newAccessToken = tokenUtils.getAccessToken(jwtPayload);
  const newRefreshToken = tokenUtils.getRefreshToken(jwtPayload);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    sessionToken,
  };
};

const changePassword = async (
  payload: IChangePasswordPayload,
  sessionToken: string,
) => {
  if (!sessionToken) {
    throw new AppError(status.UNAUTHORIZED, "Session token is missing");
  }

  const session = await auth.api.getSession({
    headers: new Headers({
      cookie: `better-auth.session_token=${sessionToken}`,
    }),
  });

  if (!session?.user) {
    throw new AppError(status.UNAUTHORIZED, "Invalid session token");
  }

  const { currentPassword, newPassword } = payload;

  const result = await auth.api.changePassword({
    body: {
      currentPassword,
      newPassword,
      revokeOtherSessions: false,
    },
    headers: new Headers({
      cookie: `better-auth.session_token=${sessionToken}`,
    }),
  });

  const jwtPayload = await buildJwtPayload(session.user.id);

  const accessToken = tokenUtils.getAccessToken(jwtPayload);
  const refreshToken = tokenUtils.getRefreshToken(jwtPayload);

  return {
    ...result,
    accessToken,
    refreshToken,
    token: sessionToken,
  };
};

const logOutUser = async (sessionToken: string) => {
  if (!sessionToken) {
    throw new AppError(status.UNAUTHORIZED, "Session token is missing");
  }

  const result = await auth.api.signOut({
    headers: new Headers({
      cookie: `better-auth.session_token=${sessionToken}`,
    }),
  });

  return result;
};

export const authService = {
  registerUser,
  loginUser,
  getMe,
  getNewToken,
  changePassword,
  logOutUser,
};
