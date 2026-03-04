import { healthSchema } from "./schemas/health.shecma";
import { errorValidationSchema, errorSchema } from "./schemas/error.shema";
import { loginResponseSchema, loginRequestSchema } from "./schemas/auth.schema";

export const swaggerSchemas = {
  Health: healthSchema,
  ErrorValidation: errorValidationSchema,
  Error: errorSchema,
  LoginResponse: loginResponseSchema,
  LoginRequest: loginRequestSchema,
};
