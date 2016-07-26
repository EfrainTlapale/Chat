var mongoose = require('mongoose');
var config = require('../config');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    index:true,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required:true
  }
});

userSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {
    return next()
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
    next();
  });
});


module.exports = mongoose.model('User', userSchema);