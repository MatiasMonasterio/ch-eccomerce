import { Router } from "express";

import { productController } from "../../controllers";
import { isAdmin } from "../../middlewares";

const productRouter = Router();

productRouter.get("/", productController.getAll);
productRouter.get("/:productId", productController.getOne);
productRouter.post("/", isAdmin, productController.createOne);
productRouter.put("/:productId", isAdmin, productController.updateOne);
productRouter.delete("/:productId", isAdmin, productController.deleteOne);

export default productRouter;
