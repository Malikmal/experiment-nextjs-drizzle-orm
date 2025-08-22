Simple contact us built with Nextjs for frontend and backend using shadcn, react-hook-form, Drizzle orm and postgresql

## Getting started

```bash
cp .env.example .env

docker-compose up -d
```

if first time running you need to migrate the schema

```bash
docker compose exec web bunx drizzle-kit generate

docker compose exec web bunx drizzle-kit migrate

```
