const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  apiKey: process.env.API_KEY,
  irsEOMFUrl: process.env.irsEOMFUrl,
  demoDataPort: process.env.demoDataPort,
  DB_CONNECTION_URL: process.env.DB_CONNECTION_URL,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_DIALECT: process.env.DB_DIALECT,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
