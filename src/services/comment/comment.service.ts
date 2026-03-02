import { IComment } from "../../types";
import { pool } from "../../config/db";
import { QueryResult } from "pg";

const getCommentsByTaskId = async (userId: string): Promise<IComment[]> => {
  const result: QueryResult<IComment> = await pool.query(
    `
    SELECT * FROM comments WHERE task_id = $1
  `,
    [userId],
  );

  return result.rows as IComment[];
};

const getCommentById = async (commentId: string): Promise<IComment | null> => {
  const result: QueryResult<IComment> = await pool.query(
    `
    SELECT * FROM comments WHERE id = $1
  `,
    [commentId],
  );

  return (result.rows.length ? result.rows[0] : null) as IComment | null;
};

const createComment = async (data: {
  userId: string;
  taskId: string;
  content: string;
}): Promise<IComment> => {
  const result: QueryResult<IComment> = await pool.query(
    `
    INSERT INTO comments (user_id, task_id, content)
    VALUES ($1, $2, $3)
    RETURNING *
  `,
    [data.userId, data.taskId, data.content],
  );

  return result.rows[0] as IComment;
};

const updateCommentById = async (
  commentId: string,
  content: string,
  updatedAt: Date,
): Promise<IComment> => {
  const result: QueryResult<IComment> = await pool.query(
    `
    UPDATE comments SET content = $1, updated_at = $2 WHERE id = $3 RETURNING *
  `,
    [content, updatedAt, commentId],
  );

  return result.rows[0] as IComment;
};

const deleteCommentById = async (commentId: string): Promise<string> => {
  const result: QueryResult<{ id: string }> = await pool.query(
    `
    DELETE FROM comments WHERE id = $1 RETURNING id
  `,
    [commentId],
  );

  return result.rows[0].id as string;
};

export {
  getCommentsByTaskId,
  getCommentById,
  createComment,
  updateCommentById,
  deleteCommentById,
};
