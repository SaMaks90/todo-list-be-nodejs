import express, { Express } from "express";
import request from "supertest";
import projectMemberRoutes from "../project.member.routes";

jest.mock("../../../services/project.member/project.member.service");

const app: Express = express();
app.use(express.json());
app.use("/api/members", projectMemberRoutes);

describe("project.member routes", () => {
  it("should 400 when invalid body", async () => {
    const response = await request(app)
      .post("/api/members/")
      .send({ test: 1232 });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: "Validation error" });
    expect(response.body).toHaveProperty("details");
  });

  it("should 400 when invalid parameter", async () => {
    const response = await request(app).delete("/api/members/123");

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: "Invalid parameters" });
    expect(response.body).toHaveProperty("details");
  });
});
