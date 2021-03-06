var mongoose = require('mongoose');
var GithubStrategy = require('passport-github').Strategy;
var User = mongoose.model('User');

module.exports = new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ github_id: profile.id }, function (err, user) {
      if (err) { return done(err, user); }
      if (!user) {
        user = new User({
          username: profile.username,
          avatar: profile._json.avatar_url,
          github_url: profile._json.html_url,
          github_id: profile.id
        });
        user.save(function (err) {
          if (err) console.log(err);
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    });
  }
);
