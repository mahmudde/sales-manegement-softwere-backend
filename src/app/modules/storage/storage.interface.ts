import { StorageStatus } from "../../../generated/prisma/enums";

export interface ICreateStoragePayload {
  shopId: string;
  name: string;
  description?: string;
}

export interface IUpdateStoragePayload {
  shopId?: string;
  name?: string;
  description?: string;
}

export interface IUpdateStorageStatusPayload {
  status: StorageStatus;
}
