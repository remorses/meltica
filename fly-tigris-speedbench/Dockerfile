FROM node:20-alpine

ENV NODE_OPTIONS="--max-old-space-size=3072 --expose-gc"

WORKDIR /app

COPY package.json ./
RUN npm install

COPY src/ ./src/
COPY tsconfig.json ./

EXPOSE 8080

CMD ["npx", "tsx", "src/speed-test.ts"]