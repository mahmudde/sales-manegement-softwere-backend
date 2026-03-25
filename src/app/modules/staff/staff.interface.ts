import { OrgRole, UserStatus } from "../../../generated/prisma/enums";

export interface ICreateStaffPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  shopId: string;
  role: OrgRole;
}

export interface IUpdateStaffPayload {
  name?: string;
  phone?: string;
  image?: string;
  shopId?: string;
  role?: OrgRole;
}

export interface IUpdateStaffStatusPayload {
  status: UserStatus;
}
