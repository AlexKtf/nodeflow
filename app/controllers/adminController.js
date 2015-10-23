var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');

// Display admin dashboard
exports.dashboard = function (req, res) {
  var counter = [];
  User.count({}, function(err, count){
    counter['users'] = count;
    Post.count({}, function (err, count){
      counter['posts'] = count;
      res.render('admin/dashboard', { counter: counter });
    });
  });
};
