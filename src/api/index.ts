import { Router } from "express";
import { productRouter, cartRouter, authRouter, UserRouter } from "./routes";
import { isAuthorized } from "./middlewares";

const apiRouter = Router();

apiRouter.use("/", authRouter);
apiRouter.use("/products", isAuthorized, productRouter);
apiRouter.use("/carts", isAuthorized, cartRouter);
apiRouter.use("/user", isAuthorized, UserRouter);

export default apiRouter;
