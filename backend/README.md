## Resources

- Guide for how [Prisma](https://docs.nestjs.com/recipes/prisma) was set up

## Project setup

```bash
cd backend
npm install
docker compose down --volumes
docker compose up -d
npm run db:push
npm run db:seed
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
