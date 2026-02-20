import * as taskService from "../task.service";
import * as userService from "../../user/user.service";
import * as projectService from "../../project/project.service";
import { IPaginatedResponse, IProfileUser, ITask } from "../../../types";
import { pool } from "../../../config/db";

let taskId: string;
let userId: string;
let projectId: string;
let createdTask: Omit<
  ITask,
  "id" | "user_id" | "created_at" | "updated_at" | "project_id"
>;

const checkDataTask = (
  result: ITask | null,
  task: Omit<
    ITask,
    "id" | "user_id" | "created_at" | "updated_at" | "project_id"
  >,
) => {
  expect(result).toBeDefined();
  expect(result).toHaveProperty("title", task.title);
  expect(result).toHaveProperty("description", task.description);
  expect(result).toHaveProperty("status", task.status);
  expect(result).toHaveProperty("priority", task.priority);
  expect(result).toHaveProperty("assigned_to_id", task.assigned_to_id);
};

describe("Task Services", () => {
  beforeAll(async () => {
    const user: IProfileUser = await userService.createUser(
      "tester@test.com",
      "tester",
      "password",
    );
    userId = user.id;
    const project = await projectService.createProject({
      name: "Testing",
      ownerId: userId,
    });
    projectId = project.id;

    createdTask = {
      title: "Task Testing",
      description: "task testing description",
      status: "open",
      priority: "low",
      assigned_to_id: userId,
    };
  });

  it("should get tasks by project id and return pagination data", async () => {
    const result: IPaginatedResponse<ITask> =
      await taskService.getTasksInProject(projectId);

    expect(result).toBeDefined();
    expect(result.data).toHaveLength(0);
    expect(result.meta.count).toBe(0);
    expect(result.meta.total).toBe(0);
    expect(result.meta.page).toBe(1);
    expect(result.meta.limit).toBe(10);
  });

  it("should get all tasks and return pagination data", async () => {
    const result: IPaginatedResponse<ITask> = await taskService.getTasks();

    expect(result).toBeDefined();
    expect(result.meta.limit).toBe(10);
    expect(result.meta.page).toBe(1);
  });

  it("should get task by id and return task data", async () => {
    const testTaskId = "e17176d0-d773-4fb6-8659-5f039119bce9";
    const result: ITask | null = await taskService.getTaskById(testTaskId);

    expect(result).toBeDefined();
    expect(result).toBeNull();
  });

  it("should create task and return task data", async () => {
    const result: ITask = await taskService.createTask({
      ...createdTask,
      project_id: projectId,
      user_id: userId,
    });

    taskId = result.id;

    checkDataTask(result, createdTask);
  });

  it("should get task by id and return task data", async () => {
    const result: ITask | null = await taskService.getTaskById(taskId);

    checkDataTask(result, createdTask);
  });

  it("should get task by project id and title and return task", async () => {
    const result: ITask | null = await taskService.getTaskByProjectIdAndTitle(
      projectId,
      createdTask.title,
    );

    checkDataTask(result, createdTask);
  });

  it("should get task by project id and title and return null", async () => {
    const result: ITask | null = await taskService.getTaskByProjectIdAndTitle(
      projectId,
      "Abracadabra task title that doesn't exist in the database.",
    );

    expect(result).toBeDefined();
    expect(result).toBeNull();
  });

  it("should update task and return task data", async () => {
    const result: ITask = await taskService.updateTask(taskId, {
      title: "Updated task",
      description: "Updated task description",
      updatedAt: new Date(),
    });

    createdTask = result;

    checkDataTask(result, createdTask);
  });

  it("should update task priority and return task data", async () => {
    const result: ITask = await taskService.updateTaskPriority(
      taskId,
      "medium",
      new Date(),
    );

    createdTask = result;

    checkDataTask(result, createdTask);
  });

  it("should assign user to task and return task data", async () => {
    const result: ITask = await taskService.assignUserToTask(
      taskId,
      "579a2221-8d90-4450-910c-1cc7c9afbbb1",
      new Date(),
    );

    createdTask = result;

    checkDataTask(result, createdTask);
  });

  it("should update task status and return task data", async () => {
    const result: ITask = await taskService.updateTaskStatus(
      taskId,
      "closed",
      new Date(),
    );

    createdTask = result;

    checkDataTask(result, createdTask);
  });

  it("should delete task and return task id", async () => {
    const result: string = await taskService.deleteTask(taskId);
    expect(result).toBeDefined();
    expect(result).toEqual(taskId);
    taskId = "";
  });

  afterAll(async () => {
    if (taskId) {
      await taskService.deleteTask(taskId);
    }

    if (projectId) {
      await pool.query("DELETE FROM projects WHERE id = $1", [projectId]);
    }

    if (userId) {
      await userService.deleteUser(userId);
    }
  });
});
