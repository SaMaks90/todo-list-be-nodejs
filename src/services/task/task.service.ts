import { QueryResult } from "pg";
import { pool } from "../../config/db";
import {
  ITask,
  IPaginatedResponse,
  TaskStatusType,
  TaskPriorityType,
} from "../../types";

const getTasksInProject = async (
  projectId: string,
  page = 1,
  limit = 10,
): Promise<IPaginatedResponse<ITask>> => {
  const offset = (page - 1) * limit;
  const [data, count] = await Promise.all([
    pool.query(
      `
        SELECT *
        FROM tasks
        WHERE project_id=$1
        ORDER BY created_at DESC
        OFFSET $2 LIMIT $3`,
      [projectId, offset, limit],
    ),

    pool.query(
      `
      SELECT COUNT(*) FROM tasks WHERE project_id=$1`,
      [projectId],
    ),
  ]);

  return {
    data: (data.rows || []) as ITask[],
    meta: {
      total: count.rows[0].count,
      count: data.rows.length,
      page,
      limit,
      totalPages: Math.ceil(count.rows[0].count / limit),
    },
  };
};

const getTasks = async (
  page = 1,
  limit = 10,
): Promise<IPaginatedResponse<ITask>> => {
  const offset = (page - 1) * limit;
  const [data, count] = await Promise.all([
    pool.query(
      `
        SELECT *
        FROM tasks
        ORDER BY created_at DESC
        OFFSET $1 LIMIT $2`,
      [offset, limit],
    ),
    pool.query(
      `
      SELECT COUNT(*) FROM tasks`,
      [],
    ),
  ]);

  return {
    data: (data.rows || []) as ITask[],
    meta: {
      total: count.rows[0].count,
      count: data.rows.length,
      page,
      limit,
      totalPages: Math.ceil(count.rows[0].count / limit),
    },
  };
};

const getTaskById = async (taskId: string): Promise<ITask | null> => {
  const result: QueryResult<ITask> = await pool.query(
    `SELECT * FROM tasks WHERE id = $1`,
    [taskId],
  );

  return (result.rows[0] || null) as ITask | null;
};

const createTask = async (data: {
  user_id: string;
  project_id: string;
  title: string;
  description: string;
  status: TaskStatusType;
  priority: TaskPriorityType;
  assigned_to_id: string | null;
}) => {
  const result: QueryResult<ITask> = await pool.query(
    `INSERT INTO tasks (user_id, project_id, title, description, status, priority, assigned_to_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      data.user_id,
      data.project_id,
      data.title,
      data.description,
      data.status,
      data.priority,
    ],
  );

  return result.rows[0] as ITask;
};

const updateTask = async (
  taskId: string,
  data: { title: string; description: string; updatedAt: Date },
) => {
  const result: QueryResult<ITask> = await pool.query(
    `UPDATE tasks SET title = $1, description = $2, updated_at = $3 WHERE id = $4 RETURNING *`,
    [data.title, data.description, data.updatedAt, taskId],
  );

  return result.rows[0] as ITask;
};

const deleteTask = async (taskId: string): Promise<string> => {
  const result: QueryResult<{ id: string }> = await pool.query(
    `DELETE FROM tasks WHERE id = $1 RETURNING id`,
    [taskId],
  );

  return result.rows[0].id as string;
};

const updateTaskStatus = async (
  taskId: string,
  status: TaskStatusType,
  updatedAt: Date,
): Promise<ITask> => {
  const result: QueryResult<ITask> = await pool.query(
    `UPDATE tasks SET status = $1, updated_at = $2 WHERE id = $3 RETURNING *`,
    [status, updatedAt, taskId],
  );

  return result.rows[0] as ITask;
};

const assignUserToTask = async (
  taskId: string,
  userId: string,
  updatedAt: Date,
): Promise<ITask> => {
  const result: QueryResult<ITask> = await pool.query(
    `UPDATE tasks SET assigned_to_id = $1, updated_at = $2 WHERE id = $3 RETURNING *`,
    [userId, updatedAt, taskId],
  );

  return result.rows[0] as ITask;
};

const updateTaskPriority = async (
  taskId: string,
  priority: TaskPriorityType,
  updatedAt: Date,
) => {
  const result: QueryResult<ITask> = await pool.query(
    `UPDATE tasks SET priority = $1, updated_at = $2 WHERE id = $3 RETURNING *`,
    [priority, updatedAt, taskId],
  );

  return result.rows[0] as ITask;
};

const getTaskByProjectIdAndTitle = async (
  projectId: string,
  title: string,
): Promise<ITask | null> => {
  const result: QueryResult<ITask> = await pool.query(
    `SELECT * FROM tasks WHERE project_id = $1 AND title = $2`,
    [projectId, title],
  );

  return (result.rows[0] || null) as ITask | null;
};

export {
  getTasksInProject,
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  assignUserToTask,
  getTaskByProjectIdAndTitle,
  updateTaskPriority,
};
