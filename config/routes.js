var homeController = require('../app/controllers/homeController');
var usersController = require('../app/controllers/usersController');

module.exports = function (app, passport) {
  app.get('/', homeController.home);

  // Sign up
  app.get('/signup', usersController.signup);
  app.post('/users/register', usersController.create);

  // Sign in
  app.get('/login', usersController.login);
  app.post('/admin/session',
    passport.authenticate('local', {
      failureRedirect: '/admin/login',
      failureFlash: true
    }), usersController.session);

  // Log out
  app.get('/logout', usersController.logout);
};
