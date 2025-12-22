import { Request, Response, NextFunction } from "express";
import { IProject } from "../../types";
import * as projectService from "../../services/project/project.service";

const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.user;
    const projects: IProject[] = await projectService.getProjects(userId);
    res.status(200).json(projects);
  } catch (e) {
    next(e);
  }
};

const getProjectId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { project_id: projectId } = req.params;
    const project: IProject | null =
      await projectService.getProjectById(projectId);
    res.status(200).json(project);
  } catch (e) {
    next(e);
  }
};

const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;
    const { id: userId } = req.user;

    const existProject: boolean = await projectService.checkDuplicateProject(
      name,
      userId,
    );
    if (existProject) {
      const error = new Error("Project already exists");
      (error as any).status = 409;
      return next(error);
    }

    const project: IProject = await projectService.createProject({
      ownerId: userId,
      name,
    });

    res.status(201).json({ ...project });
  } catch (e) {
    next(e);
  }
};

const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId } = req.user;
    const { project_id: projectId } = req.params;
    const { name } = req.body;

    const existProject: boolean = await projectService.checkDuplicateProject(
      name,
      userId,
    );
    if (existProject) {
      const error = new Error("Project already exists");
      (error as any).status = 409;
      return next(error);
    }

    const project: IProject = await projectService.updateProject({
      projectId: projectId,
      updatedAt: new Date(),
      name,
    });
    res.status(200).json({ ...project });
  } catch (e) {
    next(e);
  }
};

export { getProjects, createProject, updateProject, getProjectId };
