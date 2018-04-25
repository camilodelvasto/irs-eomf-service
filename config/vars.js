const path = require('path');

// import .env variables
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv-safe').load({ // eslint-disable-line global-require
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example'),
  });
}

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  apiKey: process.env.API_KEY,
  irsEOMFUrl: process.env.irsEOMFUrl,
  demoDataPort: process.env.demoDataPort,
  DATABASE_URL: process.env.DATABASE_URL,
  DB_DIALECT: process.env.DB_DIALECT,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
