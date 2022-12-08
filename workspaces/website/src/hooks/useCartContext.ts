import { useContext } from "react";
import { CartContext } from "../contexts/cart";

export default function useCartContext() {
  return useContext(CartContext);
}
