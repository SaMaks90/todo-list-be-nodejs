export const errorValidationSchema = {
  type: "object",
  properties: {
    error: {
      type: "string",
      example: "Validation error | Invalid parameters | Invalid body",
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

export const errorNotFoundSchema = {
  type: "object",
  properties: {
    error: {
      type: "string",
      example: "Project not found | User not found",
    },
  },
};

export const errorAlreadyExistSchema = {
  type: "object",
  properties: {
    error: {
      type: "string",
      example: "Already exists",
    },
  },
};

export const errorUnauthorizedSchema = {
  type: "object",
  properties: {
    error: {
      type: "string",
      example: "Invalid password",
    },
  },
};
