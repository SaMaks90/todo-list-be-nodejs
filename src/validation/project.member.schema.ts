import { z } from "zod";

export const projectMemberIdSchema = z.object({
  member_id: z.string().uuid(),
});

export const projectMemberSchema = z.object({
  user_id: z.string().uuid(),
  role: z.enum(["owner", "member"]),
});

export const projectMemberUpdateSchema = z.object({
  role: z.enum(["owner", "member"]),
});

export type ProjectMemberIdInput = z.infer<typeof projectMemberIdSchema>;
export type ProjectMemberInput = z.infer<typeof projectMemberSchema>;
export type ProjectMemberUpdateInput = z.infer<
  typeof projectMemberUpdateSchema
>;
