import { mockRequest, mockResponse, mockNext } from "../../../types/mocks";
import * as paymentService from "../../../services/payment/payment.service";
import * as paymentController from "../payment.controllers";
import { IPayment } from "../../../types";
import { canTransition } from "../../../services/payment/payment.transitions";

jest.mock("../../../services/payment/payment.service");
jest.mock("../../../services/payment/payment.transitions");

const userId = "79831653-3db5-45ca-9f2a-f0e389f43b50";
const paymentId = "8edc0947-0862-4e9a-b30a-c4443c6abbbd";

describe("Payment Controller - CRUD operations", () => {
  let req: ReturnType<typeof mockRequest>;
  let res: ReturnType<typeof mockResponse>;
  let next: ReturnType<typeof mockNext>;
  let createdPayment: IPayment;
  let updatedPayment: IPayment;

  beforeAll(async () => {
    req = mockRequest({
      user: { id: userId },
      params: { payment_id: paymentId },
    });

    res = mockResponse();
    next = jest.fn();
    createdPayment = {
      id: paymentId,
      user_id: userId,
      idempotency_key: "4054527d-0058-42e4-a640-f41703b66203",
      amount: 200,
      currency: "USD",
      status: "pending",
      description: "Test payment",
      updated_at: new Date(),
      created_at: new Date(),
    };
    updatedPayment = {
      ...createdPayment,
      status: "failed",
      updated_at: new Date(),
    };
  });

  it("should return 200 with empty payments array", async () => {
    (paymentService.getPayments as jest.Mock).mockResolvedValue([]);

    await paymentController.getPayments(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveLength(0);
    expect(res.json).toHaveBeenCalledWith([]);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 404 and error message when payment not found", async () => {
    (paymentService.getPaymentById as jest.Mock).mockResolvedValue(null);
    await paymentController.getPaymentById(req, res, next);

    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(res.status).not.toHaveBeenCalled();
    expect(error.status).toBe(404);
    expect(error.message).toBe("Payment not found");
  });

  it("should return 200 and return payment", async () => {
    (paymentService.getPaymentById as jest.Mock).mockResolvedValue(
      createdPayment,
    );

    await paymentController.getPaymentById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(createdPayment);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 409 and message when payment already exists", async () => {
    (paymentService.getPaymentByIdempotencyKey as jest.Mock).mockResolvedValue(
      createdPayment,
    );

    await paymentController.createPayment(req, res, next);
    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(res.status).not.toHaveBeenCalled();
    expect(error.status).toBe(409);
    expect(error.message).toBe(
      "Payment already exists with the same idempotency key",
    );
  });

  it("should return 201 and return payment", async () => {
    (paymentService.getPaymentByIdempotencyKey as jest.Mock).mockResolvedValue(
      null,
    );
    (paymentService.createPayment as jest.Mock).mockResolvedValue(
      createdPayment,
    );

    await paymentController.createPayment(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdPayment);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 404 and message when payment not found", async () => {
    (paymentService.getPaymentById as jest.Mock).mockResolvedValue(null);

    await paymentController.changePaymentStatus(req, res, next);
    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(res.status).not.toHaveBeenCalled();
    expect(error.status).toBe(404);
    expect(error.message).toBe("Payment not found");
  });

  it("should return 400 and message when Cannot change payment status because its not business flow", async () => {
    (paymentService.getPaymentById as jest.Mock).mockResolvedValue(
      createdPayment,
    );
    (canTransition as jest.Mock).mockReturnValue(false);

    await paymentController.changePaymentStatus(req, res, next);

    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(res.status).not.toHaveBeenCalled();
    expect(error.status).toBe(400);
    expect(error.message).toBe("Cannot change payment status");
  });

  it("should return 200 and return payment with change status", async () => {
    (paymentService.getPaymentById as jest.Mock).mockResolvedValue(
      createdPayment,
    );
    (canTransition as jest.Mock).mockReturnValue(true);
    (paymentService.updatePaymentStatus as jest.Mock).mockResolvedValue(
      updatedPayment,
    );

    await paymentController.changePaymentStatus(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedPayment);
    expect(next).not.toHaveBeenCalled();
  });
});
