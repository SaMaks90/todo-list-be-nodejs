import { z } from "zod";

const envShema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.string().default("3000"),
  DATABASE_URL: z.string(),
  SECRET_KEY: z.string().min(32, "Secret key must be at least 32 characters"),
});

export const env = envShema.parse(process.env);

export type Env = typeof env;
