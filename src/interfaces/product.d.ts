export interface Product {
  name: string;
  description: string;
  code: number;
  image: string;
  price: number;
  stock: number;
}

export interface ProductFS extends Product {
  id: string;
  createdAt: number;
  updatedAt: number;
}
