FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 8000 8001 8002 8003 8004 8005 8007 8008
CMD npm start
