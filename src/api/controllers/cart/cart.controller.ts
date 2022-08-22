import type { Request, Response } from "express";
import type { CartController } from "./cart.controller.d";

import { cartFs, productsFs } from "../../../persistence-fs";

const cartController: CartController = {
  createOne: async (_req: Request, res: Response): Promise<void> => {
    try {
      const newCart = await cartFs.create({ products: [] });
      res.json({ data: newCart.id });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: -1, description: err.message || err });
    }
  },

  deleteOne: async (req: Request, res: Response): Promise<void> => {
    const cartId = req.params.cartId;

    try {
      await cartFs.deleteById(cartId);
      res.sendStatus(200);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: -1, description: err.message || err });
    }
  },

  getProductsByCardId: async (req: Request, res: Response): Promise<void> => {
    const cartId = req.params.cartId;

    try {
      const cart = await cartFs.getOneById(cartId);
      res.send({ data: cart.products });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: -1, description: err.message || err });
    }
  },

  addProductToCardById: async (req: Request, res: Response): Promise<void> => {
    const cartId = req.params.cartId;
    const productId = req.body.productId;

    try {
      const cart = await cartFs.getOneById(cartId);
      const product = await productsFs.getOneById(productId);

      cart.products.push(product);
      await cartFs.updateById(cartId, { products: cart.products });

      res.sendStatus(200);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: -1, description: err.message || err });
    }
  },

  deleteProductByCartId: async (req: Request, res: Response): Promise<void> => {
    const { cartId, productId } = req.params;

    try {
      const { products } = await cartFs.getOneById(cartId);
      const productIndex = products.findIndex((product) => product.id === productId);
      if (productIndex === -1) throw new Error("Product not found on cart");

      products.splice(productIndex, 1);
      await cartFs.updateById(cartId, { products: products });

      res.sendStatus(200);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: -1, description: err.message || err });
    }
  },
};

export default cartController;
