'use strict';

const { port, env } = require('./config/vars');
const app = require('./config/express');
var SwaggerExpress = require('swagger-express-mw');

/**
* Exports express
* @public
*/
module.exports = app;


var config = {
  appRoot: __dirname // required config
};

// Run through Swagger middleware only in dev env.
if (process.env.NODE_ENV === 'development') {
  SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) { throw err; }

    // install middleware
    swaggerExpress.register(app);

    var port = process.env.PORT || 10010;
  });  
}

// Fire up server.
const server = app.listen(port, () => console.info(`server started on port ${port} (${env})`));
server.timeout = 1800000;
