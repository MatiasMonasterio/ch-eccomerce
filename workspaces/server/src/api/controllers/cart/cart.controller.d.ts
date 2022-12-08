import type { Request, Response } from "express";

export interface CartController {
  getOne: (req: Request, res: Response) => Promise<void>;
  createOne: (req: Request, res: Response) => Promise<void>;
  deleteOne: (req: Request, res: Response) => Promise<void>;
  getProductsByCardId: (req: Request, res: Response) => Promise<void>;
  addProductToCardById: (req: Request, res: Response) => Promise<void>;
  deleteProductByCartId: (req: Request, res: Response) => Promise<void>;
  generatePurchase: (req: Request, res: Response) => Promise<void>;
}
