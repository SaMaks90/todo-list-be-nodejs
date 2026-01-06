import { Request, Response, NextFunction } from "express";
import * as projectMemberService from "../../services/project.member/project.member.service";
import { HttpError } from "../../types";

const getProjectMembers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { projectId } = req;
    const members =
      await projectMemberService.getProjectMembersInProject(projectId);
    res.status(200).json(members);
  } catch (e) {
    next(e);
  }
};

const addProjectMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { projectId } = req;
    const { user_id: userId, role } = req.body;

    const existsMember = await projectMemberService.getProjectMemberInProject(
      projectId,
      userId,
    );

    if (existsMember) {
      const error = new Error("User already exists in project");
      (error as HttpError).status = 409;
      return next(error);
    }

    const member = await projectMemberService.addMemberToProject(
      projectId,
      userId,
      role,
    );
    res.status(201).json(member);
  } catch (e) {
    next(e);
  }
};

const updateUserRoleInProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { member_id: projectMemberId } = req.params;
    const { projectId } = req;

    const member = await projectMemberService.getProjectMemberInProject(
      projectId,
      projectMemberId,
    );

    if (!member) {
      const error = new Error("Project member id doesn't exist in project");
      (error as HttpError).status = 404;
      return next(error);
    }

    const { role } = req.body;

    const result = await projectMemberService.updateMemberRoleInProject(
      projectMemberId,
      role,
    );

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const removeProjectMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { member_id: projectMemberId } = req.params;
    const { projectId } = req;

    const member = await projectMemberService.getProjectMemberInProject(
      projectId,
      projectMemberId,
    );

    if (!member) {
      const error = new Error("Project member id doesn't exist in project");
      (error as HttpError).status = 404;
      return next(error);
    }

    await projectMemberService.deleteMemberFromProject(projectMemberId);

    res.status(200).json({ message: "User successfully deleted" });
  } catch (e) {
    next(e);
  }
};

export {
  addProjectMember,
  updateUserRoleInProject,
  removeProjectMember,
  getProjectMembers,
};
