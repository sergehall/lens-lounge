FROM node:24.15.0-alpine AS dependencies

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases ./.yarn/releases

RUN corepack enable && yarn install --immutable

FROM dependencies AS build

COPY nest-cli.json tsconfig.json tsconfig.build.json ./
COPY apps ./apps

RUN yarn build:payment-service && yarn workspaces focus --production

FROM node:24.15.0-alpine AS runtime

ENV NODE_ENV=production \
    PORT=82

WORKDIR /app

COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist/apps/payment-service ./dist/apps/payment-service

USER node

EXPOSE 82

CMD ["node", "dist/apps/payment-service/main.js"]
