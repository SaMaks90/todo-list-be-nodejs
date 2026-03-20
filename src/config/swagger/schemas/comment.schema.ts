export const commentResponseSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      example: "7c9e1488-f038-4734-b149-d31a0127feaf",
    },
    task_id: {
      type: "string",
      format: "uuid",
      example: "7c9e1488-f038-4734-b149-d31a0127feaf",
    },
    user_id: {
      type: "string",
      format: "uuid",
      example: "7c9e1488-f038-4734-b149-d31a0127feaf",
    },
    content: { type: "string", example: "Comment X" },
    created_at: { type: "string", example: "2026-03-04T09:10:50.789Z" },
    updated_at: { type: "string", example: "2026-03-04T09:10:50.789Z" },
  },
};

export const commentIdParamSchema = {
  type: "string",
  format: "uuid",
  example: "7c9e1488-f038-4734-b149-d31a0127feaf",
};

export const commentRequestSchema = {
  type: "object",
  properties: {
    content: { type: "string", example: "Comment X" },
  },
};
