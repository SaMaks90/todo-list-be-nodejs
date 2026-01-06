# Build stage: compilation TypeScript
FROM node:20-alpine AS builder
WORKDIR /app

# Dependencies for build
COPY package*.json tsconfig.json ./
RUN npm ci

# Build TS -> JS
COPY src ./src
RUN npm run build

# Production stage: only runtime
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

# Production deps
COPY package*.json ./
RUN npm ci --only=production

# Copy dist from Build stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]