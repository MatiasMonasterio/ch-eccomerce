import logger from "../../../logger";
import passport from "../../../passport";
import multer from "../../../multer";
import { Router } from "express";
import { jwt, jwtBlacklist } from "../../../utilities";

import { isAuthorized } from "../../middlewares";

const authRouter = Router();

authRouter.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) throw new Error("login error");

      req.login(user, { session: false }, async (error) => {
        if (error) throw new Error(error);
        const token = jwt.sign({ id: user.id, email: user.email });
        return res.json({ data: token });
      });
    } catch (error) {
      return res.status(500).json({ message: info.message });
    }
  })(req, res, next);
});

authRouter.post("/logout", isAuthorized, (req, res) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) throw new Error("invalid token");
    jwtBlacklist.add(token);
    res.send({ message: "Logout success" });
  } catch (error) {
    const err = error as { message: string };
    logger.error(error);
    res.status(500).send({ message: err.message });
  }
});

authRouter.post("/register", multer.single("image"), async (req, res, next) => {
  passport.authenticate(
    "register",
    { passReqToCallback: true, session: false },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (err, user, _info) => {
      try {
        if (err) throw new Error(err);

        const token = jwt.sign({ id: user.id, email: user.email });
        res.json({ data: token });
      } catch (error) {
        const err = error as { message: string };
        logger.error(error);
        res.status(500).send({ message: err.message });
      }
    }
  )(req, res, next);
});

export default authRouter;
