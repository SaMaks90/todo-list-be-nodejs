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
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.post("/login", validateBody(loginSchema), authController.login);

/**
 * @swagger
 * /api/auth/registration:
 *  post:
 *    summary: Register a new user
 *    tags: [Auth]
 *    description: Create a new user account.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RegisterRequest'
 *    responses:
 *      201:
 *        description: User registered successfully.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterResponse'
 *      409:
 *        $ref: '#/components/responses/AlreadyExistsError'
 */
router.post(
  "/registration",
  validateBody(registrationSchema),
  authController.registration,
);

/**
 * @swagger
 * /api/auth/refresh-token:
 *  get:
 *    summary: Refresh JWT token
 *    tags: [Auth]
 *    description: Generate a new JWT token using the refresh token.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: JWT token refreshed successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token: { type: string }
 *                example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/refresh-token", authMiddleware, authController.refreshToken);

/**
 * @swagger
 * /api/auth/profile:
 *  get:
 *    summary: Get user profile
 *    tags: [Auth]
 *    description: Retrieve the profile information of the authenticated user.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProfileResponse'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/profile", authMiddleware, authController.getProfile);

/**
 * @swagger
 * /api/auth/profile:
 *  patch:
 *    summary: Update user profile
 *    tags: [Auth]
 *    description: Update the profile information of the authenticated user.
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ProfileUpdateRequest'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProfileResponse'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/ValidationError'
 */
router.patch(
  "/profile",
  validateBody(updateProfileSchema),
  authMiddleware,
  authController.updateProfile,
);

/**
 * @swagger
 * /api/auth/profile:
 *  delete:
 *    summary: Delete user profile
 *    tags: [Auth]
 *    description: Delete the profile information of the authenticated user.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message: { type: string }
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.delete("/profile", authMiddleware, authController.deleteProfile);

export default router;
