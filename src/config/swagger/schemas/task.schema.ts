import { TaskStatus, TaskPriority } from "../../../types";

export const taskResponseSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      example: "7c9e1488-f038-4734-b149-d31a0127feaf",
    },
    project_id: {
      type: "string",
      format: "uuid",
      example: "7c9e1488-f038-4734-b149-d31a0127feaf",
    },
    title: { type: "string", example: "Task X" },
    description: { type: "string", example: "Task X description" },
    status: {
      type: "string",
      enum: Object.values(TaskStatus),
      example: "pending",
    },
    priority: {
      type: "string",
      enum: Object.values(TaskPriority),
      example: "low",
    },
    assigned_id: {
      type: "string",
      example: "7c9e1488-f038-4734-b149-d31a0127feaf",
    },
    created_at: { type: "string", example: "2026-03-04T09:10:50.789Z" },
    updated_at: { type: "string", example: "2026-03-04T09:10:50.789Z" },
  },
};

export const taskIdParamSchema = {
  type: "string",
  format: "uuid",
  example: "7c9e1488-f038-4734-b149-d31a0127feaf",
};

export const taskRequestSchema = {
  type: "object",
  properties: {
    title: { type: "string", example: "Task X" },
    description: { type: "string", example: "Task X description" },
    status: {
      type: "string",
      enum: Object.values(TaskStatus),
      example: "pending",
    },
    priority: {
      type: "string",
      enum: Object.values(TaskPriority),
      example: "low",
    },
    assigned_id: {
      type: "string",
      format: "uuid",
      example: "7c9e1488-f038-4734-b149-d31a0127feaf",
    },
  },
};

export const taskUpdateRequestSchema = {
  type: "object",
  properties: {
    title: { type: "string", example: "Task X" },
    description: { type: "string", example: "Task X description" },
  },
};

export const taskUpdatedAssignedRequestSchema = {
  type: "object",
  properties: {
    assigned_id: {
      type: "string",
      format: "uuid",
      example: "7c9e1488-f038-4734-b149-d31a0127feaf",
    },
  },
};

export const taskUpdatedStatusRequestSchema = {
  type: "object",
  properties: {
    status: {
      type: "string",
      enum: Object.values(TaskStatus),
      example: "pending",
    },
  },
};

export const taskUpdatedPriorityRequestSchema = {
  type: "object",
  properties: {
    priority: {
      type: "string",
      enum: Object.values(TaskPriority),
      example: "low",
    },
  },
};
