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
├── src/
│   ├── server.ts      # Express app + routes
│   ├── controllers/   # Todo CRUD
│   ├── middleware/    # Auth, validation
│   └── config/        # DB, env
├── dist/              # tsc build (gitignore)
├── Dockerfile         # Multi-stage: ~100MB
└── docker-compose.yml # API + Postgres
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