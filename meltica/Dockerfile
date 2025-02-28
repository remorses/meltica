FROM --platform=linux/amd64 mltframework/melt:latest

WORKDIR /app

COPY render.mlt ./

# ENV XDG_RUNTIME_DIR=/home/root/


CMD ["melt", "video.mlt"]
