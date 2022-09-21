import type { Request, Response } from "express";
import type { CartController } from "./cart.controller.d";

import { cartDAO, productDAO } from "../../daos";

const cartController: CartController = {
  createOne: async (_req: Request, res: Response): Promise<void> => {
    try {
      const newCart = await cartDAO.createOne({ products: [] });
      res.json({ data: newCart.id });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: -1, description: err.message || err });
    }
  },

  deleteOne: async (req: Request, res: Response): Promise<void> => {
    const cartId = req.params.cartId;

    try {
      await cartDAO.deleteOneById(cartId);
      res.sendStatus(200);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: -1, description: err.message || err });
    }
  },

  getProductsByCardId: async (req: Request, res: Response): Promise<void> => {
    const cartId = req.params.cartId;

    try {
      const cart = await cartDAO.getOneById(cartId);
      if (!cart) throw new Error("Cart not found");

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
      const cart = await cartDAO.getOneById(cartId);
      if (!cart) throw new Error("Cart not found");

      const productExist = cart.products.find((product) => product.id === productId);
      if (productExist) throw new Error("Product already exist");

      const product = await productDAO.getOneById(productId);
      if (!product) throw new Error("Product not found");

      cart.products.push(product);
      await cartDAO.updateOneById(cartId, { products: cart.products });

      res.sendStatus(200);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: -1, description: err.message || err });
    }
  },

  deleteProductByCartId: async (req: Request, res: Response): Promise<void> => {
    const { cartId, productId } = req.params;

    try {
      const cart = await cartDAO.getOneById(cartId);
      if (!cart) throw new Error("Cart not found");
      const { products } = cart;

      const productIndex = products.findIndex((product) => product.id === productId);
      if (productIndex === -1) throw new Error("Product not found on cart");

      products.splice(productIndex, 1);
      await cartDAO.updateOneById(cartId, { products: products });

      res.sendStatus(200);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: -1, description: err.message || err });
    }
  },
};

export default cartController;
