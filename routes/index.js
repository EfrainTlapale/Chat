var mainRouter = require('express').Router();
var auth = require('../helpers/auth');
var crypt = require('../helpers/crypt');
var Message = require('../models/message');

// Add all routers here
// mainRouter.use('/',require('./name of router'));
mainRouter.get('/', auth, (req, res) => {
  res.cookie('name', crypt.encrypt(req.user.name));
  res.cookie('i', crypt.encrypt(req.user._id));
  var query = Message.find({});
  Message.find({})
  .populate('from')
  .exec((err, data)=>{
    res.render('index',{
      messages: data
    });
  });
   
  
});

mainRouter.use('/users', require('./usersRouter.js'))

module.exports = mainRouter;