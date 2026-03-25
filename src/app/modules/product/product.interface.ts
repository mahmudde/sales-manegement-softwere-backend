import { ProductStatus } from "../../../generated/prisma/enums";

export interface ICreateProductPayload {
  name: string;
  categoryId: string;
  sku: string;
  description?: string;
  image?: string;
  price: number;
}

export interface IUpdateProductPayload {
  name?: string;
  categoryId?: string;
  sku?: string;
  description?: string;
  image?: string;
  price?: number;
}

export interface IUpdateProductStatusPayload {
  status: ProductStatus;
}
