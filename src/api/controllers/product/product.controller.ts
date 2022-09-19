import type { Request, Response } from "express";
import type { ProductController } from "./product.controller.d";

import { productDAO } from "../../daos";

const productController: ProductController = {
  getAll: async (_req: Request, res: Response): Promise<void> => {
    try {
      const products = await productDAO.getAll();
      res.json({ data: products });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: -1, description: err.message || err });
    }
  },

  getOne: async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.productId;

    try {
      const product = await productDAO.getOneById(productId);
      res.json({ data: product });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: -1, description: err.message || err });
    }
  },

  createOne: async (req: Request, res: Response): Promise<void> => {
    const productToSave = req.body;

    try {
      const newProduct = await productDAO.createOne(productToSave);
      res.json({ data: newProduct });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: -1, description: err.message || err });
    }
  },

  updateOne: async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.productId;
    const productProperties = req.body;

    try {
      const productUpdated = await productDAO.updateOneById(productId, productProperties);
      res.json({ data: productUpdated });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: -1, description: err.message || err });
    }
  },

  deleteOne: async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.productId;

    try {
      await productDAO.deleteOneById(productId);
      res.sendStatus(200);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: -1, description: err.message || err });
    }
  },
};

export default productController;
