var router = require('express').Router();
var user = require('../controllers/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post(user.register);

router.route('/login')
  .get((req, res) => {
    res.render('login');
  })
  .post(passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }), 
  (req, res) => {
    res.redirect('/');
  });

router.route('/logout')
  .get((req,res)=>{
    req.logout();
    req.flash('success_msg', 'You are now logged out');
    res.redirect('/users/login');
  });

module.exports = router;