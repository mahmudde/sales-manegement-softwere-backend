import { SalePaymentMethod } from "../../../generated/prisma/client";

export interface ICreateSaleItemPayload {
  productId: string;
  quantity: number;
}

export interface ICreateSalePayload {
  shopId: string;
  storageId: string;
  paymentMethod: SalePaymentMethod;
  discount?: number;
  note?: string;
  paidAmount?: number;
  items: ICreateSaleItemPayload[];
}

export interface IAddSalePaymentPayload {
  amount: number;
  paymentMethod: SalePaymentMethod;
  note?: string;
}

export interface ICreateSaleReturnItemPayload {
  saleItemId: string;
  quantity: number;
}

export interface ICreateSaleReturnPayload {
  storageId: string;
  note?: string;
  items: ICreateSaleReturnItemPayload[];
}

export interface ICancelSalePayload {
  note?: string;
}
