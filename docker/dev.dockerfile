FROM node:18-alpine

WORKDIR /app

RUN apk add  --update --no-cache \
    vips-dev \
    fftw-dev \
    build-base \
    python3 \
    git

# RUN yarn global add gatsby-cli gh-pages
RUN echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn config set unsafe-perm true
RUN SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm_config_arch=x64 npm_config_platform=linux yarn install
