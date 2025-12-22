import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

interface IJwtPayload {
  userId: string;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid authorization header" });
  }

  const token: string = authHeader.split(" ")[1];
  const secretKey: string = process.env.SECRET_KEY || "secret";
  const decodedToken = verify(token, secretKey) as IJwtPayload;
  req.user = { id: decodedToken.userId };
  next();
};

export default authMiddleware;
