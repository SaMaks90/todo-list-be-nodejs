import { pool } from "./db";

const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Tables successfully created or already exist");
    return { message: "Tables successfully created or already exist" };
  } catch (error) {
    console.error("Database initialization error:" + error);
    return { error: "Database initialization error: " + error };
  }
};

export default initDb;
