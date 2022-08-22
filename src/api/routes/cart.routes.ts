import { Router } from "express";
import { cartController } from "../controllers";

const cartRouter = Router();

cartRouter.post("/", cartController.createOne);
cartRouter.delete("/:cartId", cartController.deleteOne);
cartRouter.get("/:cartId/products", cartController.getProductsByCardId);
cartRouter.post("/:cartId/products", cartController.addProductToCardById);
cartRouter.delete("/:cartId/products/:productId", cartController.deleteProductByCartId);

export default cartRouter;
