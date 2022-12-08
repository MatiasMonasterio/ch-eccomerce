import type { IUser } from "../../../domain";
import type { UserEmail } from "../../../domain/user";
// import type { INewUserDTO } from "../../dtos/user";

export interface IUserDAO {
  getOneById: (id: UserId) => Promise<IUser | null>;
  getOneByEmail: (userEmail: UserEmail) => Promise<IUser | null>;
  createOne: (newUser: IUser) => Promise<IUser>;
  //   getOneById: (cartId: CartId) => Promise<ICart | null>;
  //   createOne: (newCart: INewCartDTO) => Promise<ICart>;
  //   updateOneById: (cartId: CartId, cartUpdated: IUpdateCartDTO) => Promise<unknown>;
  //   deleteOneById: (cartId: CartId) => Promise<void>;
}
