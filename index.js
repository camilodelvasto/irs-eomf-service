'use strict';

const { port, env } = require('./config/vars');
const app = require('./config/express');
var SwaggerExpress = require('swagger-express-mw');

// listen to requests
//const server = app.listen(port, () => console.info(`server started on port ${port} (${env})`));


/**
* Exports express
* @public
*/
module.exports = app;


var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  const server = app.listen(port);
  server.timeout = 1800000;

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/v1/nonprofits');
  }
});
