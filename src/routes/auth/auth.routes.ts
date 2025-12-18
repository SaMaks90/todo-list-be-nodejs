import { Router } from "express";
import { authMiddleware, validateBody } from "../../middleware";
import * as authController from "../../controllers/auth/auth.controller";
import {
  loginSchema,
  registrationSchema,
  updateProfileSchema,
} from "../../validation/auth.schema";

const router: Router = Router();

router.post("/login", validateBody(loginSchema), authController.login);
router.post(
  "/registration",
  validateBody(registrationSchema),
  authController.registration,
);
router.get("/refresh-token", authMiddleware, authController.refreshToken);
router.get("/profile", authMiddleware, authController.getProfile);
router.patch(
  "/profile",
  validateBody(updateProfileSchema),
  authMiddleware,
  authController.updateProfile,
);
router.delete("/profile", authMiddleware, authController.deleteProfile);

export default router;
