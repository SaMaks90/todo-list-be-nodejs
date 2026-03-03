import { Router } from "express";
import { validateParams, validateBody } from "../../middleware";
import {
  commentIdSchema,
  commentSchema,
} from "../../validation/comment.schema";
import * as commentController from "../../controllers/comment/comment.controller";

const router: Router = Router();

router.get("/", commentController.getCommentsByTaskId);
router.get(
  "/:comment_id",
  validateParams(commentIdSchema),
  commentController.getCommentById,
);
router.post("/", validateBody(commentSchema), commentController.createComment);
router.put(
  "/:comment_id",
  validateParams(commentIdSchema),
  validateBody(commentSchema),
  commentController.updateCommentById,
);
router.delete(
  "/:comment_id",
  validateParams(commentIdSchema),
  commentController.deleteComment,
);

export default router;
