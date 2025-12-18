import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const validateBody =
  <T extends z.ZodType<any>>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res
        .status(400)
        .json({ error: "Validation error", details: result.error.flatten() });
    }
    (req as any).body = result.data;
    next();
  };

export default validateBody;
