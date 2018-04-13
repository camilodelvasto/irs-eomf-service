var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;

passport.use(new Strategy(
  function(token, cb) {
    findToken(token, function(err, secret) {
      if (err) { return cb(err); }
      if (!secret) { return cb(null, false); }
      return cb(null, secret);
    });
  }));


function findToken (token, cb) {
  process.nextTick(function() {
    if (process.env.API_KEY === token) {
      return cb(null, token);
    }
    return cb(null, null);
  });
}

module.exports = {
  findToken: findToken,
  requireToken: passport.authenticate('bearer', { session: false })
}
