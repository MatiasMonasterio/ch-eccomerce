import type { IProduct } from "../../../domain";
import type { ProductId } from "../../../domain/product";
import type { INewProductDTO, IUpdateProductDTO } from "../../dtos/product";

export interface IProductDAO {
  getAll: () => Promise<IProduct[]>;
  getOneById: (productId: ProductId) => Promise<IProduct | null>;
  createOne: (newProduct: INewProductDTO) => Promise<IProduct>;
  updateOneById: (productId: ProductId, productUpdate: IUpdateProductDTO) => Promise<unknown>;
  deleteOneById: (productId: ProductId) => Promise<void>;
}
