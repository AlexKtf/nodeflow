var mongoose = require('mongoose');
var User = mongoose.model('User');

// Display sign up / sign in form
exports.register = function (req, res) {
  res.render('home/register');
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
      return res.render('home/register', { errors: errors[0] });
    }

    req.logIn(user, function(err) {
      if (err) {
        req.flash('errors', 'Oops, An error occured');
      } else {
        req.flash('success', 'Welcome! You can post an article');
      }
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

