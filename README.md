# IRS Exempt Organization Master File Search API
Express + PostgreSQL search API that downloads the EOMF (Exempt Organizations Master File) from the IRS website and parses/exposes the data on a /nonprofits endpoint.


## Features
 - Built using Express + Sequelize as the ORM
 - Documentation via Swagger
 - CORS enabled
 - Uses [helmet](https://github.com/helmetjs/helmet) to set some HTTP headers for security
 - Load environment variables from .env files with [dotenv](https://github.com/rolodato/dotenv-safe)
 - Linting with [eslint](http://eslint.org)
 - Tests with [mocha](https://mochajs.org), [chai](http://chaijs.com) and [sinon](http://sinonjs.org)
 - Authorization of protected endpoints with [passport](http://passportjs.org)

## Requirements

 - [Node v7.6+](https://nodejs.org/en/download/current/)
 - [Yarn](https://yarnpkg.com/en/docs/install)
 - PostgreSQL installed locally

## Getting Started

Clone the repo:

```bash
git clone --depth 1 https://github.com/camilodelvasto/irs-eomf-service.git
cd irs-eomf-service
```

Install dependencies:

```bash
yarn
```

Set environment variables:

```bash
cp .env.example .env
```

Create two databases using Postgres and add the connection string to the .env var `DATABASE_URL`

```bash
NODE_ENV=development
PORT=1337
API_KEY=ndsvn2g8dnsb9hsg
irsEOMFUrl='https://www.irs.gov/pub/irs-soi/eo'
DATABASE_URL='postgres://koa:password@127.0.0.1:5432/exp'
DB_DIALECT=postgres
demoDataPort=1349
operatorsAliases=Op
connectionTimeout=0
```

Run the migrations to prepare the dev database:

```bash
node_modules/.bin/sequelize db:migrate
```

## Running Locally

```bash
yarn dev
```

## Running through swagger

```bash
swagger project start
```

## Opening Swagger API specification editor

Run in another tab if you are going to change the API specification or are going to update the documentation. Do it while running swagger (see above) in another terminal tab.

```bash
swagger project edit
```

Note: after completing the documentation changes in the main project (this one), clone and update the documentation in /api/swagger/swagger.yaml to ./swagger.yaml in git@github.com:camilodelvasto/irs-eomf-service-swagger.git and publish using surge:

```bash
npm run surge
```

## Running in Production

```bash
yarn start
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix

# lint and watch for changes
yarn lint:watch
```

## Test

```bash
# run all tests with Mocha
yarn test

# run unit tests
yarn test:unit

# run integration tests
yarn test:integration

# run all tests and watch for changes
yarn test:watch

# open nyc test coverage reports
yarn coverage
```

## Logs

```bash
# show logs in production
pm2 logs
```

## Docker

```bash
# run container locally
yarn docker:dev
or
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# run container in production
yarn docker:prod
or
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

# run tests
yarn docker:test
or
docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```

## Deploy
To deploy on Heroku, do the following:

1. Create a new app and add a Postgres add-on:
2. Add the required .env variables in the Heroku dashboard
3. Run the remote migrations

```bash
heroku run sequelize migrate:db
```


Check the logs:

```bash
heroku logs --tail
```

Set your server ip:

```bash
DEPLOY_SERVER=127.0.0.1
```

Replace my Docker username with yours:

```bash
nano deploy.sh
```

Run deploy script:

```bash
yarn deploy
or
sh ./deploy.sh
```

## Inspirations

 - [KunalKapadia/express-mongoose-es6-rest-api](https://github.com/KunalKapadia/express-mongoose-es6-rest-api)
 - [diegohaz/rest](https://github.com/diegohaz/rest)
 - [danielfsousa/express-rest-es2017-boilerplate](https://github.com/danielfsousa/express-rest-es2017-boilerplate)

## License
