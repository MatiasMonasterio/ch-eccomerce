import { Router } from "express";
import { cartController } from "../../controllers";

const cartRouter = Router();

cartRouter.get("/", cartController.getOne);
cartRouter.post("/", cartController.createOne);
cartRouter.delete("/:cartId", cartController.deleteOne);
cartRouter.get("/:cartId/products", cartController.getProductsByCardId);
cartRouter.put("/:cartId/products", cartController.addProductToCardById);
cartRouter.put("/:cartId/products/:productId", cartController.deleteProductByCartId);
cartRouter.post("/purchase/:cartId", cartController.generatePurchase);

export default cartRouter;
