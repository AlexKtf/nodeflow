var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.login = function (req, res) {
  res.render('home/login');
};

exports.signup = function (req, res) {
  res.render('home/signup');
};


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
      if (err) req.flash('alert', 'Sorry! We are not able to log you in!');
      return res.redirect('/');
    });
  });
};

exports.logout = function (req, res) {
  req.logout();
  req.flash('info', 'You are disconnected');
  res.redirect('/');
};

exports.session = login;

function login (req, res) {
  console.log(req);
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
}
