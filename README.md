# [simple-auth-service-express-ts](https://github.com/iamalipe/simple-auth-service-express-ts)

A Simple Authentication and Authorization service build using Express, TS, Prisma.

## Build using

- [ExpressJS](https://expressjs.com/) main backend engine.
- [Prisma](https://www.prisma.io) and [MongoDB](https://www.mongodb.com) for [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) and Database.

### Setup Prisma

```shell
npx prisma generate
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command | description                                 |
| :------ | :------------------------------------------ |
| `dev`   | Starts a development instance of the server |
| `start` | Start the server                            |
| `build` | build a app                                 |
