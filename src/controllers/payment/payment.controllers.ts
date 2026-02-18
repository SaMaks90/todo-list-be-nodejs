import { Response, Request, NextFunction } from "express";
import * as paymentService from "../../services/payment/payment.service";
import { HttpError, IPayment } from "../../types";
import { canTransition } from "../../services/payment/payment.transitions";

const getPayments = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { id: userId } = req.user;
  const payments: IPayment[] = await paymentService.getPayments(userId);

  res.status(200).json(payments);
};

const getPaymentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id: userId } = req.user;
  const { payment_id: paymentId } = req.params;
  const payment: IPayment | null = await paymentService.getPaymentById(
    userId,
    paymentId,
  );

  if (!payment) {
    const error = new Error("Payment not found");
    (error as HttpError).status = 404;
    return next(error);
  }

  res.status(200).json(payment);
};

const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { idempotency_key: idempotencyKey } = req.body;
  const { id: userId } = req.user;

  let payment: IPayment | null =
    await paymentService.getPaymentByIdempotencyKey(userId, idempotencyKey);

  if (payment) {
    const error = new Error(
      "Payment already exists with the same idempotency key",
    );
    (error as HttpError).status = 409;
    return next(error);
  }

  payment = await paymentService.createPayment(userId, req.body);

  res.status(201).json(payment);
};

const changePaymentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id: userId } = req.user;
  const { payment_id: paymentId } = req.params;
  const { status } = req.body;

  let payment: IPayment | null = await paymentService.getPaymentById(
    userId,
    paymentId,
  );
  if (!payment) {
    const error = new Error("Payment not found");
    (error as HttpError).status = 404;
    return next(error);
  }

  if (canTransition(payment.status, status)) {
    const error = new Error("Cannot change payment status");
    (error as HttpError).status = 400;
    return next(error);
  }

  payment = await paymentService.updatePaymentStatus(
    userId,
    paymentId,
    status,
    new Date(),
  );

  res.status(200).json(payment);
};

export { getPayments, getPaymentById, createPayment, changePaymentStatus };
