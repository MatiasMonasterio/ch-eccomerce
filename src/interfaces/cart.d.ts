import { ProductFs } from "./product";

export interface Cart {
  products: ProductFs[];
}

export interface CartFS extends Cart {
  id: string;
  createdAt: number;
  updatedAt: number;
}
