import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "@repo/backend-common/config";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token =
    req.headers["authorization"] || req.headers["Authorization"] || "";

  // decode token
  // how can structure the req object in express global d ts

  // return the user object into req obejct
}
