const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  apiKey: process.env.API_KEY,
  irsEOMFUrl: process.env.irsEOMFUrl,
  demoDataPort: process.env.demoDataPort,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
