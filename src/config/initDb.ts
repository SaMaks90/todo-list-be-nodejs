import { pool } from "./db";

const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        username VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (name, owner_id)
      );

      CREATE TABLE IF NOT EXISTS project_members (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
        role VARCHAR(10) NOT NULL DEFAULT 'member'
          CHECK (role IN ('owner', 'member')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(project_id, user_id)
      );

      CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        project_id UUID REFERENCES projects(id),
        title VARCHAR(100) NOT NULL,
        description TEXT,
        status VARCHAR(10) NOT NULL DEFAULT 'open'
          CHECK (status IN ('open', 'in progress', 'closed')),
        priority VARCHAR(10) NOT NULL DEFAULT 'low'
          CHECK (priority IN ('low', 'medium', 'high')),
        user_id UUID REFERENCES users(id),
        assigned_to_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(project_id, title)
      );

      CREATE TABLE IF NOT EXISTS payments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id),
        amount INTEGER NOT NULL,
        currency VARCHAR(3) NOT NULL DEFAULT 'USD'
          CHECK (currency IN ('USD', 'EUR', 'UAH', 'PLN')),
        status VARCHAR(10) NOT NULL DEFAULT 'pending'
          CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
        idempotency_key TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(idempotency_key, user_id)
      )
    `);

    console.log("Tables successfully created or already exist");
    return { message: "Tables successfully created or already exist" };
  } catch (error) {
    console.error("Database initialization error:" + error);
    return { error: "Database initialization error: " + error };
  }
};

export default initDb;
