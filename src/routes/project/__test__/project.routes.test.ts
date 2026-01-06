import express, { Express } from "express";
import request from "supertest";
import { projectRoutes } from "../../index";

jest.mock("../../../controllers/project/project.controllers");

const app: Express = express();
app.use(express.json());
app.use("/api/projects", projectRoutes);

describe("Project routes - check parameters and body schema", () => {
  it("should 400 when invalid parameters", async () => {
    const response = await request(app).get("/api/projects/123");
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: "Invalid parameters" });
    expect(response.body).toHaveProperty("details");
  });

  it("should 400 when invalid body", async () => {
    const response = await request(app)
      .post("/api/projects/")
      .send({ test: 1232 });
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: "Validation error" });
    expect(response.body).toHaveProperty("details");
  });
});
