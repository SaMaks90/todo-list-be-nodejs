import { Router } from "express";
import { authMiddleware, validateBody } from "../../middleware";
import * as authController from "../../controllers/auth/auth.controller";
import {
  loginSchema,
  registrationSchema,
  updateProfileSchema,
} from "../../validation/auth.schema";

const router: Router = Router();

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Login user
 *    tags: [Auth]
 *    description: Authenticate user and generate JWT token.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginRequest'
 *    responses:
 *      200:
 *        description: User logged in successfully.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *      400:
 *        description: Invalid request body.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorValidation'
 *      401:
 *        description: Invalid credentials.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      404:
 *        description: User not found.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
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
