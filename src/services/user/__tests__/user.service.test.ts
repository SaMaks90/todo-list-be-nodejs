import { pool } from "../../../config/db";
import {
  createUser,
  getUserByEmail,
  getUserById,
  deleteUser,
  updateUser,
} from "../user.service";

let testEmail: string;
let testPassword: string;
let testUsername: string;
let testUserId: string;

describe("user.service", () => {
  beforeAll(async () => {
    // await pool.query("DELETE FROM users");
    testEmail = "test@test.com";
    testPassword = "password123";
    testUsername = "test";
  });

  it("should create user and return profile data without password", async () => {
    const user = await createUser(testEmail, testUsername, testPassword);
    testUserId = user.id;

    expect(user).toBeDefined();
    expect(user).toHaveProperty("email", testEmail);
    expect(user).toHaveProperty("username", testUsername);
    expect(user).not.toHaveProperty("password");
    expect(user).toHaveProperty("id", testUserId);
    expect(user).toHaveProperty("created_at");
    expect(user).toHaveProperty("updated_at");
  });

  it("should get user by id and return data without password", async () => {
    const user = await getUserById(testUserId);

    expect(user).toBeDefined();
    expect(user).not.toHaveProperty("password");
  });

  it("should return null if user id does not exist", async () => {
    const user = await getUserById("e17176d0-d773-4fb6-8659-5f039119bce9");

    expect(user).toBeNull();
  });

  it("should get user by email and return data with password", async () => {
    const user = await getUserByEmail(testEmail);

    expect(user).toBeDefined();
    expect(user).toHaveProperty("password");
  });

  it("should return null if user email does not exist", async () => {
    const user = await getUserByEmail("test2@test2.com");

    expect(user).toBeNull();
  });

  it("should update user by id and return data without password", async () => {
    const updatedUser = {
      email: testEmail,
      username: "test testing",
      updated_at: new Date(),
    };
    const user = await updateUser(testUserId, updatedUser);

    expect(user).toBeDefined();
    expect(user).not.toHaveProperty("password");
    expect(user).toHaveProperty("username", updatedUser.username);
  });

  it("should delete user by id", async () => {
    await deleteUser(testUserId);
    const user = await getUserById(testUserId);

    expect(user).toBeNull();
  });
});
