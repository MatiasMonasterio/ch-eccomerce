import type { IUser } from "../../../domain";
import type { UserPassword } from "../../../domain/user";
// import type { IEntity } from "../../../domain/entity";

// export interface IUpdateCartDTO extends Partial<INewCartDTO> {}
export interface INewUserDTO extends Omit<IUser, keyof IEntity> {}
export interface IUserDTO extends Omit<IUser, UserPassword> {}
