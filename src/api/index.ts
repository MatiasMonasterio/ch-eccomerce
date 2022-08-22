import { Router } from "express";
import { productRouter, cartRouter } from "./routes";

const apiRouter = Router();

apiRouter.use("/products", productRouter);
apiRouter.use("/carts", cartRouter);

export default apiRouter;
