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

const router: Router = Router();

router.get("/", getTasksInProject);
router.get("/:task_id", validateParams(taskIdSchema), getTaskById);
router.post("/", validateBody(taskSchema), createTask);
router.put(
  "/:task_id",
  validateParams(taskIdSchema),
  validateBody(taskUpdateSchema),
  updateTask,
);
router.delete("/:task_id", validateParams(taskIdSchema), deleteTask);
router.patch(
  "/:task_id/assign",
  validateParams(taskIdSchema),
  validateBody(taskAssignSchema),
  assignUserToTask,
);
router.patch(
  "/:task_id/status",
  validateParams(taskIdSchema),
  validateBody(taskUpdateStatusSchema),
  updateTaskStatus,
);
router.patch(
  "/:task_id/priority",
  validateParams(taskIdSchema),
  validateBody(taskUpdatePrioritySchema),
  updateTaskPriority,
);

export default router;
