import { QueryResult } from "pg";
import { pool } from "../../config/db";
import { IProject } from "../../types";

const getProjects = async (ownerId: string): Promise<Array<IProject>> => {
  const result: QueryResult<Array<IProject>> = await pool.query(
    "SELECT * FROM projects WHERE owner_id = $1",
    [ownerId],
  );

  return (result.rows || []) as Array<IProject> | [];
};

const createProject = async (data: {
  name: string;
  ownerId: string;
}): Promise<IProject> => {
  const { name, ownerId } = data;
  const result: QueryResult<IProject> = await pool.query(
    "INSERT INTO projects (name, owner_id) VALUES ($1, $2) RETURNING id, name, owner_id, created_at, updated_at",
    [name, ownerId],
  );

  return result.rows[0] as IProject;
};

const updateProject = async (data: {
  name: string;
  updatedAt: Date;
  projectId: string;
}): Promise<IProject> => {
  const { name, projectId, updatedAt } = data;
  const result: QueryResult<IProject> = await pool.query(
    "UPDATE projects SET name = $1, updated_at = $2 WHERE id = $3 RETURNING id, name, owner_id, created_at, updated_at",
    [name, updatedAt, projectId],
  );

  return result.rows[0] as IProject;
};

export { getProjects, createProject, updateProject };
