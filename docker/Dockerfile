FROM node:14-alpine

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

COPY package.json .
COPY yarn.lock .

RUN yarn

WORKDIR /app

RUN apk add --no-cache git

CMD yarn start
