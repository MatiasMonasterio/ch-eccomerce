import type { Product, ProductId } from "../domain";
import { api } from "../interceptors";

interface ProductsResponse {
  data: Product[];
}

interface ProductResponse {
  data: Product;
}

export default {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<ProductsResponse>("/api/products");
    const { data: products } = response.data;

    return products;
  },

  getOneById: async (productId: ProductId): Promise<Product> => {
    const response = await api.get<ProductResponse>(`/api/products/${productId}`);
    const { data: product } = response.data;

    return product;
  },
};
