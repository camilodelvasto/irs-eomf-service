const vars = require('./vars.js');

module.exports = {
  url: vars.DATABASE_URL,
  dialect: vars.DB_DIALECT,
  operatorsAliases: 'Op',
  connectionTimeout: 0,
  pool: {
    max: 19,
    min: 1,
    idle: 200000,
    acquire: 200000,
  },
  logging: vars.LOGGING ? '' : false,
};
