import { UserId, UserEmail } from "./user";

export type Token = string;

interface IJwt {
  id: UserId;
  email: UserEmail;
}

export default IJwt;
