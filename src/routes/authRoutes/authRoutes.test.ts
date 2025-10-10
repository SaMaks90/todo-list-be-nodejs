// import request from "supertest";
// import express, { Request, Response, NextFunction } from "express";
// import userRoutes from "./authRoutes";
// import { registration } from "../../controllers";
//
// const app = express();
//
// app.use(express.json());
// app.use("/api/auth", userRoutes);
// app.use(
//   (
//     err: { error: string; status: number },
//     req: Request,
//     res: Response,
//     next: NextFunction,
//   ) => {
//     res.status(err.status || 500).json({ error: err.error });
//   },
// );
//
// describe("User routes", () => {
//   it("POST /api/auth/registration - should return 201", async () => {
//     (registration as jest.Mock).mockResolvedValueOnce(undefined);
//     const response = await request(app)
//       .post("/api/auth/registration")
//       .send({ email: "test@gmail.com", password: "1111", name: "test" });
//
//     expect(response.status).toBe(201);
//   });
//
//   it("POST /api/auth/registration - should return 409 and message", async () => {
//     const error = new Error("User already exists");
//     (error as any).status = 409;
//     (registration as jest.Mock).mockRejectedValueOnce(error);
//
//     const response = await request(app)
//       .post("/api/auth/registration")
//       .send({ name: "Test", email: "test@gmail.com", password: "1111" });
//
//     expect(response.status).toBe(409);
//     expect(response.body).toEqual({
//       error: "User already exists",
//     });
//   });
//
//   it("POST /api/auth/login - should return 200 and message", async () => {
//     const response = await request(app).post("/api/auth/login");
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({
//       message: "login",
//     });
//   });
//
//   it("POST /api/auth/refresh - should return 200 and message", async () => {
//     const response = await request(app).post("/api/auth/refresh");
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({
//       message: "refresh",
//     });
//   });
// });
