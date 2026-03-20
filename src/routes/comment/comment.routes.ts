import { Router } from "express";
import { validateParams, validateBody } from "../../middleware";
import {
  commentIdSchema,
  commentSchema,
} from "../../validation/comment.schema";
import * as commentController from "../../controllers/comment/comment.controller";

const router: Router = Router();

/**
 * @swagger
 * /api/tasks/{task_id}/comments:
 *  get:
 *    summary: Get all comments
 *    tags: [Comments]
 *    description: Retrieve a list of all comments for task.
 *    parameters:
 *      - $ref: '#/components/parameters/TaskId'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CommentResponse'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/", commentController.getCommentsByTaskId);

/**
 * @swagger
 * /api/tasks/{task_id}/comments/{comment_id}:
 *  get:
 *    summary: Get comment by ID
 *    tags: [Comments]
 *    description: Retrieve a comment by its ID.
 *    parameters:
 *      - $ref: '#/components/parameters/TaskId'
 *      - $ref: '#/components/parameters/CommentId'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CommentResponse'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.get(
  "/:comment_id",
  validateParams(commentIdSchema),
  commentController.getCommentById,
);

/**
 * @swagger
 * /api/tasks/{task_id}/comments:
 *  post:
 *    summary: Create a new comment
 *    tags: [Comments]
 *    description: Create a new comment for a task.
 *    parameters:
 *      - $ref: '#/components/parameters/TaskId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CommentRequest'
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CommentResponse'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.post("/", validateBody(commentSchema), commentController.createComment);

/**
 * @swagger
 * /api/tasks/{task_id}/comments/{comment_id}:
 *  put:
 *    summary: Update a comment
 *    tags: [Comments]
 *    description: Update a comment by its ID.
 *    parameters:
 *      - $ref: '#/components/parameters/TaskId'
 *      - $ref: '#/components/parameters/CommentId'
 *    requestBody:
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CommentResponse'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.put(
  "/:comment_id",
  validateParams(commentIdSchema),
  validateBody(commentSchema),
  commentController.updateCommentById,
);

/**
 * @swagger
 * /api/tasks/{task_id}/comments/{comment_id}:
 *  delete:
 *    summary: Delete a comment
 *    tags: [Comments]
 *    description: Delete a comment by its ID.
 *    parameters:
 *      - $ref: '#/components/parameters/TaskId'
 *      - $ref: '#/components/parameters/CommentId'
 *    responses:
 *      204:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CommentResponse'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.delete(
  "/:comment_id",
  validateParams(commentIdSchema),
  commentController.deleteComment,
);

export default router;
