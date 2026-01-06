# Development Plan

## Step 1: User/Auth - done
- Models:
  - users (id, username, email, password, created_at, updated_at)
- Services: create/get by id/get by email/update/delete user
- Middleware: auth middleware, validation middleware
- Controllers:
  - /api/auth/ - login, registration, profile (update and delete)
  - /database/init - initial database setup
- Unit tests: services + controllers
- Validation: /api/auth/

## Step 2: Projects and Project Members – done
- Models:
  - projects (id, name, owner_id, created_at, updated_at)
  - project_members (id, project_id, user_id, role)
- Services:
  - create/read/update/delete projects
  - add/remove member projects
- Controllers:
  - /api/projects
  - /api/projects/:id/members
- Middleware: Auth middleware for projects
- Unit tests: services + controllers
- Validation: /api/projects/ and /api/projects/:id/members

## Step 3: Docker/CI/Deploy - doing
- Environment validation
- Health checks /health
- Metrics /metrics
- Docker + docker-compose
- CI/CD (GitHub Actions)
- Deploy: Vercel Railway
- Monitoring (Sentry + Prometheus)

## Step n: Tasks and Comments - planning
- Models:
  - tasks (title, description, status, priority, user_id, created_at, updated_at)
  - comments (id, task_id, user_id, text, created_at, updated_at)
- Services: create/read/update/delete tasks
- Controllers: /api/tasks (CRUD and filters: status, priority)
- Middleware: Auth middleware for tasks (only owner tasks)
- Unit tests: services + controllers

## Step n: Advanced Features - planning
- Task status enum (todo/in-progress/done)
- Priority (low/medium/high)
- Filters/Search: GET /tasks?status=done&priority=high 
- Pagination: GET /tasks?page=1&limit=10
- Rate limiting 
- Logging (winston)

## Step n: Production Ready - planning
- Swagger docs (tsoa/swagger-jsdoc)
- CI/CD (GitHub Actions)
- Deploy: Vercel Railway