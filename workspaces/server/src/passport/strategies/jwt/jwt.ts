import type { StrategyOptions } from "passport-jwt";

import { Strategy, ExtractJwt } from "passport-jwt";
import jwtConfig from "../../../config/jsonwebtoken";
import { userDAO } from "../../../api/daos";

const opt: StrategyOptions = {
  secretOrKey: jwtConfig.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const JWTStrategy = new Strategy(opt, async (token, done) => {
  try {
    const jwtUser = token;
    const user = await userDAO.getOneById(jwtUser.id);

    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    done(error);
  }
});

export default JWTStrategy;
