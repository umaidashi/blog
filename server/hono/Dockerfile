# build
FROM oven/bun:latest AS build

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

# runtime
FROM oven/bun:distroless AS runtime

COPY --from=build --chown=nonroot:nonroot /app/node_modules /app/node_modules
COPY ./server/hono/src ./server/hono/src

USER nonroot
EXPOSE 8080

CMD ["run", "--hot", "./server/hono/src/index.ts"]
