import { Router } from "express";
import { productRouter } from "./routes";

const apiRouter = Router();

apiRouter.use("/products", productRouter);

export default apiRouter;
