import type { ICart } from "../../../domain";
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
      products: cart.products,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    }));
  }

  async getOneById(cartId: string): Promise<ICart | null> {
    const cart = await this.cart.findById(cartId);

    return cart
      ? {
          id: cart._id.toString(),
          products: cart.products,
          createdAt: cart.createdAt,
          updatedAt: cart.updatedAt,
        }
      : null;
  }

  async createOne(newCart: INewCartDTO): Promise<ICart> {
    const cart = await this.cart.create({
      products: newCart.products,
    });

    return {
      id: cart._id.toString(),
      products: cart.products,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    };
  }

  async updateOneById(cartId: CartId, cartUpdated: IUpdateCartDTO): Promise<unknown> {
    return await this.cart.updateOne({ _id: cartId }, { ...cartUpdated });
  }

  async deleteOneById(cartId: CartId): Promise<void> {
    await this.cart.deleteOne({ _id: cartId });
  }
}
