var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcryptjs');

var User = require('./models/user');

//Passport config

module.exports = function(app){
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(
    function (username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        bcrypt.compare(password, user.password, (err, isMathc) => {
          if (err) return done(null, false, { message: 'Incorrect password.' });
          return done(null, user);
        });
        
      });
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });  
};

