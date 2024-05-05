FROM --platform=linux/amd64 node:20.11.1-alpine

WORKDIR /app

EXPOSE 3000

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

CMD ["yarn", "start"]