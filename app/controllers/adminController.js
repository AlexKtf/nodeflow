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

// Display users table
exports.users = function (req, res) {
  User.find({}).exec(function(err, data){
    res.render('admin/users', { users: data });
  });
};

// Display posts table
exports.posts = function (req, res) {
  Post.find({ accepted: req.query.accepted }).exec(function(err, data){
    res.render('admin/posts', { title: (req.query.accepted == 'true' ? 'Accepted posts' : 'Refused posts'), posts: data });
  });
};
