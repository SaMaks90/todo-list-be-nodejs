import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import client from "prom-client";
import { authRoutes, projectRoutes, paymentRoutes } from "./routes/";
import { errorHandler, authMiddleware, metricsMiddleware } from "./middleware/";
import initDb from "./config/initDb";
import { env } from "./config/env";
import { getTasks } from "./controllers/task/task.controller";
import { swaggerSetup } from "./config/swagger";

const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(metricsMiddleware);

swaggerSetup(app);

/**
 * @swagger
 * /api/health:
 *  get:
 *    summary: Health check
 *    tags: [System]
 *    description: Check the health status of the application.
 *    responses:
 *      200:
 *        description: Application is healthy.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Health'
 * */
app.get("/api/health", (_req: Request, res: Response, _next: NextFunction) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    env: env.NODE_ENV,
  });
});

/**
 * @swagger
 * /api/metrics:
 *  get:
 *    summary: Prometheus format
 *    tags: [System]
 *    description: Returns application metrics in Prometheus format.
 *    responses:
 *      200:
 *        description: Application metrics in Prometheus format.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 */
app.get(
  "/api/metrics",
  async (_req: Request, res: Response, _next: NextFunction) => {
    res.setHeader("Content-Type", client.register.contentType);
    res.send(await client.register.metrics());
  },
);

app.use("/api/auth", authRoutes);
app.use("/api/projects", authMiddleware, projectRoutes);

/**
 * @swagger
 * /api/tasks:
 *  get:
 *    summary: Get all tasks
 *    tags: [Tasks]
 *    description: Retrieve a list of all tasks without a filter by project ID.
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/TaskResponse'
 *                meta:
 *                  $ref: '#/components/schemas/PaginationMeta'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
app.get("/api/tasks", authMiddleware, getTasks);
app.use("/api/payments", authMiddleware, paymentRoutes);

/**
 * @swagger
 * /api/database/init:
 *  get:
 *    summary: Initialize database
 *    tags: [System]
 *    description: Initialize the database tables.
 *    responses:
 *      201:
 *        description: Database tables successfully created or already exist.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Tables successfully created or already exist"
 *      500:
 *        description: Internal server error.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Database initialization error: {error message}"
 */
app.get("/api/database/init", async (_req: Request, res: Response) => {
  const result = await initDb();

  res.status(result.message ? 201 : 500).send(result);
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

export default app;
