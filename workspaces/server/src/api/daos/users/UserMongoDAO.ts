import type { IUser } from "../../../domain";
import type { UserEmail, UserId } from "../../../domain/user";
// import type { INewUserDTO } from "../../dtos/user";
import type { IUserDAO } from "./IUsersDAO";

import { MongoContainer } from "../../../containers";

export class UserMongoDAO extends MongoContainer implements IUserDAO {
  constructor() {
    super();
  }

  async getOneById(id: UserId): Promise<IUser | null> {
    return await this.user.findOne({ _id: id });
  }

  async getOneByEmail(userEmail: UserEmail): Promise<IUser | null> {
    return await this.user.findOne({ email: userEmail });
  }

  async createOne(newUser: IUser): Promise<IUser> {
    const user = await this.user.create({
      email: newUser.email,
      password: newUser.password,
      name: newUser.name,
      address: newUser.address,
      age: newUser.age,
      phone: newUser.phone,
      image: newUser.image,
    });

    return {
      id: user._id.toString(),
      email: user.email,
      password: user.password,
      name: user.name,
      address: newUser.address,
      age: user.age,
      phone: user.phone,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isValidPassword: user.isValidPassword,
    };
  }
}
