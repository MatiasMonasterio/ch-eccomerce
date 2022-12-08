import type { ICart } from "../../../domain";
import type { CartId } from "../../../domain/cart";
import type { INewCartDTO, IUpdateCartDTO } from "../../dtos/cart";
import type { ICartsDAO } from "./ICartsDAO";

import { FirebaseContainer } from "../../../containers";

export class CartsFirebaseDAO extends FirebaseContainer implements ICartsDAO {
  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getOneByUserId(_userId: string): Promise<ICart | null> {
    const { docs: carts } = await this.carts.get();
    return carts[0] as unknown as ICart;
  }

  async getAll(): Promise<ICart[]> {
    const { docs: carts } = await this.carts.get();

    return carts.map((cart) => ({
      id: cart.id,
      ...cart.data(),
    })) as unknown as ICart[];
  }

  async getOneById(cartId: CartId): Promise<ICart | null> {
    const cart = await this.carts.doc(cartId).get();
    if (!cart.data()) return null;

    return { id: cart.id, ...cart.data() } as unknown as ICart;
  }

  async createOne(newCart: INewCartDTO): Promise<ICart> {
    const { id: cartId } = await this.carts.add({
      products: newCart.products,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return (await this.getOneById(cartId)) as ICart;
  }

  async updateOneById(cartId: string, cartUpdated: IUpdateCartDTO): Promise<ICart> {
    await this.carts.doc(cartId).update({
      ...cartUpdated,
      updatedAt: new Date(),
    });

    return (await this.getOneById(cartId)) as ICart;
  }

  async deleteOneById(cartId: string): Promise<void> {
    await this.carts.doc(cartId).delete();
  }
}
