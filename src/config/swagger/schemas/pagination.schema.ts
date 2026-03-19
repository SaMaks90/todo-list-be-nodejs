export const paginationSchema = {
  type: "object",
  properties: {
    total: { type: "number", example: 100 },
    count: { type: "number", example: 10 },
    page: { type: "number", example: 1 },
    limit: { type: "number", example: 10 },
    totalPages: { type: "number", example: 10 },
  },
};
