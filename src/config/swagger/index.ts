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
import {
  paymentResponseSchema,
  paymentRequestSchema,
  paymentUpdateRequestSchema,
  paymentIdParamSchema,
} from "./schemas/payment.schema";
import {
  projectResponseSchema,
  projectIdParamSchema,
  projectRequestSchema,
} from "./schemas/project.schema";
import {
  projectMemberResponseSchema,
  projectMemberIdParamSchema,
  projectMemberRequestSchema,
  projectMemberUpdateRequestSchema,
} from "./schemas/project.member.schema";
import { paginationSchema } from "./schemas/pagination.schema";
import {
  taskResponseSchema,
  taskIdParamSchema,
  taskRequestSchema,
  taskUpdateRequestSchema,
  taskUpdatedStatusRequestSchema,
  taskUpdatedPriorityRequestSchema,
  taskUpdatedAssignedRequestSchema,
} from "./schemas/task.schema";
import {
  commentIdParamSchema,
  commentResponseSchema,
  commentRequestSchema,
} from "./schemas/comment.schema";

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
  PaymentResponse: paymentResponseSchema,
  PaymentRequest: paymentRequestSchema,
  PaymentUpdateStatusRequest: paymentUpdateRequestSchema,
  PaymentIdParam: paymentIdParamSchema,
  ProjectResponse: projectResponseSchema,
  ProjectIdParam: projectIdParamSchema,
  ProjectRequest: projectRequestSchema,
  ProjectMemberResponse: projectMemberResponseSchema,
  ProjectMemberIdParam: projectMemberIdParamSchema,
  ProjectMemberRequest: projectMemberRequestSchema,
  ProjectMemberUpdateRequest: projectMemberUpdateRequestSchema,
  PaginationMeta: paginationSchema,
  TaskResponse: taskResponseSchema,
  TaskIdParam: taskIdParamSchema,
  TaskRequest: taskRequestSchema,
  TaskUpdateRequest: taskUpdateRequestSchema,
  TaskUpdateStatusRequest: taskUpdatedStatusRequestSchema,
  TaskUpdateAssignRequest: taskUpdatedAssignedRequestSchema,
  TaskUpdatePriorityRequest: taskUpdatedPriorityRequestSchema,
  CommentResponse: commentResponseSchema,
  CommentIdParam: commentIdParamSchema,
  CommentRequest: commentRequestSchema,
};
