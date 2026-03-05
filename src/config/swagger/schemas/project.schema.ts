export const projectResponseSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      example: "7c9e1488-f038-4734-b149-d31a0127feaf",
    },
    name: { type: "string", example: "Project X" },
    owner_id: {
      type: "string",
      format: "uuid",
      example: "7c9e1488-f038-4734-b149-d31a0127feaf",
    },
    created_at: { type: "string", example: "2026-03-04T09:10:50.789Z" },
    updated_at: { type: "string", example: "2026-03-04T09:10:50.789Z" },
  },
};

export const projectIdParamSchema = {
  type: "string",
  format: "uuid",
  example: "7c9e1488-f038-4734-b149-d31a0127feaf",
};

export const projectRequestSchema = {
  type: "object",
  properties: {
    name: { type: "string", example: "Project X" },
  },
};
