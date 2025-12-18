# Development Plan

## Step 1: User/Auth - done
- Models: users (username, email, password, created_at, updated_at)
- Services: create/get by id/get by email/update/delete user
- Middleware: auth middleware, validation middleware
- Controllers:
  - /api/auth/ - login, registration, profile (update and delete)
  - /database/init - initial database setup
- Unit tests: services + controllers
- Validation: /api/auth/

## Step 2: Tasks Core - doing
- Models: tasks (title, description, status, priority, user_id FK)
- Services: create/read/update/delete tasks
- Controllers: /api/tasks (CRUD and filters: status, priority)
- Middleware: Auth middleware for tasks (only owner tasks)
- Unit tests: services + controllers

## Step 3: Advanced Features - doing
- Task status enum (todo/in-progress/done)
- Priority (low/medium/high)
- Filters/Search: GET /tasks?status=done&priority=high 
- Pagination: GET /tasks?page=1&limit=10
- Rate limiting 
- Logging (winston)

## Step 4: Production Ready - doing
- Docker + docker-compose (app + postgres)
- Environment validation (zod/env)
- Health checks /metrics 
- Swagger docs (tsoa/swagger-jsdoc)
- CI/CD (GitHub Actions)
- Deploy: Vercel Railway