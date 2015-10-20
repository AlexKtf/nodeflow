var mongoose = require('mongoose');
var crypto = require('crypto');
var validator = require('validator');

/* Schema */

var UserSchema = mongoose.Schema({
    email: { type: String },
    hashed_password: { type: String },
    salt: { type: String, default: '' },
    is_admin: { type: Boolean, default: false }
});

/* Virtual field */

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () { return this._password; });

/* Validator */

UserSchema.path('email').validate(function (email) {
  return validator.isEmail(email);
}, 'Email must be a valid email adress');

UserSchema.path('email').validate(function (email, fn) {
  var User = mongoose.model('User');

  if (this.isNew || this.isModified('email')) {
    User.find({ email: email }).exec(function (err, users) {
      fn(!err && users.length === 0);
    });
  } else fn(true);
}, 'Email already exists');

UserSchema.path('hashed_password').validate(function (hashed_password) {
  return validator.isLength(this._password, 8);
}, 'Password length must be superior to 8');


/* Instance methods */

UserSchema.methods = {

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },
  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  }
};

/* Static methods */

UserSchema.statics = {

  load: function (options, cb) {
    options.select = options.select || 'email';
    this.findOne(options.criteria).select(options.select).exec(cb);
  }
};

/* Declare model */

mongoose.model('User', UserSchema);
