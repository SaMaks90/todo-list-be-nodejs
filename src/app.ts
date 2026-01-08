import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import client from "prom-client";
import { authRoutes, projectRoutes } from "./routes/";
import { errorHandler, authMiddleware, metricsMiddleware } from "./middleware/";
import initDb from "./config/initDb";
import { env } from "./config/env";

const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(metricsMiddleware);

app.get("/api/health", (_req: Request, res: Response, _next: NextFunction) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    env: env.NODE_ENV,
  });
});

app.get(
  "/api/metrics",
  async (_req: Request, res: Response, _next: NextFunction) => {
    res.setHeader("Content-Type", client.register.contentType);
    res.send(await client.register.metrics());
  },
);

app.use("/api/auth", authRoutes);
app.use("/api/projects", authMiddleware, projectRoutes);

app.get("/database/init", async (_req: Request, res: Response) => {
  const result = await initDb();

  res.status(result.message ? 201 : 500).send(result);
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

export default app;
