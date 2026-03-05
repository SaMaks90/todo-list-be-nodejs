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
import tasksRoutes from "../task/task.routes";

const router: Router = Router();

/**
 * @swagger
 * /api/projects:
 *  get:
 *    summary: Get all projects
 *    tags: [Projects]
 *    description: Retrieve a list of all projects.
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ProjectResponse'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/", projectController.getProjects);

/**
 * @swagger
 * /api/projects/{project_id}:
 *  get:
 *    summary: Get a project by ID
 *    tags: [Projects]
 *    description: Retrieve a project by its ID.
 *    parameters:
 *      - $ref: '#/components/parameters/ProjectId'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProjectResponse'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get(
  "/:project_id",
  validateParams(projectIdSchema),
  projectController.getProjectId,
);

/**
 * @swagger
 * /api/projects:
 *  post:
 *    summary: Create a new project
 *    tags: [Projects]
 *    description: Create a new project.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ProjectRequest'
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProjectResponse'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      409:
 *        $ref: '#/components/responses/AlreadyExistsError'
 */
router.post("/", validateBody(projectSchema), projectController.createProject);

/**
 * @swagger
 * /api/projects/{project_id}:
 *  put:
 *    summary: Update a project
 *    tags: [Projects]
 *    description: Update a project by its ID.
 *    parameters:
 *      - $ref: '#/components/parameters/ProjectId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ProjectRequest'
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProjectResponse'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      409:
 *        $ref: '#/components/responses/AlreadyExistsError'
 */
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
router.use(
  "/:project_id/tasks",
  validateParams(projectIdSchema),
  projectExistsMiddleware,
  tasksRoutes,
);

export default router;
