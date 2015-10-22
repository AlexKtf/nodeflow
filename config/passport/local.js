var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    var options = {
      criteria: { email: email },
      select: { email: 1, hashed_password: 1, salt: 1 }
    };
  User.findOne(options.criteria).select(options.select).exec(function (err, user) {
    if (err) return done(err);
    if (!user) {
      return done(null, false);
    }
    if (!user.authenticate(password)) {
      return done(null, false);
    }
    return done(null, user);
  });
});
