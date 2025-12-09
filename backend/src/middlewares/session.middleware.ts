import { NextFunction, Response } from "express";

import type { SessionRequest } from "@/types";

export const sessionMiddleware = (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  next();
};
