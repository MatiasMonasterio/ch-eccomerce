import type { IEntity, EntityId } from "./entity";

export type ProductId = EntityId;
export type ProductName = string;
export type ProductDescription = string;
export type ProductCode = number;
export type ProductImage = string;
export type ProductPrice = number;
export type ProductStock = number;

interface IProduct extends IEntity {
  id: ProductId;
  name: ProductName;
  description: ProductDescription;
  code: ProductCode;
  image: ProductImage;
  price: ProductPrice;
  stock: ProductStock;
}

export default IProduct;
