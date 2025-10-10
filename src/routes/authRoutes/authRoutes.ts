import { Router, Request, Response } from "express";

const router: Router = Router();

router.post("/login", (req: Request, res: Response) => {
  res.status(200).json({
    message: "login",
  });
});

router.post("/register", (req: Request, res: Response) => {
  res.status(201).json({
    message: "register",
  });
});

router.post("/refresh", (req: Request, res: Response) => {
  res.status(200).json({
    message: "refresh",
  });
});

export default router;
