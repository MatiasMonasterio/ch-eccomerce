import { Product } from "./product";

export type CartId = string;

interface Cart {
  id: CartId;
  products: Product[];
}
