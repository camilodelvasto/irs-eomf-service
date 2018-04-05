// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const app = require('./config/express');

// listen to requests
const server = app.listen(port, () => console.info(`server started on port ${port} (${env})`));

server.timeout = 1800000;

/**
* Exports express
* @public
*/
module.exports = app;
