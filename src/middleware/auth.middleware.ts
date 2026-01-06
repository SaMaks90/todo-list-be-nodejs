import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { env } from "../config/env";

interface IJwtPayload {
  userId: string;
}

const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Invalid authorization header");
      (error as any).status = 401;
      return next(error);
    }

    const token: string = authHeader.split(" ")[1];
    if (!token || token.trim().length === 0) {
      const error = new Error("Invalid token");
      (error as any).status = 401;
      return next(error);
    }

    const secretKey: string = env.SECRET_KEY || "secret";
    const decodedToken = verify(token, secretKey) as IJwtPayload;

    if (!decodedToken.userId) {
      const error = new Error("Invalid token payload");
      (error as any).status = 401;
      return next(error);
    }

    req.user = { id: decodedToken.userId };
    next();
  } catch (e) {
    const error = new Error("Invalid token");
    (error as any).status = 401;
    next(error);
  }
};

export default authMiddleware;
