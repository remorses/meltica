FROM --platform=linux/amd64 mltframework/melt:latest

WORKDIR /app

COPY kdentlivetest.kdenlive ./

ENV XDG_RUNTIME_DIR=/home/root/


CMD ["melt", "kdentlivetest.kdenlive"]
