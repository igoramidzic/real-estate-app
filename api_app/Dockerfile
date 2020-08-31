FROM node:13

RUN mkdir -p /realestateapp_api

WORKDIR /realestateapp_api

COPY package*.json ./

RUN npm install

COPY . .