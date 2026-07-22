# Lens Lounge

Lens Lounge is a NestJS learning project with a small microservice-style layout:

- `apps/lens-lounge` - main API application
- `apps/payment-service` - payment service
- `apps/file-service` - file service

The project uses a single root dependency graph for all three NestJS applications, WebSocket support in the main API, Docker/Kubernetes deployment files, and a Yarn Berry toolchain pinned in the repository.

## Environment

- Node.js `24.15.0`
- npm `11.12.1`
- Yarn `4.14.1`
- TypeScript `5.9.3`

Yarn is committed locally at `.yarn/releases/yarn-4.14.1.cjs` and wired through `.yarnrc.yml`, so Corepack and CI use the same package manager version.

The repository has one `package.json` and one `yarn.lock`. Always install dependencies from the repository root.

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
yarn start:dev.file-service
yarn build:all
yarn typecheck
yarn lint
yarn lint:fix
yarn format:prettier
yarn fix
yarn test
yarn test:e2e
```

`yarn fix` runs ESLint autofix and Prettier formatting.

## Docker

Build every image from the repository root so each service uses the shared manifest and lockfile:

```bash
docker build -t lens-lounge .
docker build -f apps/payment-service/Dockerfile -t lens-lounge-payment-service .
docker build -f apps/file-service/Dockerfile -t lens-lounge-file-service .
```

The images use Node.js `24.15.0`, run as the non-root `node` user, and contain production dependencies only.

## CI

GitHub Actions runs on pull requests and pushes to `main`:

- `yarn typecheck`
- `yarn lint`
- `yarn test --runInBand`
- `yarn test:e2e`
- `yarn build:all`

## Author

Serge Hall

## License

MIT
