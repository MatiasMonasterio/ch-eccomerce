import type { IProduct } from "../../../domain";
import type { ProductId } from "../../../domain/product";
import type { INewProductDTO, IUpdateProductDTO } from "../../dtos/product";
import type { IProductDAO } from "./IProductDAO";

import { FileContainer } from "../../../containers";

export class ProductFileDAO extends FileContainer<IProduct> implements IProductDAO {
  constructor() {
    super("products.json");
  }

  async getAll(): Promise<IProduct[]> {
    return await this.findAll();
  }

  async getOneById(productId: ProductId): Promise<IProduct | null> {
    return await this.findById(productId);
  }

  async createOne(newProduct: INewProductDTO): Promise<IProduct> {
    return await this.create(newProduct);
  }

  async updateOneById(productId: ProductId, productUpdate: IUpdateProductDTO): Promise<unknown> {
    return this.updateById(productId, productUpdate);
  }

  async deleteOneById(productId: ProductId): Promise<void> {
    await this.deleteById(productId);
  }
}
