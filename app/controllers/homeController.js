var mongoose = require('mongoose');
var Post = mongoose.model('Post');

var moment = require('moment');

exports.home = function (req, res) {

  Post.paginate({ published_at: { $ne: null } }, {
  page: req.query.page,
  limit: 3,
  populate: ['_author'],
  sortBy: {
    published_at: -1
  },
  lean: true
  }, function (err, posts, pageCount, itemCount){
    res.format({
      html: function(){
        res.render('home/home', {
          errors: req.flash('errors'),
          posts: posts,
          pageCount: pageCount,
          itemCount: itemCount
        });
      },
      json: function(){
        res.send('hey');
      }
    });
  });
};
