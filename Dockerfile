FROM node:19.9.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3101

CMD [ "npm", "start" ]