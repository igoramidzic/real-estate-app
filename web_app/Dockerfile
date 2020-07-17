ARG NODE_ENV

FROM node:13

RUN mkdir -p /usr/src/realestateapp_web

WORKDIR /usr/src/realestateapp_web

COPY package*.json ./

RUN npm install

COPY . .