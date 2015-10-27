var homeController = require('../app/controllers/homeController');
var usersController = require('../app/controllers/usersController');
var postsController = require('../app/controllers/postsController');
var adminController = require('../app/controllers/adminController');

var auth = require('./authorization.js');

module.exports = function (app, passport) {
  // Home
  app.get('/', homeController.home);


  // Display SignIn/SignUp form
  app.get('/register', auth.requireNoLogin, usersController.register);
  // Sign up
  app.post('/users/register', auth.requireNoLogin, usersController.create);
  // Sign in
  app.post('/users/session',[auth.requireNoLogin,
    passport.authenticate('local', {
      successRedirect: '/',
      successFlash: 'You are connected',
      failureRedirect: '/register',
      failureFlash: 'Invalid user or password'
    })], usersController.session);
  // Sign in with GitHub
  app.get('/auth/github', auth.requireNoLogin, passport.authenticate('github'));
  app.get('/auth/callback',[auth.requireNoLogin,
  passport.authenticate('github', {
    successRedirect: '/',
    successFlash: 'You are connected',
    failureRedirect: '/',
    failureFlash: 'Oops, an error occured'
  })], usersController.session);
  // Log out
  app.get('/logout', auth.requireLogin, usersController.logout);


  // Display Article form
  app.get('/posts/new', auth.requireLogin, postsController.newForm);
  // Create Article
  app.post('/posts/create', auth.requireLogin, postsController.create);
  // Display Article
  app.get('/posts/:id', postsController.show);


  // Admin dashboard
  app.get('/admin/dashboard', auth.isAdmin, adminController.dashboard);
  // Admin users
  app.get('/admin/users', auth.isAdmin, adminController.users);
  // Admin posts
  app.get('/admin/posts', auth.isAdmin, adminController.posts);
  // Admin post details
  app.get('/admin/posts/:id', auth.isAdmin, adminController.post);
  // Admin post accept action
  app.put('/admin/posts/:id/accept', auth.isAdmin, adminController.acceptPost);
  // Admin post destroy action
  app.delete('/admin/posts/:id', auth.isAdmin, adminController.destroyPost);

  // Handle 404/500
  app.use(function (err, req, res, next) {
    if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return res.status(404).render('404', { url: req.originalUrl, error: 'Not found' });
    }
    console.error(err.stack);
    res.status(500).render('500', { error: err.stack });
  });
};
