# UTU Trust Token Listener

## API

Express HTTP endpoints

- `GET /api/endorses/:address`


## Build and run

Create an `.env` file using the example [.env.example](.env.example) and fill in the needed credentials and details.

Install dependencies
```
npm install
```

Build the service
```
npm run build
```

Start
```
npm start
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
