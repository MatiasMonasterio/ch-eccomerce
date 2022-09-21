import type { IProduct } from "../../../domain";
import type { ProductId } from "../../../domain/product";
import type { INewProductDTO, IUpdateProductDTO } from "../../dtos/product";
import type { IProductDAO } from "./IProductDAO";

import { FirebaseContainer } from "../../../containers";

export class ProductFirebaseDAO extends FirebaseContainer implements IProductDAO {
  constructor() {
    super();
  }

  async getAll(): Promise<IProduct[]> {
    const { docs: products } = await this.products.get();

    return products.map((product) => ({
      id: product.id,
      ...product.data(),
    })) as unknown as IProduct[];
  }

  async getOneById(productId: ProductId): Promise<IProduct | null> {
    const product = await this.products.doc(productId).get();
    if (!product.data()) return null;

    return { id: product.id, ...product.data() } as unknown as IProduct;
  }

  async createOne(newProduct: INewProductDTO): Promise<IProduct> {
    const { id: productId } = await this.products.add({
      name: newProduct.name,
      description: newProduct.description,
      code: newProduct.code,
      image: newProduct.image,
      price: newProduct.price,
      stock: newProduct.stock,
    });

    return (await this.getOneById(productId)) as IProduct;
  }

  async updateOneById(productId: ProductId, productUpdated: IUpdateProductDTO): Promise<IProduct> {
    await this.products.doc(productId).update({ ...productUpdated });
    return (await this.getOneById(productId)) as IProduct;
  }

  async deleteOneById(productId: ProductId): Promise<void> {
    await this.products.doc(productId).delete();
  }
}
