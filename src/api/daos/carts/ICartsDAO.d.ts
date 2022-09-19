import type { ICart } from "../../../domain";
import type { CartId } from "../../../domain/cart";
import type { INewCartDTO, IUpdateCartDTO } from "../../dtos/cart";

export interface ICartsDAO {
  getAll: () => Promise<ICart[]>;
  getOneById: (cartId: CartId) => Promise<ICart | null>;
  createOne: (newCart: INewCartDTO) => Promise<ICart>;
  updateOneById: (cartId: CartId, cartUpdated: IUpdateCartDTO) => Promise<unknown>;
  deleteOneById: (cartId: CartId) => Promise<void>;
}
