FROM postgres:12.13
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD rolo123
ENV POSTGRES_DB test-hotel

FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]