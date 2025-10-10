import { pool } from "../../config/db";

const createUser = () => {};

const getUserById = async () => {
  const result = await pool.query("SELECT NOW()");
};

const getUserByEmail = () => {};

const updateUser = () => {};

const deleteUser = () => {};

export { createUser, getUserById, updateUser, deleteUser, getUserByEmail };
