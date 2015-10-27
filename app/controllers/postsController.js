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

// Display a post
exports.show = function (req, res) {
  Post.findById(req.params.id).populate('_author').exec(function (err, post){
    res.render('posts/show', { post: post });
  });
};
