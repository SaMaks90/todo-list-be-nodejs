import { NextFunction, Request, Response } from "express";
import { getTaskById } from "../../services/task/task.service";
import * as commentService from "../../services/comment/comment.service";
import { HttpError, IComment, ITask } from "../../types";

const getCommentsByTaskId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { task_id: taskId } = req.params;
    const task: ITask | null = await getTaskById(taskId);

    if (!task) {
      const error = new Error("Task not found");
      (error as HttpError).status = 404;
      return next(error);
    }

    const tasks: IComment[] = await commentService.getCommentsByTaskId(taskId);

    res.status(200).json(tasks);
  } catch (e) {
    next(e);
  }
};

const getCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { comment_id: commentId } = req.params;
    const comment: IComment | null =
      await commentService.getCommentById(commentId);

    res.status(200).json(comment);
  } catch (e) {
    next(e);
  }
};

const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { task_id: taskId } = req.params;
    const { id: userId } = req.user;
    const { content } = req.body;

    const task: ITask | null = await getTaskById(taskId);

    if (!task) {
      const error = new Error("Task not found");
      (error as HttpError).status = 404;
      return next(error);
    }

    const comment: IComment = await commentService.createComment({
      userId,
      taskId,
      content,
    });

    res.status(201).json(comment);
  } catch (e) {
    next(e);
  }
};

const updateCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { comment_id: commentId } = req.params;
    const { content } = req.body;

    const existComment: IComment | null =
      await commentService.getCommentById(commentId);

    if (!existComment) {
      const error = new Error("Comment not found");
      (error as HttpError).status = 404;
      return next(error);
    }

    const updatedComment: IComment = await commentService.updateCommentById(
      commentId,
      content,
      new Date(),
    );

    res.status(200).json(updatedComment);
  } catch (e) {
    next(e);
  }
};

const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { comment_id: commentId } = req.params;

    const existComment: IComment | null =
      await commentService.getCommentById(commentId);

    if (!existComment) {
      const error = new Error("Comment not found");
      (error as HttpError).status = 404;
      return next(error);
    }

    const id: string = await commentService.deleteCommentById(commentId);

    res.status(204).json({ message: `Comment with id ${id} deleted` });
  } catch (e) {
    next(e);
  }
};

export {
  getCommentsByTaskId,
  getCommentById,
  createComment,
  updateCommentById,
  deleteComment,
};
