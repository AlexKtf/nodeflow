exports.requireLogin = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  if (req.method == 'GET') req.session.returnTo = req.originalUrl;
  res.render('home/register', { errors: 'You must be logged in' });
};

exports.requireNoLogin = function (req, res, next) {
  if (!req.isAuthenticated()) return next();
  req.flash('errors', 'You are already logged in');
  res.redirect('/');
};
