import { PaymentStatus, Currency } from "../../../types";

export const paymentResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string", example: "7c9e1488-f038-4734-b149-d31a0127feaf" },
    user_id: {
      type: "string",
      example: "7c9e1488-f038-4734-b149-d31a0127feaf",
    },
    amount: { type: "number", example: 100.0 },
    status: {
      type: "string",
      enum: Object.values(PaymentStatus),
      example: "pending",
    },
    currency: { type: "string", enum: Object.values(Currency), example: "USD" },
    created_at: { type: "string", example: "2026-03-04T09:10:50.789Z" },
    updated_at: { type: "string", example: "2026-03-04T09:10:50.789Z" },
    description: { type: "string", example: "Payment for project X" },
    idempotency_key: {
      type: "string",
      example: "7c9e1488-f038-4734-b149-d31a0127feaf",
    },
  },
};

export const paymentRequestSchema = {
  type: "object",
  properties: {
    amount: { type: "number", example: 100.0 },
    currency: { type: "string", enum: Object.values(Currency), example: "USD" },
    idempotency_key: {
      type: "string",
      example: "7c9e1488-f038-4734-b149-d31a0127feaf",
    },
    description: { type: "string", example: "Payment for project X" },
    status: {
      type: "string",
      enum: Object.values(PaymentStatus),
      example: "pending",
    },
  },
};

export const paymentUpdateRequestSchema = {
  type: "object",
  properties: {
    status: {
      type: "string",
      enum: Object.values(PaymentStatus),
      example: "pending",
    },
  },
};
