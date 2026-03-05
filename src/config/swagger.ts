import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express";
import { swaggerSchemas } from "./swagger/";

export const swaggerSetup = (app: Express) => {
  const isProd = process.env.NODE_ENV === "production";
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Todo List API",
        version: "1.0.0",
        description: "Todo List Backend API Documentation.",
      },
      servers: [
        {
          url: isProd
            ? "https://app-production-d9c3.up.railway.app"
            : "http://localhost:3000",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: swaggerSchemas,
        parameters: {
          PaymentId: {
            name: "payment_id",
            in: "path",
            required: true,
            description: "Payment unique identifier",
            schema: {
              $ref: "#/components/schemas/PaymentIdParam",
            },
          },
        },
        responses: {
          NotFoundError: {
            description: "Not Found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorNotFound",
                },
              },
            },
          },
          AlreadyExistsError: {
            description: "Already Exists",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorAlreadyExists",
                },
              },
            },
          },
          ValidationError: {
            description: "Validation error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorValidation",
                },
              },
            },
          },
          UnauthorizedError: {
            description: "Unauthorized - JWT token missing or invalid",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorUnauthorized",
                },
              },
            },
          },
        },
      },
    },
    apis: isProd
      ? ["./dist/**/*.js"]
      : ["./src/routes/**/*.ts", "./src/app.ts"],
  };

  const specs = swaggerJSDoc(options);

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
