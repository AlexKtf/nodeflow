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
    title = req.query.accepted == 'true' ? 'Accepted posts' : 'Refused posts';
    res.render('admin/posts', { title: title, posts: data });
  });
};

// Display posts table
exports.post = function (req, res) {
  Post.findById(req.params.id).populate('_author').exec(function(err, post){
    res.render('admin/post', { post: post });
  });
};

// Accept a post
exports.acceptPost = function (req, res) {
  Post.update({_id: req.params.id }, { $set: { accepted: true, published_at: Date.now() }}, function(err, post){
    req.flash('success', 'This Post is now available');
    res.redirect('/admin/posts/'+req.params.id);
  });
};
