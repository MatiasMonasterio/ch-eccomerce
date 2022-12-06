import { Router } from "express";
import { jwt } from "../../../utilities";
import logger from "../../../logger";

import { userDAO } from "../../daos";
import { userMapper } from "../../mappers";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) throw new Error("invalid token");

    const user = jwt.verify(token);
    const userData = await userDAO.getOneById(user.id);
    if (!userData) throw new Error("user not found");

    res.send({ data: userMapper.toDTO(userData) });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: error });
  }
});

export default userRouter;
