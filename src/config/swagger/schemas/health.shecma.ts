export const healthSchema = {
  type: "object",
  properties: {
    status: { type: "string", example: "ok" },
    uptime: { type: "number", example: 1000.0012 },
    timestamp: { type: "string", example: "2023-01-01T00:00:00.000Z" },
    env: { type: "string", example: "development" },
  },
};
