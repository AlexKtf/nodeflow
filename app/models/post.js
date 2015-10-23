var mongoose = require('mongoose');
var validator = require('validator');

/* Schema */

var PostSchema = mongoose.Schema({
    title: { type: String },
    description: { type: String },
    link: { type: String },
    _author : { type: Number, ref: 'User' },
});

/* Validator */

PostSchema.path('link').validate(function (email) {
  return this.link && this.link.length;
}, 'A link is necessary');

PostSchema.path('link').validate(function (email) {
  return validator.isURL(this.link);
}, 'Link must be a valid URL');

PostSchema.path('description').validate(function (email) {
  return this.description && this.description.length;
}, 'A description is necessary');

PostSchema.path('title').validate(function (email) {
  return this.title && this.title.length;
}, 'A title is necessary');

/* Declare model */

mongoose.model('Post', PostSchema);
