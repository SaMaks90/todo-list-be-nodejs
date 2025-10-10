import request from "supertest";
import express from "express";
import userRoutes from "./authRoutes";

const app = express();

app.use(express.json());
app.use("/api/auth", userRoutes);

describe("User routes", () => {
  it("POST /api/auth/login - should return 200 and message", async () => {
    const response = await request(app).post("/api/auth/login");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "login",
    });
  });

  it("POST /api/auth/register - should return 201 and message", async () => {
    const response = await request(app).post("/api/auth/register");
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "register",
    });
  });

  it("POST /api/auth/refresh - should return 200 and message", async () => {
    const response = await request(app).post("/api/auth/refresh");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "refresh",
    });
  });
});
