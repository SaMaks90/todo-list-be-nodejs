import express, { Express } from "express";
import request, { Response } from "supertest";
import { commentRoutes } from "../../index";

jest.mock("../../../services/comment/comment.service");

const app: Express = express();
app.use(express.json());
app.use("/api/comments", commentRoutes);

describe("Comment routes", () => {
  it("should return 400 when invalid param when get comment by id", async () => {
    const response: Response = await request(app).get("/api/comments/123");

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: "Invalid parameters" });
    expect(response.body).toHaveProperty("details");
    expect(response.body.details.fieldErrors).toHaveProperty("comment_id");
  });

  it("should return 400 when invalid body when create comment", async () => {
    const response: Response = await request(app).post("/api/comments/").send({
      test: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: "Validation error" });
    expect(response.body).toHaveProperty("details");
    expect(response.body.details.fieldErrors).toHaveProperty("content");
  });

  it("should return 400 when invalid param when update comment", async () => {
    const response: Response = await request(app).put("/api/comments/123");

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: "Invalid parameters" });
    expect(response.body).toHaveProperty("details");
    expect(response.body.details.fieldErrors).toHaveProperty("comment_id");
  });

  it("should return 400 when invalid body when update comment", async () => {
    const response: Response = await request(app)
      .put("/api/comments/4054527d-0058-42e4-a640-f41703b66203")
      .send({ status: "test" });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: "Validation error" });
    expect(response.body).toHaveProperty("details");
    expect(response.body.details.fieldErrors).toHaveProperty("content");
  });

  it("should return 400 when invalid param when delete comment", async () => {
    const response: Response = await request(app).put("/api/comments/123");

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: "Invalid parameters" });
    expect(response.body).toHaveProperty("details");
    expect(response.body.details.fieldErrors).toHaveProperty("comment_id");
  });
});
