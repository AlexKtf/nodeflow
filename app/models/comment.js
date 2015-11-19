var mongoose = require('mongoose');
var validator = require('validator');

/* Schema */

var CommentSchema = mongoose.Schema({
    content: { type: String },
    _post : { type: Number, ref: 'Post'},
    author_name : { type: String, default: 'Anonymous' },
    author_avatar : { type: String, default: '/assets/images/default_avatar.png' },
    author_github_url : { type: String, default: '' },
    created_at: { type: Date, default: new Date() }
});

/* Validator */

CommentSchema.path('content').validate(function () {
  return this.content && this.content.length;
}, 'A content is necessary');

/* Declare model */

mongoose.model('Comment', CommentSchema);
