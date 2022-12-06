import type { Request, Response, NextFunction } from "express";
import passport from "../../passport";
import { jwtBlacklist } from "../../utilities";

export default function isAuthorized(req: Request, res: Response, next: NextFunction) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  passport.authenticate("jwt", { session: false }, (_err, user, _info) => {
    const token = (req.headers.authorization && req.headers.authorization.split(" ")[1]) || "";

    if (!user || jwtBlacklist.exist(token)) res.status(403).send({ message: "Unauthorized" });
    else next();
  })(req, res, next);
}
