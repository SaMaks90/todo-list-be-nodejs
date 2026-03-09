import { Router } from "express";
import * as projectMemberController from "../../controllers/project.member/project.member.controller";
import { validateParams, validateBody } from "../../middleware";
import {
  projectMemberSchema,
  projectMemberIdSchema,
  projectMemberUpdateSchema,
} from "../../validation/project.member.schema";

const router: Router = Router();

/**
 * @swagger
 * /api/projects/{project_id}/members:
 *  get:
 *    summary: Get all members of a project
 *    tags: [ProjectMembers]
 *    description: Retrieve a list of all members of a project.
 *    parameters:
 *      - $ref: '#/components/parameters/ProjectId'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProjectMemberResponse'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.get("/", projectMemberController.getProjectMembers);

/**
 * @swagger
 * /api/projects/{project_id}/members:
 *  post:
 *    summary: Add a new member to a project
 *    tags: [ProjectMembers]
 *    description: Add a new member to a project.
 *    parameters:
 *      - $ref: '#/components/parameters/ProjectId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ProjectMemberRequest'
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProjectMemberResponse'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 *      409:
 *        $ref: '#/components/responses/AlreadyExistsError'
 */
router.post(
  "/",
  validateBody(projectMemberSchema),
  projectMemberController.addProjectMember,
);

/**
 * @swagger
 * /api/projects/{project_id}/members/{member_id}:
 *  put:
 *    summary: Update the role of a member in a project
 *    tags: [ProjectMembers]
 *    description: Update the role of a member in a project.
 *    parameters:
 *      - $ref: '#/components/parameters/ProjectId'
 *      - $ref: '#/components/parameters/ProjectMemberId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ProjectMemberUpdateRequest'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProjectMemberResponse'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.put(
  "/:member_id",
  validateParams(projectMemberIdSchema),
  validateBody(projectMemberUpdateSchema),
  projectMemberController.updateUserRoleInProject,
);

/**
 * @swagger
 * /api/projects/{project_id}/members/{member_id}:
 *  delete:
 *    summary: Remove a member from a project
 *    tags: [ProjectMembers]
 *    description: Remove a member from a project.
 *    parameters:
 *      - $ref: '#/components/parameters/ProjectId'
 *      - $ref: '#/components/parameters/ProjectMemberId'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              description: Member removed successfully
 *              properties:
 *                message: { type: string, example: 'Member removed successfully' }
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFoundError'
 */
router.delete(
  "/:member_id",
  validateParams(projectMemberIdSchema),
  projectMemberController.removeProjectMember,
);

export default router;
