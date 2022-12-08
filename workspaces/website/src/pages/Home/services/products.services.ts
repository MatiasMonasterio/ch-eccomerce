import type { Product } from "../../../domain";

import { api } from "../../../interceptors";

interface ProductsResponse {
  data: Product[];
}

export default {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<ProductsResponse>("/api/products");
    const { data: products } = response.data;

    return products;
  },
};
