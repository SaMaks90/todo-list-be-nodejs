import { QueryResult } from "pg";
import { pool } from "../../config/db";
import { CurrencyType, IPayment, PaymentStatusType } from "../../types";

const getPayments = async (userId: string): Promise<IPayment[]> => {
  const result: QueryResult<IPayment> = await pool.query(
    `SELECT * FROM payments WHERE user_id = $1`,
    [userId],
  );

  return result.rows as IPayment[];
};

const getPaymentByIdempotencyKey = async (
  userId: string,
  idempotencyKey: string,
): Promise<IPayment | null> => {
  const result: QueryResult<IPayment> = await pool.query(
    `SELECT * FROM payments WHERE idempotency_key = $1 and user_id = $2`,
    [idempotencyKey, userId],
  );

  return (result.rows[0] || null) as IPayment | null;
};

const getPaymentById = async (
  userId: string,
  paymentId: string,
): Promise<IPayment | null> => {
  const result: QueryResult<IPayment> = await pool.query(
    `SELECT * FROM payments WHERE id = $1 and user_id = $2`,
    [paymentId, userId],
  );

  return (result.rows[0] || null) as IPayment | null;
};

const createPayment = async (
  userId: string,
  data: {
    amount: number;
    description: string;
    idempotency_key: string;
    status: PaymentStatusType;
    currency: CurrencyType;
  },
): Promise<IPayment> => {
  const result: QueryResult<IPayment> = await pool.query(
    `
      INSERT INTO payments (user_id, amount, description, idempotency_key, status, currency)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (idempotency_key)
        DO UPDATE SET idempotency_key = EXCLUDED.idempotency_key
      RETURNING *`,
    [
      userId,
      data.amount,
      data.description,
      data.idempotency_key,
      data.status,
      data.currency,
    ],
  );

  return result.rows[0] as IPayment;
};

const updatePaymentStatus = async (
  userId: string,
  paymentId: string,
  status: PaymentStatusType,
  updatedAt: Date = new Date(),
) => {
  const result: QueryResult<IPayment> = await pool.query(
    `
      UPDATE payments 
        SET status = $1, updated_at = $2
      WHERE id = $3 
        and user_id = $4
      RETURNING *`,
    [status, updatedAt, paymentId, userId],
  );

  return result.rows[0] as IPayment;
};

export {
  getPayments,
  getPaymentById,
  createPayment,
  getPaymentByIdempotencyKey,
  updatePaymentStatus,
};
