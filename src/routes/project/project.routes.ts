import { Router } from "express";
import * as projectController from "../../controllers/project/project.controllers";
import {
  validateBody,
  validateParams,
  projectExistsMiddleware,
} from "../../middleware";
import {
  projectIdSchema,
  projectSchema,
  projectUpdateSchema,
} from "../../validation/project.schema";
import projectMemberRoutes from "../project.member/project.member.routes";

const router: Router = Router();

router.get("/", projectController.getProjects);
router.get(
  "/:project_id",
  validateParams(projectIdSchema),
  projectController.getProjectId,
);
router.post("/", validateBody(projectSchema), projectController.createProject);
router.put(
  "/:project_id",
  validateParams(projectIdSchema),
  validateBody(projectUpdateSchema),
  projectController.updateProject,
);
router.use(
  "/:project_id/members",
  validateParams(projectIdSchema),
  projectExistsMiddleware,
  projectMemberRoutes,
);

export default router;
