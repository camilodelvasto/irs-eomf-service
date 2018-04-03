const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://koa:password@localhost:5432/koa_api_test',
    acquireConnectionTimeout: 100000,
    pool: { min: 0, max: 100 },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  development: {
    client: 'pg',
    connection: 'postgres://koa:password@localhost:5432/koa_api',
    acquireConnectionTimeout: 100000,
    pool: { min: 0, max: 99 },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }
};