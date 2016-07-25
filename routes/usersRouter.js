var router = require('express').Router();
var user = require('../controllers/users');

router.route('/register')
  .get(user.register);

router.route('/login')
  .get(user.login); 

module.exports = router;