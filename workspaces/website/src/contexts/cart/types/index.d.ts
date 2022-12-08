import type { Cart, Product } from "../../../domain";

export interface CartContext {
  cart: Cart;
  addProduct: (product: Product) => Promise<void>;
  removeProduct: (Product: Product) => Promise<void>;
  deleteCart: () => Promise<void>;
  purchase: () => Promise<void>;
}
