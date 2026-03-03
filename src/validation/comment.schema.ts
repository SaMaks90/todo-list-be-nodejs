import { z } from "zod";

const commentIdSchema = z.object({
  comment_id: z.string().uuid(),
});

const commentSchema = z.object({
  content: z.string().min(3),
});

export { commentIdSchema, commentSchema };
