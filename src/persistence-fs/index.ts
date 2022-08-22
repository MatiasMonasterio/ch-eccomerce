import type { Product, ProductFS } from "../interfaces";
import { Persistence } from "./base";

export const productsFs = new Persistence<Product, ProductFS>("products");
