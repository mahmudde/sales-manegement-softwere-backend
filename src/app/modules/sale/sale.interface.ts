import { SalePaymentMethod } from "../../../generated/prisma/enums";

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
  items: ICreateSaleItemPayload[];
}
