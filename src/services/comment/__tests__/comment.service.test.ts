import {
  createComment,
  getCommentById,
  deleteCommentById,
  getCommentsByTaskId,
  updateCommentById,
} from "../comment.service";
import { createUser, deleteUser } from "../../user/user.service";
import { createProject } from "../../project/project.service";
import { createTask, deleteTask } from "../../task/task.service";
import { IComment, IProfileUser, IProject, ITask } from "../../../types";
import { pool } from "../../../config/db";

let userId: string;
let projectId: string;
let taskId: string;
let commentId: string;
let createdComment: IComment;
let updatedComment: IComment;

describe("CommentService", () => {
  beforeAll(async () => {
    const user: IProfileUser = await createUser(
      "tester@test.com",
      "tester",
      "tester",
    );
    const project: IProject = await createProject({
      name: "Testing",
      ownerId: userId,
    });
    const task: ITask = await createTask({
      user_id: userId,
      project_id: projectId,
      title: "testing comment",
      description: "test comment",
      assigned_to_id: null,
      status: "open",
      priority: "low",
    });

    userId = user.id;
    projectId = project.id;
    taskId = task.id;
  });

  it("should get comments and return empty array", async () => {
    const result: IComment[] = await getCommentsByTaskId(taskId);

    expect(result).toBeDefined();
    expect(result).toHaveLength(0);
  });

  it("should create comment and return comment", async () => {
    const createContent = "Test comment";
    const result: IComment = await createComment({
      userId: userId,
      taskId: taskId,
      content: createContent,
    });
    commentId = result.id;
    createdComment = result;

    expect(result).toBeDefined();
    expect(result).toHaveProperty("user_id", userId);
    expect(result).toHaveProperty("task_id", taskId);
    expect(result).toHaveProperty("content", createContent);
    expect(result).toHaveProperty("created_at");
    expect(result).toHaveProperty("updated_at");
    expect(result).toHaveProperty("id");
  });

  it("should get comments and return array with created comment", async () => {
    const result: IComment[] = await getCommentsByTaskId(taskId);
    const foundComment: IComment[] = result.filter(
      (comment) => comment.id === commentId,
    );

    expect(result).toBeDefined();
    expect(result).toHaveLength(1);
    expect(foundComment).toBeDefined();
    expect(foundComment).toHaveLength(1);
    expect(foundComment[0]).toStrictEqual(createdComment);
  });

  it("should update comment by id and return comment", async () => {
    const result: IComment = await updateCommentById(
      commentId,
      "Updated comment",
      new Date(),
    );

    updatedComment = result;

    expect(result).toBeDefined();
    expect(result).toHaveProperty("user_id", userId);
    expect(result).toHaveProperty("task_id", taskId);
    expect(result).toHaveProperty("content", "Updated comment");
    expect(result).toHaveProperty("created_at");
    expect(result).toHaveProperty("updated_at");
    expect(result).toHaveProperty("id");
  });

  it("should get comment by id and return updated comment", async () => {
    const result: IComment | null = await getCommentById(commentId);

    expect(result).toBeDefined();
    expect(result).toStrictEqual(updatedComment);
  });

  it("should get comment by id and return null", async () => {
    const result: IComment | null = await getCommentById(
      "f96adcb4-e955-4586-bbe5-cfc0894a0d37",
    );

    expect(result).toBeDefined();
    expect(result).toBe(null);
  });

  it("should delete comment by id and return id", async () => {
    const result: string = await deleteCommentById(commentId);

    expect(result).toBeDefined();
    expect(result).toBe(commentId);
  });

  afterAll(async () => {
    await deleteTask(taskId);
    await pool.query("DELETE FROM projects WHERE id = $1", [projectId]);
    await deleteUser(userId);
  });
});
