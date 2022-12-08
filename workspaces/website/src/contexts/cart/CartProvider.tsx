import type { Cart, Product } from "../../domain";

import { useState, useEffect } from "react";
import { cartService } from "./services";
import CartContext from "./CartContext";

interface Props {
  children: React.ReactNode;
}

const cartInitialValue: Cart = {
  id: "",
  products: [],
};

export default function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<Cart>(cartInitialValue);

  const addProduct = async (product: Product) => {
    const cartUpdated = await cartService.addProduct(cart.id, product.id);
    setCart(cartUpdated);
  };

  const removeProduct = async (product: Product) => {
    const cartUpdated = await cartService.removeProduct(cart.id, product.id);
    setCart(cartUpdated);
  };

  const deleteCart = async () => {
    await cartService.delete(cart.id);
    setCart(cartInitialValue);

    cartService
      .get()
      .then(setCart)
      .catch((error) => console.error(error));
  };

  const purchase = async () => {
    await cartService.purchase(cart.id);
    await deleteCart();
  };

  useEffect(() => {
    cartService
      .get()
      .then(setCart)
      .catch((error) => console.error(error));
  }, []);

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct, deleteCart, purchase }}>
      {children}
    </CartContext.Provider>
  );
}
