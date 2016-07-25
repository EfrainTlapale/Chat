var mainRouter = require('express').Router();

// Add all routers here
// mainRouter.use('/',require('./name of router'));
mainRouter.get('/', (req, res) => {
  res.render('index');
});
mainRouter.use('/users', require('./usersRouter.js'))

module.exports = mainRouter;