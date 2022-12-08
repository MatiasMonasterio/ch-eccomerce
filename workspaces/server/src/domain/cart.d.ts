import type { IEntity, EntityId } from "./entity";
import type { IProduct } from "./product";
import type { IUser } from "./user";

export type CartId = EntityId;

interface ICart extends IEntity {
  id: CartId;
  user: IUser;
  products: IProduct[];
}

export default ICart;
