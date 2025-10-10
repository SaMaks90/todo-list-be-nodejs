import { Router, Request, Response, NextFunction } from "express";
import { login, refreshToken, registration } from "../../controllers";
import { ILoginBody, IRegistrationBody } from "../../types";
import { authMiddleware } from "../../middleware";

const router: Router = Router();

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: ILoginBody = req.body;
      const token = await login(data);
      res.status(200).json({
        ...token,
      });
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  "/registration",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IRegistrationBody = req.body;
      await registration(data);

      res.status(201).json({ message: "User successfully registered" });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  "/refresh-token",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const token = await refreshToken(userId);
    res.status(200).json({
      ...token,
    });
  },
);

export default router;
