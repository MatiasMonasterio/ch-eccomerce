import { Product } from "./product";
import { User } from "./user";

export type CartId = string;

interface Cart {
  id: CartId;
  user: User;
  products: Product[];
}
