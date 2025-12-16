import { Router, Request, Response, NextFunction } from "express";
import {
  login,
  refreshToken,
  registration,
  getUserById,
  updateUser,
} from "../../models";
import { ILoginBody, IProfileUser, IRegistrationBody } from "../../types";
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: userId } = req.user;
      const token: { token: string } = await refreshToken(userId);
      res.status(200).json({
        ...token,
      });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  "/profile",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: userId } = req.user;
      const user: IProfileUser = await getUserById(userId);
      res.status(200).json({
        ...user,
      });
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  "/profile",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: userId } = req.user;
      const data: { email?: string; username?: string } = req.body;
      let profileData: IProfileUser = await getUserById(userId);
      const updatingProfileData = {
        ...profileData,
        ...data,
        updated_at: new Date(),
      };
      await updateUser(userId, updatingProfileData);
      profileData = await getUserById(userId);

      res.status(200).json({ ...profileData });
    } catch (e) {
      next(e);
    }
  },
);

export default router;
