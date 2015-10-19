var mongoose = require('mongoose');
var crypto = require('crypto');


var UserSchema = mongoose.Schema({
    email: { type: String, required: true },
    hashed_password: { type: String, required: true },
    salt: { type: String, default: '' },
    is_admin: { type: Boolean, default: false }
});

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () { return this._password; });


UserSchema.methods = {

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

mongoose.model('User', UserSchema);
