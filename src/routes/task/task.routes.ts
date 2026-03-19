import { Router } from "express";
import { validateBody, validateParams } from "../../middleware";
import {
  taskIdSchema,
  taskSchema,
  taskUpdateSchema,
  taskUpdateStatusSchema,
  taskUpdatePrioritySchema,
  taskAssignSchema,
} from "../../validation/task.schema";
import {
  getTasksInProject,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  assignUserToTask,
  updateTaskStatus,
  updateTaskPriority,
} from "../../controllers/task/task.controller";
import commentRoutes from "../comment/comment.routes";

const router: Router = Router();

/**
 * @swagger
 * /api/projects/{project_id}/tasks:
 *  get:
 *    summary: Get all tasks in a project
 *    tags: [Tasks]
 *    description: Retrieve a list of all tasks in a project.
 *    parameters:
 *      - $ref: '#/components/parameters/ProjectId'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/TaskResponse'
 *                meta:
 *                  $ref: '#/components/schemas/PaginationMeta'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.get("/", getTasksInProject);

/**
 * @swagger
 * /api/projects/{project_id}/tasks/{task_id}:
 *  get:
 *    summary: Get a task by ID
 *    tags: [Tasks]
 *    description: Retrieve a task by its ID.
 *    parameters:
 *      - $ref: '#/components/parameters/ProjectId'
 *      - $ref: '#/components/parameters/TaskId'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskResponse'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.get("/:task_id", validateParams(taskIdSchema), getTaskById);

/**
 * @swagger
 * /api/projects/{project_id}/tasks:
 *  post:
 *    summary: Create a new task
 *    tags: [Tasks]
 *    description: Create a new task in a project.
 *    parameters:
 *      - $ref: '#/components/parameters/ProjectId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TaskRequest'
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskResponse'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 *      409:
 *        $ref: '#/components/responses/AlreadyExistsError'
 */
router.post("/", validateBody(taskSchema), createTask);

/**
 * @swagger
 * /api/projects/{project_id}/tasks/{task_id}:
 *  put:
 *    summary: Update a task
 *    tags: [Tasks]
 *    description: Update a task in a project.
 *    parameters:
 *      - $ref: '#/components/parameters/ProjectId'
 *      - $ref: '#/components/parameters/TaskId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TaskUpdateRequest'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskResponse'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.put(
  "/:task_id",
  validateParams(taskIdSchema),
  validateBody(taskUpdateSchema),
  updateTask,
);

/**
 * @swagger
 * /api/projects/{project_id}/tasks/{task_id}:
 *  delete:
 *    summary: Delete a task
 *    tags: [Tasks]
 *    description: Delete a task from a project.
 *    parameters:
 *      - $ref: '#/components/parameters/ProjectId'
 *      - $ref: '#/components/parameters/TaskId'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message: { type: string, example: 'Task with id {task_id} deleted' }
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.delete("/:task_id", validateParams(taskIdSchema), deleteTask);

/**
 * @swagger
 * /api/projects/{project_id}/tasks/{task_id}/assign:
 *  patch:
 *    summary: Assign a user to a task
 *    tags: [Tasks]
 *    description: Assign a user to a task in a project.
 *    parameters:
 *      - $ref: '#/components/parameters/ProjectId'
 *      - $ref: '#/components/parameters/TaskId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TaskUpdateAssignRequest'
 *    response:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskResponse'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.patch(
  "/:task_id/assign",
  validateParams(taskIdSchema),
  validateBody(taskAssignSchema),
  assignUserToTask,
);

/**
 * @swagger
 * /api/projects/{project_id}/tasks/{task_id}/status:
 *  patch:
 *    summary: Update the status of a task
 *    tags: [Tasks]
 *    description: Update the status of a task in a project.
 *    parameters:
 *      - $ref: '#/components/parameters/ProjectId'
 *      - $ref: '#/components/parameters/TaskId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TaskUpdateStatusRequest'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskResponse'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.patch(
  "/:task_id/status",
  validateParams(taskIdSchema),
  validateBody(taskUpdateStatusSchema),
  updateTaskStatus,
);

/**
 * @swagger
 * /api/projects/{project_id}/tasks/{task_id}/priority:
 *  patch:
 *    summary: Update the priority of a task
 *    tags: [Tasks]
 *    description: Update the priority of a task in a project.
 *    parameters:
 *      - $ref: '#/components/parameters/ProjectId'
 *      - $ref: '#/components/parameters/TaskId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TaskUpdatePriorityRequest'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskResponse'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.patch(
  "/:task_id/priority",
  validateParams(taskIdSchema),
  validateBody(taskUpdatePrioritySchema),
  updateTaskPriority,
);
router.use("/:task_id/comments", validateParams(taskIdSchema), commentRoutes);

export default router;
