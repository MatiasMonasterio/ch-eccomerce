import type { IEntity, EntityId } from "./entity";

export type UserId = EntityId;
export type UserEmail = string;
export type UserPassword = string;
export type UserName = string;
export type UserAddress = string;
export type UserAge = number;
export type UserPhone = string;
export type UserImage = string;

interface IUser extends IEntity {
  id: UserId;
  email: UserEmail;
  password: UserPassword;
  name: UserName;
  address: UserAddress;
  age: UserAge;
  phone: UserPhone;
  image: UserImage;
  isValidPassword: (password: UserPassword) => Promise<boolean>;
}

export default IUser;
