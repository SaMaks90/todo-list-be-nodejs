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

## Step 6: Comments - done
- Models:
  - comments (id, task_id, user_id, text, created_at, updated_at)
- Services: create/read/update/delete comments
- Controllers: 
  - /api/projects/:project_id/tasks/:task_id
  - /api/tasks/:task_id/comments
- Middleware: Auth middleware for comments
- Unit tests: services + controllers + routes

# Step 7: Swagger docs and Postman Collection – done
- Swagger docs
- Postman Collection

## Step 8: API Improvements - in progress

### Filters
- Filters for tasks:
  - Extend existing endpoints: ```GET /api/tasks?status=done&priority=high&search=title```
- Support:
  - status
  - priority
  - search (ILIKE / partial math)
- Combine with pagination ```GET /api/tasks?page=1&limit=10&status=done```

### RBAC (Role-Base Access Control)

## Step 9: Auth Improvements - plan
Refresh Token Flow
- Add:
  - refresh_token (HTTP-only cookie)
- Endpoints:
```text
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
```
- Logic:
  - store refresh token (DB or in-memory/Redis)
  - rotate tokens 
  - revoke on logout

## Step 10: Security
- Add middleware:
  - helmet 
  - CORS config 
- Protect:
  - rate of login attempts 
  - headers 
- Sanitize input:
  - prevent XSS / injection

## Step 11: Observability
### Logging 
- Add:
  - pino 
- Log:
  - requests 
  - errors 
  - important business events (payments, auth)

### Monitoring
- Prometheus (already есть /metrics)
- Add:
  - request duration 
  - error rate

## Step 12: Rate Limiting
- Use:
  - express-rate-limit 
- Apply:
  - global limiter 
  - stricter limiter for:

```
/api/auth/login
```

## Step 13: Repository Layer
### Refactor architecture:
```
controller → service → repository → DB
```

### Responsibilities:
- repository:
  - pure DB queries 
- service:
  - business logic

### Example:
```text
// task.repository.ts
getTasks(filters)

// task.service.ts
validate → call repo → apply logic
```