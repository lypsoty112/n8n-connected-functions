FROM oven/bun:1-alpine

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
EXPOSE 3000

ENV PORT=3000
# Env: pass at runtime with docker run --env-file .env so any .env entries are available
CMD ["bun", "run", "index.ts"]
