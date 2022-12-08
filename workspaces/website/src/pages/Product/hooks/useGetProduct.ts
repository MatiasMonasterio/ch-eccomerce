import type { Product, ProductId } from "../../../domain";

import { useState, useEffect } from "react";
import { productService } from "../../../services";

export default function useGetProducts(productId: ProductId | undefined) {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (!productId) return;

    productService
      .getOneById(productId)
      .then(setProduct)
      .catch((error) => console.error(error));
  }, [productId]);

  return product;
}
