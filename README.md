# Todo List Backend (Node.js + TypeScript + Postgres)

API for managing tasks with health check, metrics та PostgreSQL.

## Quick Start (Docker)

```bash
# Clone and run
git clone <repo>
cd todo-list-be-nodejs
# Setting DATABASE_URL, PORT and other variables. Example in .env.example
cp .env.example .env
docker compose up -d
curl localhost:3000/api/health
```

## Structure project

```text
├── .github/                        # Github Actions workflows (CI/CD pipelines)
├── docs/                           # API documentation, architecture notes
├── dist/                           # Compiled JavaScript output (TypeScript build)
├── src/                            # Application source code
│   ├── __tests__/                  # Integration and unit tests shared across modules
│   ├── server.ts                   # Application entry point (Express app bootstrap)
│   ├── controllers/                # HTTP request handlers (business logic layer)
│   │                                   # Includes tests for controllers
│   ├── services/                   # Data access and business services (DB queries, logic)
│   │                                   # Includes test for services
│   ├── routes/                     # Express route definitions (API endpoints)
│   │                                   # Includes test for routes
│   ├── types/                      # Global TypeScript types and interfaces
│   ├── utils/                      # Reusable helpers functions
│   ├── validation/                 # Request validation schemas (e.g. Zod)
│   ├── middleware/                 # Express middleware (auth, error handling, validation)
│   └── config/                     # Application configuration (DB, env, Swagger setup)
│       └── swagger/                # Swagger / OpenAPI schemas
├── test/                           # Test setup
├── Dockerfile                      # Multi-stage Docker build (~100MB image)
└── docker-compose.yml              # Docker Compose configuration (API + PostgreSQL)
```

## Option 1: Local Development

```bash
# Install
npm ci
cp .env.example .env

# Dev server (nodemon + ts-node)
npm run dev

# Build + start
npm run build
npm start

# Testing
npm test
curl localhost:3000/api/health
curl localhost:3000/api/metrics
```

## Option 2: Docker build

```bash
# Multi-stage build (typescript → production)
docker build --no-cache -t todo-api .
docker run -p 3000:3000 --env-file .env todo-api

# Check
docker run todo-api ls dist/server.js  # Compiled JS
curl localhost:3000/api/health

# Stop server
docker ps
# Copy container ID
docker stop container_id
```
## Option 3: Docker-compose build

```bash
# Automation build + run
docker compose up -d

# Logs and testing
docker compose logs -f api
curl localhost:3000/api/health 
```

## Commands for Docker and Docker Compose

| Docker                   | Docker Compose               | Description          |
|--------------------------|------------------------------|----------------------|
| docker logs -f todo-api  | docker compose logs -f api   | API logs             |
| docker stop todo-api     | docker compose down          | Stop container       |
| docker rm rodo-api       | docker compose down -w       | Remove container     |
| docker restart tod-api   | docker compose restart       | Restart container    |
| docker ps                | docker compose ps            | List containers      |
| docker build todo-api    | docker compose up --build -d | Rebuilding container |


## Tech Stack
- Runtime: Node.js 20-alpine
- Framework: Express.js + TypeScript 
- DB: PostgreSQL 16 
- Build: tsc (rootDir: "src" → dist/server.js)
- Tools: Docker multi-stage, docker-compose, nodemon, jest

## API Documentation (Swagger)

Interactive API documentation is available via Swagger UI.

### Local

After starting the server:

```bash
npm run dev
# or
docker compose up -d
```

Open in browser:
http://localhost:3000/api/docs

## OpenAPI JSON

You can access the raw OpenAPI schema:
http://localhost:3000/api/docs-json

Or generate it locally:
```bash
npm run swagger:generate
```

Output file:
- docs/swagger.json

## Postman Collection

Postman collection is generated automatically from OpenAPI using openapi-to-postmanv2.

### Generate a collection

```bash
npm run docs:generate
```

This will:
1. Generate OpenAPI schema
2. Convert it to a Postman collection

Output:
- docs/postman_collection.json

Import into Postman
1. Open Postman
2. Click Import
3. Select:
    ```text
    docs/postman_collection.json
    ```

## Documentation workflow
```text
JSDoc (@swagger) → swagger-jsdoc → swagger.json → Postman collection
```

## ⚠️ Notes
Swagger is generated from JSDoc comments in src/routes
- Do not edit swagger.json manually
- Always regenerate docs after API changes:
```bash
npm run docs:generate
```