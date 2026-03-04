export const loginResponseSchema = {
  type: "object",
  properties: {
    token: {
      type: "string",
      example:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZjE2YzY3YS1kMjEzLTQ3YmItYjE5YS0yZjE2NTk4YzQ5MzAiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcwOTQ5MDAwMCwiZXhwIjoxNzA5NTc2NDAwfQ.Xk3N8Yt0Lk9v2cWZz4Jm6QaB9xRtYuIoPpLmNwQrStU",
    },
  },
};

export const loginRequestSchema = {
  type: "object",
  properties: {
    email: { type: "string", example: "test@test.test" },
    password: { type: "string", example: "test" },
  },
};

export const registerRequestSchema = {
  type: "object",
  properties: {
    email: { type: "string", example: "test@test.test" },
    username: { type: "string", example: "test" },
    password: { type: "string", example: "test" },
  },
};

export const registerResponseSchema = {
  type: "object",
  properties: {
    message: { type: "string", example: "User created successfully" },
  },
};

export const profileResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string", example: "7c9e1488-f038-4734-b149-d31a0127feaf" },
    username: { type: "string", example: "Test" },
    email: { type: "string", example: "test@test.test" },
    created_at: { type: "string", example: "2026-03-04T09:10:50.789Z" },
    updated_at: { type: "string", example: "2026-03-04T09:10:50.789Z" },
  },
};

export const profileUpdateRequestSchema = {
  type: "object",
  properties: {
    email: { type: "string", example: "test@test.test" },
    username: { type: "string", example: "test" },
  },
};
