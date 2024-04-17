
FROM node:20

WORKDIR /usr/src/nextapp

COPY package* .

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "run", "dev" ]