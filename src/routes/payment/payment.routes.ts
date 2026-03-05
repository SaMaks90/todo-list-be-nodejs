import { Router } from "express";
import { validateParams, validateBody } from "../../middleware";
import {
  paymentIdSchema,
  updatePaymentStatusSchema,
  createPaymentSchema,
} from "../../validation/payment.schema";
import {
  getPaymentById,
  getPayments,
  changePaymentStatus,
  createPayment,
} from "../../controllers/payment/payment.controllers";

const router: Router = Router();

/**
 * @swagger
 * /api/payments:
 *  get:
 *    summary: Get all payments
 *    tags: [Payments]
 *    description: Retrieve a list of all payments by user.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/PaymentResponse'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/", getPayments);

/**
 * @swagger
 * /api/payments/{payment_id}:
 *  get:
 *    summary: Get payment by ID
 *    tags: [Payments]
 *    description: Retrieve a payment by its ID.
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - $ref: '#/components/parameters/PaymentId'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PaymentResponse'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.get("/:payment_id", validateParams(paymentIdSchema), getPaymentById);

/**
 * @swagger
 * /api/payments:
 *  post:
 *    summary: Create a new payment
 *    tags: [Payments]
 *    description: Create a new payment for a user.
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PaymentRequest'
 *    responses:
 *      201:
 *        description: Payment created successfully.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PaymentResponse'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      409:
 *        $ref: '#/components/responses/AlreadyExistsError'
 */
router.post("/", validateBody(createPaymentSchema), createPayment);

/**
 * @swagger
 * /api/payments/{payment_id}/status:
 *  patch:
 *    summary: Change payment status
 *    tags: [Payments]
 *    description: Change the status of a payment.
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PaymentUpdateStatusRequest'
 *    parameters:
 *      - $ref: '#/components/parameters/PaymentId'
 *    responses:
 *      200:
 *        $ref: '#/components/schemas/PaymentResponse'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '$/components/responses/NotFoundError'
 */
router.patch(
  "/:payment_id/status",
  validateParams(paymentIdSchema),
  validateBody(updatePaymentStatusSchema),
  changePaymentStatus,
);

export default router;
