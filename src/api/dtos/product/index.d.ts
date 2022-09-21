import type { IProduct } from "../../../domain";
import type { IEntity } from "../../../domain/entity";

export interface INewProductDTO extends Omit<IProduct, keyof IEntity> {}
export interface IUpdateProductDTO extends Partial<NewProductDTO> {}
