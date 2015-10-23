var mongoose = require('mongoose');
var User = mongoose.model('User');

var local = require('./passport/local');
var github = require('./passport/github');

module.exports = function (passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(local);
  passport.use(github);
};
