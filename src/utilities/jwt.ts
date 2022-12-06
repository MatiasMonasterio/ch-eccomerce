import type { IUser, IJwt } from "../domain";
import type { Token } from "../domain/jwt";

import jsonwebtoken from "jsonwebtoken";
import jwtConfig from "../config/jsonwebtoken";

interface Jwt {
  sign: (payload: IJwt) => Token;
  signUser: (user: IUser) => Token;
  verify: (token: Token) => IJwt;
}

const jwt: Jwt = {
  sign: (payload: IJwt): Token => {
    return jsonwebtoken.sign(payload, jwtConfig.secret);
  },

  signUser: (user: IUser): Token => {
    const { id, name } = user;
    return jsonwebtoken.sign({ id, name }, jwtConfig.secret);
  },

  verify: (token: string): IJwt => {
    return jsonwebtoken.verify(token, jwtConfig.secret) as IJwt;
  },
};

export default jwt;
