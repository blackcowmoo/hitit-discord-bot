### Production
FROM node:12-alpine

COPY . /node

WORKDIR /node

ENV DISCORD_TOKEN ''

STOPSIGNAL SIGINT

ENTRYPOINT yarn start
