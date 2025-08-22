FROM oven/bun

WORKDIR /app

COPY . .

RUN bun install

# RUN bunx drizzle-kit generate
# RUN bunx drizzle-kit migrate

CMD ["bun", "run", "dev"]
