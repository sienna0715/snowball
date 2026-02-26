# apps/api/Dockerfile
FROM node:20-slim AS deps
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

FROM node:20-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# prisma generate 단계에서만 DATABASE_URL이 필요하여 더미로 주입
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db?schema=public"

RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package.json ./

# Cloud Run은 PORT 환경변수로 포트 주입함 (보통 8080)
ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/src/app.js"]