import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const validateBody =
  <T extends z.ZodSchema>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res
        .status(400)
        .json({ error: "Validation error", details: result.error.flatten() });
    }
    (req as Partial<Request["body"]>).body = result.data;
    next();
  };

const validateParams =
  <T extends z.ZodSchema>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success)
      return res
        .status(400)
        .json({ error: "Invalid parameters", details: result.error.flatten() });

    (req as Partial<Request["body"]>).params = result.data;
    next();
  };

export { validateBody, validateParams };
