import type { Request, Response, NextFunction } from "express";

export default function isAdmin(req: Request, res: Response, next: NextFunction) {
  const IS_ADMIN = true;

  if (IS_ADMIN) return next();

  const errorDescription = `${req.path} method ${req.method} not authorized`;
  res.status(403).json({ error: -1, description: errorDescription });
}
