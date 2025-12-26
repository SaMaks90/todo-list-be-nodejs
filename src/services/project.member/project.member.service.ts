import { QueryResult } from "pg";
import { pool } from "../../config/db";
import { Role, IProjectMember } from "../../types";

const getProjectMemberInProject = async (
  projectId: string,
  userId: string,
): Promise<IProjectMember | null> => {
  const result: QueryResult<IProjectMember> = await pool.query(
    `
    SELECT * FROM project_members WHERE project_id = $1 AND user_id = $2
  `,
    [projectId, userId],
  );

  return (result.rows[0] || null) as IProjectMember | null;
};

const addMemberToProject = async (
  projectId: string,
  userId: string,
  role: Role,
): Promise<IProjectMember> => {
  const result: QueryResult<IProjectMember> = await pool.query(
    `
    INSERT INTO project_members (user_id, project_id, role) VALUES ($1, $2, $3) RETURNING *
  `,
    [userId, projectId, role],
  );

  return result.rows[0] as IProjectMember;
};

const updateMemberRoleInProject = async (
  projectMemberId: string,
  role: Role,
) => {
  const result: QueryResult<IProjectMember> = await pool.query(
    `
    UPDATE project_members SET role = $1 WHERE id = $2 RETURNING *
    `,
    [role, projectMemberId],
  );

  return result.rows[0] as IProjectMember;
};

const deleteMemberFromProject = async (projectMemberId: string) => {
  const result: QueryResult<IProjectMember> = await pool.query(
    `
    DELETE FROM project_members WHERE id = $1 RETURNING id
  `,
    [projectMemberId],
  );

  return result.rows[0].id as string;
};

export {
  getProjectMemberInProject,
  addMemberToProject,
  updateMemberRoleInProject,
  deleteMemberFromProject,
};
