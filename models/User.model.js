var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String
});

//hook from mongoose to modify data before saving it into db
UserSchema.pre('save', function(next) { //save new user created; next needed since it is middleware
  // capitalize username
  this.username.charAt(0).toLocalUpperCase() + this.username.slice(1);
  next();
});

module.exports = mongoose.model('User', UserSchema);