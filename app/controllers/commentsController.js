var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');


exports.create = function (req, res) {
  Post.findById(req.params.post_id).populate('_author').exec(function (err, post) {
    if (err){
      req.flash('errors', 'Post not found');
      return res.redirect('/');
    }

    if (!req.body.content){
      return res.render('posts/show', { post: post, errors: 'A content is necessary' });
    }

    if (!req.user){
      comment = {
        content: req.body.content
      };
    } else {
      comment = {
        content: req.body.content,
        author_name: req.user.username,
        author_avatar: req.user.avatar,
        author_github_url: req.user.github_url
      };
    }


    post.comments.push(new Comment(comment));

    post.save(function (err){
      if (err) {
        var errors = [];
        for (var field in err.errors) {
          errors.push(err.errors[field].message);
        }
        return res.render('posts/show', { post: post, errors: errors[0] });
      }

      req.flash('success', 'Your comment was successfully added');
      res.redirect('/posts/' + post.id);
    });
  });
};
