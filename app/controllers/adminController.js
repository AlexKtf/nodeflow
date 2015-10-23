var mongoose = require('mongoose');
var User = mongoose.model('User');

// Display admin dashboard
exports.dashboard = function (req, res) {
  res.render('admin/dashboard');
};
