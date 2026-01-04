import { Router } from "express";
import * as projectMemberController from "../../controllers/project.member/project.member.controller";
import { validateParams, validateBody } from "../../middleware";
import {
  projectMemberSchema,
  projectMemberIdSchema,
  projectMemberUpdateSchema,
} from "../../validation/project.member.schema";

const router: Router = Router();

router.get("/", projectMemberController.getProjectMembers);
router.post(
  "/",
  validateBody(projectMemberSchema),
  projectMemberController.addProjectMember,
);
router.put(
  "/:member_id",
  validateParams(projectMemberIdSchema),
  validateBody(projectMemberUpdateSchema),
  projectMemberController.updateUserRoleInProject,
);
router.delete(
  "/:member_id",
  validateParams(projectMemberIdSchema),
  projectMemberController.removeProjectMember,
);

export default router;
