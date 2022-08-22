import type { Request, Response } from "express";

export interface CartController {
  createOne: (req: Request, res: Response) => Promise<void>;
  deleteOne: (req: Request, res: Response) => Promise<void>;
  getProductsByCardId: (req: Request, res: Response) => Promise<void>;
  addProductToCardById: (req: Request, res: Response) => Promise<void>;
  deleteProductByCartId: (req: Request, res: Response) => Promise<void>;
}
