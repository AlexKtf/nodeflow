var mongoose = require('mongoose');
var User = mongoose.model('User');

// Display sign in form
exports.signin = function (req, res) {
  res.render('home/signin');
};

// Display sign up form
exports.signup = function (req, res) {
  res.render('home/signup');
};

// Sign up user
exports.create = function (req, res) {
  var user = new User(req.body);
  user.save(function (err) {
    if (err) {
      var errors = [];
      for (var field in err.errors) {
        errors.push(err.errors[field].message);
      }
      return res.render('home/signup', {
        errors: errors,
        user: user
      });
    }

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  });
};

// Sign in user
exports.session = function (req, res) {
  res.redirect('/');
};

// Logout user
exports.logout = function (req, res) {
  req.logout();
  req.flash('info', 'You are disconnected');
  res.redirect('/');
};

