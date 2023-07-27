#FROM node:16-alpine
FROM node:18.4.0-alpine
WORKDIR /app

COPY package.json /app/
RUN npm install
COPY . .

COPY .env.development .env 

RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]
