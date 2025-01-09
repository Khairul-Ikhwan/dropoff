FROM node:23-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 5050

CMD [ "serve", "-s", "dist" ]