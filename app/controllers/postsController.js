var mongoose = require('mongoose');
var Post = mongoose.model('Post');

exports.newForm = function (req, res) {
  res.render('posts/new');
};

exports.create = function (req, res) {
  var post = new Post(req.body);
  post._author = req.user;
  post.save(function (err) {
    if (err) {
      var errors = [];
      for (var field in err.errors) {
        errors.push(err.errors[field].message);
      }
      return res.render('posts/new', { post: post, errors: errors[0] });
    }

    req.flash('success', 'Your post will be soon available');
    res.redirect('/');
  });
};
