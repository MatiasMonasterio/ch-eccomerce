import type { ICart } from "../../../domain";
import type { CartId } from "../../../domain/cart";
import type { INewCartDTO, IUpdateCartDTO } from "../../dtos/cart";
import type { ICartsDAO } from "./ICartsDAO";

import { FileContainer } from "../../../containers";

export class CartFileDao extends FileContainer<ICart> implements ICartsDAO {
  constructor() {
    super("cart.json");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getOneByUserId(_userId: string): Promise<ICart | null> {
    const carts = await this.findAll();
    return carts[0];
  }

  async getAll(): Promise<ICart[]> {
    return await this.findAll();
  }

  async getOneById(cartId: CartId): Promise<ICart | null> {
    return await this.findById(cartId);
  }

  async createOne(newCart: INewCartDTO): Promise<ICart> {
    return await this.create(newCart);
  }

  async updateOneById(cartId: CartId, updateCart: IUpdateCartDTO): Promise<ICart> {
    return await this.updateById(cartId, updateCart);
  }

  async deleteOneById(cartId: CartId): Promise<void> {
    await this.deleteById(cartId);
  }
}
