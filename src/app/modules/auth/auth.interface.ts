import { OrgRole, UserStatus } from "../../../generated/prisma/enums";

export interface IRegisterUserPayload {
  organizationName: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface ILoginUserPayload {
  email: string;
  password: string;
}

export interface IChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface IRequestUser {
  userId: string;
  email: string;
  name: string;
  role: OrgRole;
  organizationId: string;
  status: UserStatus;
  isDeleted: boolean;
  emailVerified: boolean;
}
