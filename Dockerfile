FROM node:21 AS base

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]