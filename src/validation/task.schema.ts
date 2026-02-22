import { z } from "zod";

export const taskIdSchema = z.object({
  task_id: z.string().uuid("Invalid task ID format"),
});

export const taskSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string(),
  status: z.enum(["open", "in_progress", "closed"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  assigned_to_id: z.string().uuid().optional(),
});

export const taskUpdateSchema = z
  .object({
    title: z.string().min(3).max(100).optional(),
    description: z.string().optional().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const taskUpdateStatusSchema = z.object({
  status: z.enum(["open", "in progress", "closed"]),
});

export const taskUpdatePrioritySchema = z.object({
  priority: z.enum(["low", "medium", "high"]),
});

export const taskAssignSchema = z.object({
  assigned_to_id: z.string().uuid(),
});
