import type { Product, ProductFS, Cart, CartFS } from "../interfaces";
import { Persistence } from "./base";

export const productsFs = new Persistence<Product, ProductFS>("products");
export const cartFs = new Persistence<Cart, CartFS>("cart");
