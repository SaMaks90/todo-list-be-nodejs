import { z } from "zod";

export const projectIdSchema = z.object({
  project_id: z.string().uuid("Invalid project ID format"),
});

export const projectSchema = z.object({
  name: z.string().min(3).max(100),
});

export const projectUpdateSchema = z.object({
  name: z.string().min(3).max(100),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
export type ProjectIdInput = z.infer<typeof projectIdSchema>;
