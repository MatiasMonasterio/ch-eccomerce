import type { IProduct } from "../../../domain";
import type { ProductId } from "../../../domain/product";
import type { INewProductDTO, IUpdateProductDTO } from "../../dtos/product";
import type { IProductDAO } from "./IProductDAO";

import { MongoContainer } from "../../../containers";

export class ProductMongoDAO extends MongoContainer implements IProductDAO {
  async getAll(): Promise<IProduct[]> {
    const products = await this.product.find();

    return products.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      code: product.code,
      image: product.image,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));
  }

  async getOneById(productId: ProductId): Promise<IProduct | null> {
    const product = await this.product.findById(productId);

    return product
      ? {
          id: product._id.toString(),
          name: product.name,
          description: product.description,
          code: product.code,
          image: product.image,
          price: product.price,
          stock: product.stock,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        }
      : null;
  }

  async createOne(newProduct: INewProductDTO): Promise<IProduct> {
    const product = await this.product.create({
      name: newProduct.name,
      description: newProduct.description,
      code: newProduct.code,
      image: newProduct.image,
      price: newProduct.price,
      stock: newProduct.stock,
    });

    return {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      code: product.code,
      image: product.image,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  async updateOneById(productId: ProductId, productUpdate: IUpdateProductDTO): Promise<IProduct> {
    await this.product.updateOne({ _id: productId }, { ...productUpdate });

    const productUpdated = await this.getOneById(productId);
    if (!productUpdated) throw new Error("Product not found");

    return productUpdated;
  }

  async deleteOneById(productId: ProductId): Promise<void> {
    await this.product.deleteOne({ _id: productId });
  }
}
