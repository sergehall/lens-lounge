# Lens Lounge

Lens Lounge is a NestJS learning project with a small microservice-style layout:

- `apps/lens-lounge` - main API application
- `apps/payment-service` - payment service
- `apps/file-service` - file service

The project uses PostgreSQL/Prisma-oriented dependencies, RabbitMQ/Nest microservices, WebSocket support, Docker/Kubernetes deployment files, and a Yarn Berry toolchain pinned in the repository.

## Environment

- Node.js `24.15.0`
- npm `11.12.1`
- Yarn `4.14.1`
- TypeScript `5.9.3`

Yarn is committed locally at `.yarn/releases/yarn-4.14.1.cjs` and wired through `.yarnrc.yml`, so Corepack and CI use the same package manager version.

## Install

```bash
corepack enable
yarn install
```

## Scripts

```bash
yarn start
yarn start:dev.lens-lounge
yarn start:dev.payment-service
yarn start:dev.file-services
yarn build
yarn typecheck
yarn lint
yarn lint:fix
yarn format:prettier
yarn fix
yarn test
```

`yarn fix` runs ESLint autofix and Prettier formatting.

## CI

GitHub Actions runs on pull requests and pushes to `main`:

- `yarn typecheck`
- `yarn lint`

## Author

Serge Hall

## License

MIT
