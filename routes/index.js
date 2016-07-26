var mainRouter = require('express').Router();
var auth = require('../helpers/auth');
// Add all routers here
// mainRouter.use('/',require('./name of router'));
mainRouter.get('/', auth, (req, res) => {
  res.render('index');
});

mainRouter.use('/users', require('./usersRouter.js'))

module.exports = mainRouter;