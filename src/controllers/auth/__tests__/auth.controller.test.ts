import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  deleteProfile,
  getProfile,
  login,
  refreshToken,
  registration,
  updateProfile,
} from "../auth.controller";
import * as userService from "../../../services/user/user.service";

jest.mock("../../../services/user/user.service");
jest.mock("jsonwebtoken");
jest.mock("bcryptjs");

describe("auth.controller - login user", () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { body: { email: "test@test.com", password: "123456" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it("Should return 200 and token if login successful", async () => {
    (userService.getUserByEmail as jest.Mock).mockResolvedValue({
      id: "123456",
      email: "test@test.com",
      password: "hashedPassword",
      username: "test",
      created_at: new Date(),
      updated_at: new Date(),
    });
    (compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("token123");

    await login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "token123" });
    expect(next).not.toHaveBeenCalled();
  });

  it("Should call next with 404 error if user not found", async () => {
    (userService.getUserByEmail as jest.Mock).mockResolvedValue(null);

    await login(req, res, next);

    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.status).toBe(404);
    expect(error.message).toBe("User not found");
    expect(res.status).not.toHaveBeenCalled();
  });

  it("Should call next with 409 error if password invalid", async () => {
    (userService.getUserByEmail as jest.Mock).mockResolvedValue({
      id: "123456",
      email: "test@test.com",
      password: "hashedPassword",
      username: "test",
      created_at: new Date(),
      updated_at: new Date(),
    });
    (compare as jest.Mock).mockResolvedValue(false);

    await login(req, res, next);

    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.status).toBe(401);
    expect(error.message).toBe("Invalid password");
    expect(res.status).not.toHaveBeenCalled();
  });
});

describe("auth.controller - registration user", () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      body: { email: "test@test.com", password: "123456", username: "test" },
    };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it("Should return 201 and message 'User successfully registered'", async () => {
    (userService.getUserByEmail as jest.Mock).mockResolvedValue(null);
    (hash as jest.Mock).mockResolvedValue("hashedPassword");
    (userService.createUser as jest.Mock).mockResolvedValue(undefined);

    await registration(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User successfully registered",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("Should registration user call next with 409 error if user already exist", async () => {
    (userService.getUserByEmail as jest.Mock).mockResolvedValue({
      id: "123456",
      email: "test@test.com",
      password: "hashedPassword",
      username: "test",
      created_at: new Date(),
      updated_at: new Date(),
    });

    await registration(req, res, next);

    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.status).toBe(409);
    expect(error.message).toBe("User already exists");
    expect(res.status).not.toHaveBeenCalled();
  });
});

describe("auth.controller - refresh token, get profile, update profile and delete profile", () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { user: { id: "123456" }, body: { username: "test2" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it("should refresh token return 200 and refresh token", async () => {
    (jwt.sign as jest.Mock).mockReturnValue("token123");

    await refreshToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "token123" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should get profile return 200 and profile data", async () => {
    (userService.getUserById as jest.Mock).mockResolvedValue({
      id: "123456",
      username: "test",
      updated_at: new Date(),
      created_at: new Date(),
    });

    await getProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: "123456",
      username: "test",
      updated_at: expect.any(Date),
      created_at: expect.any(Date),
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should update profile return 200 and profile data", async () => {
    const updated_at = new Date("2025-12-17T16:25:18.860");
    const created_at = new Date("2025-12-17T16:25:18.860");
    (userService.updateUser as jest.Mock).mockResolvedValueOnce({
      id: "123456",
      username: "test2",
      updated_at,
      created_at,
    });

    await updateProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: "123456",
      username: "test2",
      updated_at,
      created_at,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should update profile return 404 and message User not found if don't find user", async () => {
    (userService.getUserById as jest.Mock).mockResolvedValue(null);

    await updateProfile(req, res, next);

    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.status).toBe(404);
    expect(error.message).toBe("User not found");
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should delete profile return 200 and message 'User successfully deleted'", async () => {
    (userService.deleteUser as jest.Mock).mockResolvedValue(undefined);

    await deleteProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User successfully deleted",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
