import { QueryResult } from "pg";
import { pool } from "../../config/db";
import { IProfileUser, IUser } from "../../types";

const createUser = async (
  email: string,
  username: string,
  password: string,
): Promise<IProfileUser> => {
  const result: QueryResult<IProfileUser> = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, email, username, created_at, updated_at",
    [username, email, password],
  );
  return result.rows[0] as IProfileUser;
};

const getUserById = async (userId: string): Promise<IProfileUser | null> => {
  const result: QueryResult<IProfileUser> = await pool.query(
    `SELECT id, email, username, created_at, updated_at FROM users WHERE id = $1`,
    [userId],
  );
  return (result.rows[0] || null) as IProfileUser | null;
};

const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const result: QueryResult<IUser> = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
  );

  return (result.rows[0] || null) as IUser | null;
};

const updateUser = async (
  userId: string,
  data: { email: string; username: string; updated_at: Date },
): Promise<IProfileUser> => {
  const result: QueryResult<IUser> = await pool.query(
    "UPDATE users SET email = $1, username = $2, updated_at = $3 WHERE id = $4 RETURNING id, email, username, created_at, updated_at",
    [data.email, data.username, data.updated_at, userId],
  );

  return result.rows[0] as IProfileUser;
};

const deleteUser = async (userId: string): Promise<void> => {
  await pool.query("DELETE FROM users WHERE id = $1", [userId]);
};

export { createUser, getUserById, updateUser, deleteUser, getUserByEmail };
