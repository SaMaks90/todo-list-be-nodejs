import express, { Express } from "express";
import request, { Response } from "supertest";
import { paymentRoutes } from "../../index";

jest.mock("../../../services/payment/payment.service");

const app: Express = express();
app.use(express.json());
app.use("/api/payments", paymentRoutes);

describe("Payment routes", () => {
  it("should return 400 when invalid param when get payment by id", async () => {
    const response: Response = await request(app).get("/api/payments/123");

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: "Invalid parameters" });
    expect(response.body).toHaveProperty("details");
    expect(response.body.details.fieldErrors).toHaveProperty("payment_id");
  });

  it("should return 400 when invalid body when create payment", async () => {
    const response: Response = await request(app).post("/api/payments/").send({
      status: "pending",
      amount: 123,
      currency: "USD",
      description: "test",
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: "Validation error" });
    expect(response.body).toHaveProperty("details");
    expect(response.body.details.fieldErrors).toHaveProperty("idempotency_key");
  });

  it("should return 400 when invalid param when update status", async () => {
    const response: Response = await request(app).patch(
      "/api/payments/123/status",
    );

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: "Invalid parameters" });
    expect(response.body).toHaveProperty("details");
    expect(response.body.details.fieldErrors).toHaveProperty("payment_id");
  });

  it("should return 400 when invalid body when update status", async () => {
    const response: Response = await request(app)
      .patch("/api/payments/4054527d-0058-42e4-a640-f41703b66203/status")
      .send({ status: "test" });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: "Validation error" });
    expect(response.body).toHaveProperty("details");
    expect(response.body.details.fieldErrors).toHaveProperty("status");
  });
});
