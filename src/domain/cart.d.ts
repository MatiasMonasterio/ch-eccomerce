import type { IEntity, EntityId } from "./entity";
import type { IProduct } from "./product";

export type CartId = EntityId;

interface ICart extends IEntity {
  id: CartId;
  products: IProduct[];
}

export default ICart;
