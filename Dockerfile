FROM --platform=linux/amd64 mltframework/melt:latest

WORKDIR /app

COPY render ./

ENV XDG_RUNTIME_DIR=/home/root/


CMD ["melt", "render"]
