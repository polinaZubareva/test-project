FROM node 

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .
COPY ormconfig.docker.json ./ormconfig.json

EXPOSE 8080

CMD ["npm", "start"]