import { Roles } from "../../../types";

export const projectMemberResponseSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      example: "7c9e1488-f038-4734-b149-d31a0127feaf",
    },
    user_id: {
      type: "string",
      format: "uuid",
      example: "7c9e1488-f038-4734-b149-d31a0127feaf",
    },
    project_id: {
      type: "string",
      format: "uuid",
      example: "7c9e1488-f038-4734-b149-d31a0127feaf",
    },
    role: { type: "string", enum: Object.values(Roles), example: "admin" },
    created_at: { type: "string", example: "2026-03-04T09:10:50.789Z" },
    updated_at: { type: "string", example: "2026-03-04T09:10:50.789Z" },
  },
};

export const projectMemberIdParamSchema = {
  type: "string",
  format: "uuid",
  example: "7c9e1488-f038-4734-b149-d31a0127feaf",
};

export const projectMemberRequestSchema = {
  type: "object",
  properties: {
    role: { type: "string", enum: Object.values(Roles), example: "admin" },
    user_id: {
      type: "string",
      format: "uuid",
      example: "7c9e1488-f038-4734-b149-d31a0127feaf",
    },
  },
};

export const projectMemberUpdateRequestSchema = {
  type: "object",
  properties: {
    role: { type: "string", enum: Object.values(Roles), example: "admin" },
  },
};
