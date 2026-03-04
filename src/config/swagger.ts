import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express";
import { swaggerSchemas } from "./swagger/index";

export const swaggerSetup = (app: Express) => {
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
          url:
            process.env.NODE_ENV === "production"
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
      },
    },
    apis: ["./src/routes/**/*.ts", "./src/app.ts"],
  };

  const specs = swaggerJSDoc(options);

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
