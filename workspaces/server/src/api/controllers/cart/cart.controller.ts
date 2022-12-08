import type { Request, Response } from "express";
import type { CartController } from "./cart.controller.d";

import nodemailer from "../../../nodemailer";
import * as twilio from "../../../twilio";
import { jwt } from "../../../utilities";
import { cartDAO, productDAO, userDAO } from "../../daos";

const cartController: CartController = {
  getOne: async (req: Request, res: Response): Promise<void> => {
    const token = (req.headers.authorization && req.headers.authorization.split(" ")[1]) || "";
    const jwtUser = jwt.verify(token);

    try {
      const cart = await cartDAO.getOneByUserId(jwtUser.id);

      if (cart) {
        res.json({ data: cart });
        return;
      }

      const user = await userDAO.getOneById(jwtUser.id);
      const newCart = await cartDAO.createOne({ products: [], user });

      res.json({ data: newCart });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: -1, description: err.message || err });
    }
  },

  createOne: async (req: Request, res: Response): Promise<void> => {
    const token = (req.headers.authorization && req.headers.authorization.split(" ")[1]) || "";
    const jwtUser = jwt.verify(token);

    try {
      const user = await userDAO.getOneById(jwtUser.id);
      const newCart = await cartDAO.createOne({ products: [], user });
      res.json({ data: newCart });
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

      res.json({ data: cart });
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

      res.json({ data: cart });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: -1, description: err.message || err });
    }
  },

  generatePurchase: async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    const { cartId } = req.params;

    try {
      if (!token) throw new Error("invalid token");
      const tokenDecode = jwt.verify(token);

      const cart = await cartDAO.getOneById(cartId);
      if (!cart) throw new Error("Cart not found");

      const user = await userDAO.getOneById(tokenDecode.id);
      if (!user) throw new Error("User not found");

      res.send({ data: "Ok" });

      nodemailer.purchase(cart, user);
      twilio.whatsapp.purchase(user);
      twilio.whatsapp.userPurchase(user);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: -1, description: err.message || err });
    }
  },
};

export default cartController;
