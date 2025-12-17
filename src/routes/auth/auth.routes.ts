import { Router } from "express";
import { authMiddleware } from "../../middleware";
import * as authController from "../../controllers/auth/auth.controller";

const router: Router = Router();

router.post("/login", authController.login);
router.post("/registration", authController.registration);
router.get("/refresh-token", authMiddleware, authController.refreshToken);
router.get("/profile", authMiddleware, authController.getProfile);
router.patch("/profile", authMiddleware, authController.updateProfile);
router.delete("/profile", authMiddleware, authController.deleteProfile);

export default router;
