import type { ICart } from "../../../domain";
import type { CartId } from "../../../domain/cart";
import type { INewCartDTO, IUpdateCartDTO } from "../../dtos/cart";
import type { ICartsDAO } from "./ICartsDAO";

import { FirebaseContainer } from "../../../containers";

export class CartsFirebaseDAO extends FirebaseContainer implements ICartsDAO {
  constructor() {
    super();
  }

  async getAll(): Promise<ICart[]> {
    const { docs: carts } = await this.carts.get();

    return carts.map((cart) => ({
      id: cart.id,
      ...cart.data(),
    })) as unknown as ICart[];
  }

  async getOneById(cartId: CartId): Promise<ICart> {
    const cart = await this.carts.doc(cartId).get();
    return { id: cart.id, ...cart.data() } as unknown as ICart;
  }

  async createOne(newCart: INewCartDTO): Promise<ICart> {
    const { id: cartId } = await this.carts.add({
      products: newCart.products,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.getOneById(cartId);
  }

  async updateOneById(cartId: string, cartUpdated: IUpdateCartDTO): Promise<ICart> {
    await this.carts.doc(cartId).update({
      ...cartUpdated,
      updatedAt: new Date(),
    });

    return await this.getOneById(cartId);
  }

  async deleteOneById(cartId: string): Promise<void> {
    await this.carts.doc(cartId).delete();
  }
}
