var homeController = require('../app/controllers/homeController');
var usersController = require('../app/controllers/usersController');

module.exports = function (app, passport) {
  app.get('/', homeController.home);

  // Display SignIn/SignUp form
  app.get('/register', usersController.register);

  // Sign up
  app.post('/users/register', usersController.create);

  // Sign in
  app.post('/users/session',
    passport.authenticate('local', {
      successRedirect: '/',
      successFlash: 'You are connected',
      failureRedirect: '/register',
      failureFlash: 'Invalid user or password'
    }), usersController.session);

  // Sign in with GitHub
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/callback',
  passport.authenticate('github', {
    successRedirect: '/',
    successFlash: 'You are connected',
    failureRedirect: '/',
    failureFlash: 'Oops, an error occured'
  }), usersController.session);

  // Log out
  app.get('/logout', usersController.logout);


  // Handle 404/500
  app.use(function (err, req, res, next) {
    if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return res.status(404).render('404', { url: req.originalUrl, error: 'Not found' });
    }
    console.error(err.stack);
    res.status(500).render('500', { error: err.stack });
  });
};
