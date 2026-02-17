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

router.get("/", getPayments);
router.get("/:payment_id", validateParams(paymentIdSchema), getPaymentById);
router.post("/", validateBody(createPaymentSchema), createPayment);
router.patch(
  "/:payment_id/status",
  validateParams(paymentIdSchema),
  validateBody(updatePaymentStatusSchema),
  changePaymentStatus,
);

export default router;
