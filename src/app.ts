import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { authRoutes, projectRoutes } from "./routes/";
import { errorHandler, authMiddleware } from "./middleware/";
import initDb from "./config/initDb";
const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
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
