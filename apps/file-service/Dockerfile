FROM --platform=linux/amd64 node:20.11.1-alpine

WORKDIR /app

EXPOSE 82

COPY package.json yarn.lock ./apps/file-service/

RUN yarn install

COPY . ./

CMD ["yarn", "start"]
