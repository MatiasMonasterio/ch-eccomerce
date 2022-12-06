import { Strategy } from "passport-local";

import logger from "../../../logger";
import nodemailer from "../../../nodemailer";
import { userDAO } from "../../../api/daos";

const login = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (_req, email, password, done) => {
    try {
      const user = await userDAO.getOneByEmail(email);
      if (!user) return done(null, false, { message: "User not found" });

      const isValidPassword = await user.isValidPassword(password);
      if (!isValidPassword) return done(null, false, { message: "Invalid email or password" });

      return done(null, user);
    } catch (error) {
      logger.error(error);
      return done(error);
    }
  }
);

const register = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (req, _email, _password, done) => {
    try {
      const userImage = req?.file?.filename || "";
      const user = await userDAO.createOne({ ...req.body, image: userImage });

      nodemailer.newUserRegister(user);
      return done(null, user);
    } catch (error) {
      logger.error(error);
      console.error(error);
      return done(error);
    }
  }
);

export default { login, register };
