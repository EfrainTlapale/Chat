var User = require('../models/user');
var bcrypt = require('bcryptjs');

exports.register = (req,res)=>{
  var user = new User(req.body);

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('passwordConfirmation', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors){
    res.render('register',{
      errors: errors
    });
  }else{
    user.save((err, newUser) => {
      if(err){
        res.redirect('/users/register');
      }else{
        req.flash('success_msg', 'You are registered and can now login');
        res.redirect('/users/login');
      }
    })
  }
};