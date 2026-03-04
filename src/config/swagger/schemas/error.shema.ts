export const errorValidationSchema = {
  type: "object",
  properties: {
    error: {
      type: "string",
      example: "Validation error | Invalid parameters",
    },
    details: {
      type: "object",
      example: {
        field: "amount",
        message: "must be a number",
      },
    },
  },
};

export const errorSchema = {
  type: "object",
  properties: {
    error: {
      type: "string",
      example:
        "Router not found | User not found | Project not found | Invalid password",
    },
  },
};
