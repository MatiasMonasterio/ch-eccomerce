import type { ICart, IProduct } from "../../../domain";
import type { CartId } from "../../../domain/cart";
import type { INewCartDTO, IUpdateCartDTO } from "../../dtos/cart";
import type { ICartsDAO } from "./ICartsDAO";

import { MongoContainer } from "../../../containers";

export class CartsMongoDAO extends MongoContainer implements ICartsDAO {
  constructor() {
    super();
  }

  async getAll(): Promise<ICart[]> {
    const carts = await this.cart.find();
    return carts.map((cart) => ({
      id: cart._id.toString(),
      user: cart.user,
      products: cart.products.map((product) => ({
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        code: product.code,
        image: product.image,
        price: product.price,
        stock: product.stock,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      })),
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    }));
  }

  async getOneByUserId(userId: string): Promise<ICart | null> {
    const carts = await this.cart.find();
    if (!carts.length) return null;

    const validsCarts = carts.filter((cart) => cart.user._id.toString() === userId);

    return validsCarts.length
      ? {
          id: validsCarts[0]._id.toString(),
          user: validsCarts[0].user,
          products: validsCarts[0].products.map((product) => ({
            id: product._id.toString(),
            name: product.name,
            description: product.description,
            code: product.code,
            image: product.image,
            price: product.price,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
          })),
          createdAt: validsCarts[0].createdAt,
          updatedAt: validsCarts[0].updatedAt,
        }
      : null;
  }

  async getOneById(cartId: string): Promise<ICart | null> {
    const cart = await this.cart.findById(cartId);

    return cart
      ? {
          id: cart._id.toString(),
          user: cart.user,
          products: cart.products.map((product) => ({
            id: product._id.toString(),
            name: product.name,
            description: product.description,
            code: product.code,
            image: product.image,
            price: product.price,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
          })),
          createdAt: cart.createdAt,
          updatedAt: cart.updatedAt,
        }
      : null;
  }

  async createOne(newCart: INewCartDTO): Promise<ICart> {
    const cart = await this.cart.create({ ...newCart });

    return {
      id: cart._id.toString(),
      user: cart.user,
      products: cart.products,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    };
  }

  async updateOneById(cartId: CartId, cartUpdated: IUpdateCartDTO): Promise<unknown> {
    if (cartUpdated.products) {
      cartUpdated.products = cartUpdated.products.map((product: IProduct) => ({
        ...product,
        _id: product.id,
      }));
    }

    return await this.cart.updateOne({ _id: cartId }, { ...cartUpdated });
  }

  async deleteOneById(cartId: CartId): Promise<void> {
    await this.cart.deleteOne({ _id: cartId });
  }
}
