var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var mongoose = require('mongoose');
var morgan = require('morgan');
var config = require('./config');

var app = express();

var http = require('http').Server(app);
require('./socketio')(http);


mongoose.connect(config.db, () => {
  console.log('DB connected');
});

var routes = require('./routes');



app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public'))); app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'topsecret',
  saveUninitialized: true,
  resave: true
}));

//Pasport config
require('./passport')(app);


app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);

app.use(function (req, res, next) {
  res.status(404);
  res.render('404');
});
app.set('port', (process.env.PORT || 3000));

http.listen(app.get('port'), () => {
  console.log('Server started');
});