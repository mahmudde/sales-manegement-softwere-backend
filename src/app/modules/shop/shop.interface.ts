export interface ICreateShopPayload {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  image?: string;
}

export interface IUpdateShopPayload {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  image?: string;
}

export interface IUpdateShopStatusPayload {
  status: "ACTIVE" | "INACTIVE";
}
