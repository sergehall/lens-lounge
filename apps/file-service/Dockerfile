FROM node:24.15.0-alpine AS dependencies

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases ./.yarn/releases

RUN corepack enable && yarn install --immutable

FROM dependencies AS build

COPY nest-cli.json tsconfig.json tsconfig.build.json ./
COPY apps ./apps

RUN yarn build:file-service && yarn workspaces focus --production

FROM node:24.15.0-alpine AS runtime

ENV NODE_ENV=production \
    PORT=83

WORKDIR /app

COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist/apps/file-service ./dist/apps/file-service

USER node

EXPOSE 83

CMD ["node", "dist/apps/file-service/main.js"]
