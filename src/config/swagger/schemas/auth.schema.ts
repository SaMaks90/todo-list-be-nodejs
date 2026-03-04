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
