var mainRouter = require('express').Router();
var auth = require('../helpers/auth');

// Add all routers here
// mainRouter.use('/',require('./name of router'));
mainRouter.get('/', auth, (req, res) => {
  res.cookie('name', req.user.name, {signed: true});
  res.cookie('i', req.user._id, {signed: true});
  res.render('index');
});

mainRouter.use('/users', require('./usersRouter.js'))

module.exports = mainRouter;