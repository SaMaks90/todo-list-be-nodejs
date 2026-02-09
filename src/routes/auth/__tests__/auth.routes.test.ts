import express, { Express } from "express";
import request from "supertest";
import { verify } from "jsonwebtoken";
import { authRoutes } from "../../index";
import { errorHandler } from "../../../middleware";

const app: Express = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(errorHandler);

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

describe("Auth Routes", () => {
  it("Should return 400 and validation body error when login user", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: 123 });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: "Validation error" });
    expect(response.body).toHaveProperty("details");
  });

  it("Should return 400 and validation body error when registration user", async () => {
    const response = await request(app)
      .post("/api/auth/registration")
      .send({ email: 123 });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: "Validation error" });
    expect(response.body).toHaveProperty("details");
  });

  it("Should return 401 when invalid authorization header", async () => {
    const response = await request(app).get("/api/auth/profile");

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid authorization header");
  });

  it("Should return 401 when invalid token payload", async () => {
    (verify as jest.Mock).mockReturnValue({});
    const response = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", "Bearer token123");

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid token payload");
  });
});
