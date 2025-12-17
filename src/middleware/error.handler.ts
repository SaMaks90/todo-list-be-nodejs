import { NextFunction, Request, Response } from "express";

interface IError {
  message: string;
  status: number;
}

export const errorHandler = (
  err: IError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);
  const { message = "Internal server error", status = 404 } = err;
  res.status(status).json({ error: message });
};
