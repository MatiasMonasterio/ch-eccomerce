import type { Token } from "../../../types";
import type { User } from "../../../domain";

export interface UserContext {
  user: User;
  login: (token: Token) => void;
  logout: () => void;
}
