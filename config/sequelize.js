const vars = require('./vars.js');

module.exports = {
  url: process.env.DATABASE_URL,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: 'Op',
  connectionTimeout: 0,
  pool: {
    max: 100,
    min: 1,
    idle: 200000,
    acquire: 200000,
  },
  logging: vars.LOGGING ? '' : true,
};
