FROM oven/bun:1.1.13

WORKDIR /app

COPY api-gateway/ ./

RUN bun install

# Si usas TypeScript, descomenta esta línea
RUN bun run tsc

EXPOSE 3000

CMD ["bun", "run", "index.ts"]
