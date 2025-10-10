import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { authRoutes } from "./routes/";
import { errorHandler } from "./middleware/";
import initDb from "./config/initDb";

const app: Express = express();
const port: string = process.env.PORT || "3000";

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/database/init", async (req: Request, res: Response) => {
  const result = await initDb();

  res.status(result.message ? 201 : 500).send(result);
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
