FROM node:13

RUN mkdir -p /usr/src/realestateapp_api

WORKDIR /usr/src/realestateapp_api

COPY package*.json ./

RUN npm install

COPY . .