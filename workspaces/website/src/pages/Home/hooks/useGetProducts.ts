import type { Product } from "../../../domain";

import { useState, useEffect } from "react";
import { productsService } from "../services";

export default function useGetProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productsService
      .getAll()
      .then(setProducts)
      .catch((error) => console.error(error));
  }, []);

  return products;
}
