FROM node:12

COPY ./server ./src

WORKDIR /src

EXPOSE 9001

RUN npm install

CMD [ "npm", "start" ]