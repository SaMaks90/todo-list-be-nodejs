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

## Step 3: Docker/CI/Deploy - done
- Environment validation
- Health checks /health
- Metrics /metrics
- Docker + docker-compose
- CI/CD (GitHub Actions)
  - Lint, test and TS build;
  - Docker build and push;
  - Deploy to Railway

## Step 4: Tasks – done
- Models:
  - tasks (id, title, description, status, priority, user_id, created_at, updated_at)
- Services: create/read/update/delete tasks
- Controllers: 
  - /api/tasks (CRUD and filters: status, priority)
  - /api/projects/:project_id/tasks (CRUD and filters)
- Middleware: Auth middleware for tasks (only owner tasks)
- Unit tests: services + controllers + routes

# Step 5: Payments – done
- Models:
  - payments (id, user_id, amount, currency, status, idempotency_key, created_at, updated_at)
- Services: create/read/pathces payments
- Controllers: /api/payments (CRUD and filters by user and status)
- Middleware: Auth middleware for payments
- Unit tests: services + controllers + routes

## Step 4: Comments - doing
- Models:
  - comments (id, task_id, user_id, text, created_at, updated_at)
- Services: create/read/update/delete comments
- Controllers: 
  - /api/projects/:project_id/tasks/:task_id
  - /api/tasks/:task_id/comments
- Middleware: Auth middleware for comments
- Unit tests: services + controllers + routes

## Step n: Advanced Features - planning
- Filters/Search: GET /tasks?status=done&priority=high 
- Pagination: GET /tasks?page=1&limit=10
- Rate limiting

## Step n: Production Ready - planning
- Swagger docs (tsoa/swagger-jsdoc)
- Monitoring (Sentry + Prometheus)