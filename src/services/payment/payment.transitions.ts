import { PaymentStatusType, AllowedTransitions } from "../../types";

export const canTransition = (
  current: PaymentStatusType,
  next: PaymentStatusType,
) => {
  return AllowedTransitions[current].includes(next);
};
