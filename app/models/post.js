var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var validator = require('validator');
var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

/* Schema */

var PostSchema = mongoose.Schema({
    title: { type: String },
    description: { type: String },
    link: { type: String },
    accepted: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now() },
    published_at: { type: Date, default: null },
    _author : { type: Number, ref: 'User' }
});

/* Validator */

PostSchema.path('link').validate(function () {
  return this.link && this.link.length;
}, 'A link is necessary');

PostSchema.path('link').validate(function () {
  return validator.isURL(this.link);
}, 'Link must be a valid URL');

PostSchema.path('description').validate(function () {
  return this.description && this.description.length;
}, 'A description is necessary');

PostSchema.path('title').validate(function () {
  return this.title && this.title.length;
}, 'A title is necessary');


/* After save */

PostSchema.post('save', function (post){
  sendgrid.send({
    to:       'alexandre.ktifa@gmail.com',
    from:     'NodeFlow <support@nodejsflow.com>',
    subject:  'New post',
    text:     'A new post has just arrived'
  }, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
  });
});


/* Plugin */

PostSchema.plugin(mongoosePaginate);

/* Declare model */

mongoose.model('Post', PostSchema);
