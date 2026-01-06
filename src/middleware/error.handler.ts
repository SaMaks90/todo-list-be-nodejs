import { NextFunction, Request, Response } from "express";

interface IError {
  message: string;
  status: number;
}

const errorHandler = (
  err: IError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { message = "Internal server error", status = 404 } = err;
  res.status(status).json({ error: message });
};

export default errorHandler;
