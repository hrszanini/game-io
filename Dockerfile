FROM node:12

COPY project ./project

WORKDIR /project

EXPOSE 9000

RUN npm install

CMD [ "npm", "start" ]