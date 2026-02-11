import { z } from "zod";
import { PaymentStatus, Currency } from "../types/";

export const paymentIdSchema = z.object({
  payment_id: z.string().uuid(),
});

export const createPaymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.enum(Currency),
  idempotency_key: z.string(),
  description: z.string().optional(),
  status: z.enum(PaymentStatus),
});

export const updatePaymentStatusSchema = z.object({
  status: z.enum(PaymentStatus),
});
