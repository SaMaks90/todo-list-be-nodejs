import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registrationSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6),
});

export const updateProfileSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().min(3).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegistrationInput = z.infer<typeof registrationSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
