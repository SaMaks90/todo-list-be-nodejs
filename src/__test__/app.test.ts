import request from "supertest";
import express, { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import initDb from "../config/initDb";
import { authMiddleware } from "../middleware";
import { projectRoutes } from "../routes";
import * as projectController from "../controllers/project/project.controllers";

const app = express();
app.use(express.json());
app.use("/api/projects", authMiddleware, projectRoutes);

app.get("/database/init", async (req: Request, res: Response) => {
  const result = await initDb();

  res.status(result.message ? 201 : 500).send(result);
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

jest.mock("jsonwebtoken");
jest.mock("../controllers/project/project.controllers");

describe("General app test", () => {
  it("Should return 404 and error message", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Route not found" });
  });

  it("Should return 201 when initialization database", async () => {
    const response = await request(app).get("/database/init");
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Tables successfully created or already exist",
    });
  });

  it("Should return 200 when authorization ok", async () => {
    (jwt.verify as jest.Mock).mockImplementation(() => ({ userId: "123" }));
    (projectController.getProjects as jest.Mock).mockImplementation(
      (req, res) => {
        res.status(200).json([]);
      },
    );

    const response = await request(app)
      .get("/api/projects")
      .set("Authorization", "Bearer token123");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("Should return 401 when authorization badly", async () => {
    const response = await request(app).get("/api/projects");
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Invalid authorization header" });
  });
});
