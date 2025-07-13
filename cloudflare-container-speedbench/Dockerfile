FROM node:20-alpine

# Install rclone
RUN apk add --no-cache curl unzip && \
    curl -O https://downloads.rclone.org/rclone-current-linux-amd64.zip && \
    unzip rclone-current-linux-amd64.zip && \
    cp rclone-*-linux-amd64/rclone /usr/bin/ && \
    chown root:root /usr/bin/rclone && \
    chmod 755 /usr/bin/rclone && \
    rm -rf rclone-*-linux-amd64* && \
    apk del curl unzip

WORKDIR /app

COPY package.json ./
RUN npm install

COPY src/ ./src/
COPY tsconfig.json ./

EXPOSE 8080

CMD ["npx", "tsx", "src/speed-test.ts"]