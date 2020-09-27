FROM node:13

RUN mkdir -p /realestateapp_web

WORKDIR /realestateapp_web

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY . .