import { InventoryTransactionType } from "../../../generated/prisma/enums";

export interface IStockInPayload {
  shopId: string;
  storageId: string;
  productId: string;
  quantity: number;
  lowStockThreshold?: number;
  note?: string;
}

export interface IStockOutPayload {
  shopId: string;
  storageId: string;
  productId: string;
  quantity: number;
  note?: string;
}

export interface IGetInventoryQuery {
  shopId?: string;
  storageId?: string;
  productId?: string;
}

export interface IGetInventoryTransactionsQuery {
  shopId?: string;
  storageId?: string;
  productId?: string;
  type?: InventoryTransactionType;
}
