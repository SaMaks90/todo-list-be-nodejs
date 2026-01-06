import { Pool } from "pg";
import { env } from "./env";

const { DATABASE_URL } = env;

export const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
