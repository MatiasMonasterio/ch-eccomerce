export type ProductId = string;

export interface Product {
  id: ProductId;
  createdAt: number;
  updatedAt: number;
  name: string;
  description: string;
  code: number;
  image: string;
  price: number;
  stock: number;
}
