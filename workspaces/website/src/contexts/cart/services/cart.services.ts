import type { Cart, ProductId, CartId } from "../../../domain";
import { api } from "../../../interceptors";

interface CartResponse {
  data: Cart;
}

export default {
  get: async (): Promise<Cart> => {
    const response = await api.get<CartResponse>("/api/carts");
    const { data: cart } = response.data;

    return cart;
  },

  addProduct: async (cartId: CartId, productId: ProductId): Promise<Cart> => {
    const response = await api.put<CartResponse>(`/api/carts/${cartId}/products`, { productId });
    const { data: cart } = response.data;

    console.log({ cart });

    return cart;
  },

  removeProduct: async (cartId: CartId, productId: ProductId): Promise<Cart> => {
    const response = await api.put<CartResponse>(`/api/carts/${cartId}/products/${productId}`);
    const { data: cart } = response.data;

    return cart;
  },

  delete: async (cartId: CartId): Promise<void> => {
    await api.delete(`/api/carts/${cartId}`);
  },

  purchase: async (cartId: CartId): Promise<void> => {
    await api.post(`/api/carts/purchase/${cartId}`);
  },
};
