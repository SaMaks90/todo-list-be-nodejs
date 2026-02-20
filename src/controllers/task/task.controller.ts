import { Request, Response, NextFunction } from "express";
import * as taskService from "../../services/task/task.service";
import * as userService from "../../services/user/user.service";
import {
  HttpError,
  IPaginatedResponse,
  IProfileUser,
  ITask,
} from "../../types";

const getTasksInProject = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { projectId } = req;

  const tasks: IPaginatedResponse<ITask> =
    await taskService.getTasksInProject(projectId);

  res.status(200).json(tasks);
};

const getTasks = async (_req: Request, res: Response, _next: NextFunction) => {
  const tasks: IPaginatedResponse<ITask> = await taskService.getTasks();

  res.status(200).json(tasks);
};

const getTaskById = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { task_id: taskId } = req.params;
  const task: ITask | null = await taskService.getTaskById(taskId);

  res.status(200).json(task);
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const { projectId } = req;
  const { id: userId } = req.user;
  const data = req.body;
  const existTask = await taskService.getTaskByProjectIdAndTitle(
    projectId,
    data.title,
  );

  if (existTask) {
    const error = new Error(
      "Task with this title already exists in this project.",
    );
    (error as HttpError).status = 409;
    return next(error);
  }

  const createData = {
    ...data,
    project_id: projectId,
    assigned_to_id: data?.assigned_to_id ? data?.assigned_to_id : userId,
  };

  const task: ITask = await taskService.createTask(createData);

  res.status(201).json(task);
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  const { task_id: taskId } = req.params;
  const data = req.body;

  const task: ITask | null = await taskService.getTaskById(taskId);

  if (task) {
    const error = new Error("Task not found");
    (error as HttpError).status = 404;
    return next(error);
  }

  const updatedData = {
    ...data,
    updatedAt: new Date(),
  };
  const updatedTask: ITask = await taskService.updateTask(taskId, updatedData);

  res.status(200).json(updatedTask);
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const { task_id: taskId } = req.params;
  const task: ITask | null = await taskService.getTaskById(taskId);

  if (!task) {
    const error = new Error("Task not found");
    (error as HttpError).status = 404;
    return next(error);
  }

  const deletedTaskId = await taskService.deleteTask(taskId);
  res.status(200).json({ message: `Task with id ${deletedTaskId} deleted` });
};

const assignUserToTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { task_id: taskId } = req.params;
  const { assigned_to_id: assignUser } = req.body;

  const task: ITask | null = await taskService.getTaskById(taskId);
  const user: IProfileUser | null = await userService.getUserById(assignUser);

  if (!task) {
    const error = new Error("Task not found");
    (error as HttpError).status = 404;
    return next(error);
  }

  if (!user) {
    const error = new Error("User not found");
    (error as HttpError).status = 404;
    return next(error);
  }

  const updatedTask: ITask = await taskService.assignUserToTask(
    taskId,
    assignUser,
    new Date(),
  );

  res.status(200).json(updatedTask);
};

const updateTaskStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { task_id: taskId } = req.params;
  const { status } = req.body;
  const task: ITask | null = await taskService.getTaskById(taskId);

  if (!task) {
    const error = new Error("Task not found");
    (error as HttpError).status = 404;
    return next(error);
  }
  const updatedTask = await taskService.updateTaskStatus(
    taskId,
    status,
    new Date(),
  );

  res.status(200).json(updatedTask);
};

const updateTaskPriority = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { task_id: taskId } = req.params;
  const { priority } = req.body;
  const task: ITask | null = await taskService.getTaskById(taskId);

  if (!task) {
    const error = new Error("Task not found");
    (error as HttpError).status = 404;
    return next(error);
  }

  const updateTask = await taskService.updateTaskPriority(
    taskId,
    priority,
    new Date(),
  );

  res.status(200).json(updateTask);
};

export {
  getTasksInProject,
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  assignUserToTask,
  updateTaskStatus,
  updateTaskPriority,
};
