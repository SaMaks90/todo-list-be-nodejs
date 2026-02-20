import * as taskController from "../task.controller";
import * as taskService from "../../../services/task/task.service";
import * as userService from "../../../services/user/user.service";
import { mockNext, mockRequest, mockResponse } from "../../../types/mocks";
import { IPaginatedResponse, IProfileUser, ITask } from "../../../types";

jest.mock("../../../services/task/task.service");
jest.mock("../../../services/user/user.service");

const paginationData: IPaginatedResponse<ITask> = {
  data: [],
  meta: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    count: 0,
  },
};
const userId = "f4f8116e-9dbb-47f1-9db7-4af62ad35e09";
const projectId = "0eae854c-8b53-491d-b598-8c02f1bdf0c1";
const taskId = "e48b8cb7-29a1-4a11-9194-d9481cde1088";
const task: ITask = {
  title: "Test",
  id: taskId,
  status: "in progress",
  assigned_to_id: "",
  created_at: new Date(),
  priority: "low",
  description: "test",
  project_id: projectId,
  user_id: userId,
  updated_at: new Date(),
};
const user: IProfileUser = {
  id: "f4f8116e-9dbb-47f1-9db7-4af62ad32e09",
  email: "test@test.com",
  created_at: new Date(),
  updated_at: new Date(),
  username: "test",
};

describe("TaskController", () => {
  let req: ReturnType<typeof mockRequest>;
  let next: ReturnType<typeof mockNext>;
  let res: ReturnType<typeof mockResponse>;

  beforeAll(async () => {
    req = mockRequest({
      user: { id: userId },
      projectId,
    });
    res = mockResponse();
    next = jest.fn();
  });

  it("should return 200 and pagination data when get tasks in project", async () => {
    const mockedGetTasksByProject =
      taskService.getTasksInProject as jest.MockedFunction<
        typeof taskService.getTasksInProject
      >;

    mockedGetTasksByProject.mockResolvedValue(paginationData);

    await taskController.getTasksInProject(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(paginationData);
  });

  it("should return 200 and pagination data when get all tasks", async () => {
    const mockedGetTask = taskService.getTasks as jest.MockedFunction<
      typeof taskService.getTasks
    >;

    mockedGetTask.mockResolvedValue(paginationData);

    await taskController.getTasks(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(paginationData);
  });

  it("should return 200 and null if task not found when get task by id", async () => {
    const mockedGetTaskById = taskService.getTaskById as jest.MockedFunction<
      typeof taskService.getTaskById
    >;
    mockedGetTaskById.mockResolvedValue(null);

    await taskController.getTaskById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(null);
  });

  it("should return 200 and data task when get task by id", async () => {
    const mockedGetTaskById = taskService.getTaskById as jest.MockedFunction<
      typeof taskService.getTaskById
    >;
    mockedGetTaskById.mockResolvedValue(task as ITask);

    await taskController.getTaskById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(task);
  });

  it("should return 409 and error message task already exist when create task", async () => {
    const mockedGetTaskByProjectIdAndTitle =
      taskService.getTaskByProjectIdAndTitle as jest.MockedFunction<
        typeof taskService.getTaskByProjectIdAndTitle
      >;
    mockedGetTaskByProjectIdAndTitle.mockResolvedValue(task);

    await taskController.createTask(req, res, next);

    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.message).toBe(
      "Task with this title already exists in this project.",
    );
    expect(error.status).toBe(409);
  });

  it("should return 201 and data task when create task", async () => {
    const mockedGetTaskByProjectIdAndTitle =
      taskService.getTaskByProjectIdAndTitle as jest.MockedFunction<
        typeof taskService.getTaskByProjectIdAndTitle
      >;
    mockedGetTaskByProjectIdAndTitle.mockResolvedValue(null);
    const mockedPostCreateTask = taskService.createTask as jest.MockedFunction<
      typeof taskService.createTask
    >;
    mockedPostCreateTask.mockResolvedValue(task);

    await taskController.createTask(req, res, next);

    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(task);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 404 and error message task not found when update task", async () => {
    const mockedGetTaskById = taskService.getTaskById as jest.MockedFunction<
      typeof taskService.getTaskById
    >;
    mockedGetTaskById.mockResolvedValue(task as ITask);

    await taskController.updateTask(req, res, next);

    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.message).toBe("Task not found");
    expect(error.status).toBe(404);
  });

  it("should return 200 and data task when update task", async () => {
    const mockedGetTaskById = taskService.getTaskById as jest.MockedFunction<
      typeof taskService.getTaskById
    >;
    mockedGetTaskById.mockResolvedValue(null);
    const mockedPostUpdateTask = taskService.updateTask as jest.MockedFunction<
      typeof taskService.updateTask
    >;
    mockedPostUpdateTask.mockResolvedValue(task);

    await taskController.updateTask(req, res, next);

    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(task);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 404 and error message task not found when assign user to task", async () => {
    const mockedGetTaskById = taskService.getTaskById as jest.MockedFunction<
      typeof taskService.getTaskById
    >;
    mockedGetTaskById.mockResolvedValue(null);

    await taskController.assignUserToTask(req, res, next);

    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.message).toBe("Task not found");
    expect(error.status).toBe(404);
  });

  it("should return 404 and error message user not found when assign user to task", async () => {
    const mockedGetTaskById = taskService.getTaskById as jest.MockedFunction<
      typeof taskService.getTaskById
    >;
    mockedGetTaskById.mockResolvedValue(task as ITask);

    const mockedGetUserById = userService.getUserById as jest.MockedFunction<
      typeof userService.getUserById
    >;
    mockedGetUserById.mockResolvedValue(null);

    await taskController.assignUserToTask(req, res, next);

    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.message).toBe("User not found");
    expect(error.status).toBe(404);
  });

  it("should return 200 and data task when assign user to task", async () => {
    const assignedUserId = "b6e12988-fa44-4c30-b4d5-100549db7028";
    const mockedGetTaskById = taskService.getTaskById as jest.MockedFunction<
      typeof taskService.getTaskById
    >;
    mockedGetTaskById.mockResolvedValue(task as ITask);

    const mockedGetUserById = userService.getUserById as jest.MockedFunction<
      typeof userService.getUserById
    >;
    mockedGetUserById.mockResolvedValue(user);
    const mockedAssignedUserToTask =
      taskService.assignUserToTask as jest.MockedFunction<
        typeof taskService.assignUserToTask
      >;
    mockedAssignedUserToTask.mockResolvedValue({
      ...task,
      assigned_to_id: assignedUserId,
    });

    await taskController.assignUserToTask(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      ...task,
      assigned_to_id: assignedUserId,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 404 and error message task not found when update task status", async () => {
    const mockedGetTaskById = taskService.getTaskById as jest.MockedFunction<
      typeof taskService.getTaskById
    >;
    mockedGetTaskById.mockResolvedValue(null);

    await taskController.updateTaskStatus(req, res, next);

    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.message).toBe("Task not found");
    expect(error.status).toBe(404);
  });

  it("should return 200 and data task when update task status", async () => {});

  it("should return 404 and error message task not found when update task priority", async () => {
    const mockedGetTaskById = taskService.getTaskById as jest.MockedFunction<
      typeof taskService.getTaskById
    >;
    mockedGetTaskById.mockResolvedValue(null);

    await taskController.updateTaskPriority(req, res, next);

    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.message).toBe("Task not found");
    expect(error.status).toBe(404);
  });

  it("should return 200 and data task when update task priority", async () => {
    const updatedPriority = "high";
    const mockedGetTaskById = taskService.getTaskById as jest.MockedFunction<
      typeof taskService.getTaskById
    >;
    mockedGetTaskById.mockResolvedValue(task as ITask);
    const mockedUpdateTaskPriority =
      taskService.updateTaskPriority as jest.MockedFunction<
        typeof taskService.updateTaskPriority
      >;
    mockedUpdateTaskPriority.mockResolvedValue({
      ...task,
      priority: updatedPriority,
    });

    await taskController.updateTaskPriority(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      ...task,
      priority: updatedPriority,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 404 and error message task not found when delete task", async () => {
    const mockedGetTaskById = taskService.getTaskById as jest.MockedFunction<
      typeof taskService.getTaskById
    >;
    mockedGetTaskById.mockResolvedValue(null);

    await taskController.deleteTask(req, res, next);

    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.message).toBe("Task not found");
    expect(error.status).toBe(404);
  });

  it("should return 200 and message when delete task", async () => {
    const mockedGetTaskById = taskService.getTaskById as jest.MockedFunction<
      typeof taskService.getTaskById
    >;
    mockedGetTaskById.mockResolvedValue(task as ITask);
    const mockedDeleteTaskById = taskService.deleteTask as jest.MockedFunction<
      typeof taskService.deleteTask
    >;
    mockedDeleteTaskById.mockResolvedValue(task.id);

    await taskController.deleteTask(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      message: `Task with id ${task.id} deleted`,
    });
    expect(next).not.toHaveBeenCalled();
  });
});
