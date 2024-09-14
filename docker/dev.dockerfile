FROM node:18-alpine

WORKDIR /app

RUN apk add  --update --no-cache \
    vips-dev \
    fftw-dev \
    build-base \
    python3 \
    git

    # \
    # --repository https://alpine.global.ssl.fastly.net/alpine/edge/testing/ \
    # --repository https://alpine.global.ssl.fastly.net/alpine/edge/main

# RUN yarn global add gatsby-cli gh-pages
RUN echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf

COPY ./package.json .
# COPY ./yarn.lock .

RUN yarn install