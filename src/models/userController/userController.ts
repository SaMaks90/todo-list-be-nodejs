import { QueryResult } from "pg";
import { pool } from "../../config/db";
import { IUser } from "../../types/";

const createUser = () => {};

const getUserById = async () => {};

const getUserByEmail = async (email: string) => {
  const result: QueryResult<IUser> = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
  );

  return result.rows[0] as IUser;
};

const updateUser = () => {};

const deleteUser = () => {};

export { createUser, getUserById, updateUser, deleteUser, getUserByEmail };
