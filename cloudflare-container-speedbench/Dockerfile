FROM oven/bun:latest

WORKDIR /app

COPY package.json ./
RUN bun install

COPY src/ ./src/
COPY tsconfig.json ./

EXPOSE 8080

CMD ["bun", "run", "src/speed-test.ts"]