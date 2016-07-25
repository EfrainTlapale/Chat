var router = require('express').Router();
var user = require('../controllers/users');

router.route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post(user.register);

router.route('/login')
  .get((req, res) => {
    res.render('login');
  })
  .post(user.login);

module.exports = router;