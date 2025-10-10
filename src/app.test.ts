import request from "supertest";
import express, { Request, Response } from "express";
import initDb from "./config/initDb";

const app = express();
app.use(express.json());

app.get("/database/init", async (req: Request, res: Response) => {
  const result = await initDb();

  res.status(result.message ? 201 : 500).send(result);
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

describe("General app test", () => {
  it("GET / - should return 404 and error message", async () => {
    const response = await request(app).get("/");
    console.log(response.body);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Route not found" });
  });

  it("GET /database/init", async () => {
    const response = await request(app).get("/database/init");
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Tables successfully created or already exist",
    });
  });
});
