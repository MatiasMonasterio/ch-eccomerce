import type { ICart } from "../../domain";
import type { IEntity } from "../../../domain/entity";

export interface INewCartDTO extends Omit<ICart, keyof IEntity> {}
export interface IUpdateCartDTO extends Partial<NewProductDTO> {}
