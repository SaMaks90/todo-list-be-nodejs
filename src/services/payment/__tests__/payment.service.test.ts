import {
  getPayments,
  getPaymentByIdempotencyKey,
  createPayment,
  updatePaymentStatus,
  getPaymentById,
} from "../payment.service";
import { createUser, deleteUser } from "../../user/user.service";
import { IPayment, IProfileUser } from "../../../types";
import { pool } from "../../../config/db";

let userId: string;
let paymentId: string;
let createdPayment: Omit<
  IPayment,
  "id" | "user_id" | "created_at" | "updated_at"
>;

describe("PaymentService", () => {
  beforeAll(async () => {
    const user: IProfileUser = await createUser(
      "samchenkoms@test.com",
      "tester",
      "tester",
    );
    userId = user.id;

    createdPayment = {
      amount: 100,
      description: "Test payment",
      idempotency_key: "1111",
      status: "pending",
      currency: "USD",
    };
  });

  it("should get payments by userId return empty array", async () => {
    const result: IPayment[] = await getPayments(userId);

    expect(result).toBeDefined();
    expect(result).toHaveLength(0);
  });

  it("should get payment by Idempotency Key return null", async () => {
    const result: IPayment | null = await getPaymentByIdempotencyKey(
      userId,
      createdPayment.idempotency_key,
    );

    expect(result).toBeDefined();
    expect(result).toBeNull();
  });

  it("should create payment return payment", async () => {
    const result: IPayment = await createPayment(userId, createdPayment);
    paymentId = result.id;

    expect(result).toBeDefined();
    expect(result).toHaveProperty("amount", createdPayment.amount);
    expect(result).toHaveProperty("description", createdPayment.description);
    expect(result).toHaveProperty(
      "idempotency_key",
      createdPayment.idempotency_key,
    );
    expect(result).toHaveProperty("status", createdPayment.status);
    expect(result).toHaveProperty("currency", createdPayment.currency);
  });

  it("should get payments by userId return array with created payment", async () => {
    const result: IPayment[] = await getPayments(userId);
    const foundPayment: IPayment[] = result.filter(
      (payment) => payment.id === paymentId,
    );
    expect(result).toBeDefined();
    expect(result).toHaveLength(1);
    expect(foundPayment).toBeDefined();
    expect(foundPayment).toHaveLength(1);
    expect(foundPayment[0]).toHaveProperty("amount", createdPayment.amount);
    expect(foundPayment[0]).toMatchObject(createdPayment);
  });

  it("should get payment by id", async () => {
    const result: IPayment | null = await getPaymentById(userId, paymentId);

    expect(result).toBeDefined();
    expect(result).toMatchObject(createdPayment);
  });

  it("should update payment status", async () => {
    const updateStatus = "failed";
    const result: IPayment = await updatePaymentStatus(
      userId,
      paymentId,
      updateStatus,
      new Date(),
    );

    expect(result).toBeDefined();
    expect(result).toHaveProperty("status", updateStatus);
  });

  afterAll(async () => {
    if (paymentId) {
      await pool.query("DELETE FROM payments WHERE id = $1", [paymentId]);
    }

    if (userId) {
      await deleteUser(userId);
    }
  });
});
