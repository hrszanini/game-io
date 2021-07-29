FROM node:12

COPY ./client ./src

WORKDIR /src

EXPOSE 9000

RUN npm install

CMD [ "npm", "start" ]