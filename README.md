# UTU Trust Token Listener

## API

Express HTTP endpoints

- `GET /endorses/:address`

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# Build the service
npm run build
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

Create `.env` file in the directory following the example and run

```
docker-compose up
```

Optionally you can specify custom `.env` file and run using:
```
docker-compose --env-file <path-to-env-file> up
```
