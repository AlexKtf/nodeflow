exports.home = function (req, res) {
  res.render('home/home', { errors: req.flash('errors')} );
};
