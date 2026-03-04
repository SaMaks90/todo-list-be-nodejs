import { healthSchema } from "./schemas/health.shecma";
import {
  errorValidationSchema,
  errorNotFoundSchema,
  errorUnauthorizedSchema,
  errorAlreadyExistSchema,
} from "./schemas/error.shema";
import {
  loginResponseSchema,
  loginRequestSchema,
  registerRequestSchema,
  registerResponseSchema,
  profileResponseSchema,
  profileUpdateRequestSchema,
} from "./schemas/auth.schema";

export const swaggerSchemas = {
  Health: healthSchema,
  ErrorValidation: errorValidationSchema,
  ErrorNotFound: errorNotFoundSchema,
  ErrorAlreadyExists: errorAlreadyExistSchema,
  ErrorUnauthorized: errorUnauthorizedSchema,
  LoginResponse: loginResponseSchema,
  LoginRequest: loginRequestSchema,
  RegisterRequest: registerRequestSchema,
  RegisterResponse: registerResponseSchema,
  ProfileResponse: profileResponseSchema,
  ProfileUpdateRequest: profileUpdateRequestSchema,
};
