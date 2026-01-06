import { NextFunction, Request, Response } from "express";
import { getProjectById } from "../services/project/project.service";
import { HttpError } from "../types";

const projectExistsMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const { project_id: projectId } = req.params;
    const project = await getProjectById(projectId);

    if (!project) {
      const error = new Error("Project not found");
      (error as HttpError).status = 404;
      return next(error);
    }

    req.projectId = projectId;

    next();
  } catch (e) {
    next(e);
  }
};

export { projectExistsMiddleware };
