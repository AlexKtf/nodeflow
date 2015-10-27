var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');

var session = require('express-session');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var helpers = require('view-helpers');
var paginate = require('express-paginate');

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;
var mongo_uri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test';

var app = express();


mongoose.connect(mongo_uri);


app.use(compression({ threshold: 512 }));

require('./app/models/user.js');
require('./app/models/post.js');
require('./config/passport')(passport);

app.use('/assets', express.static(__dirname + '/app/assets'));

app.set('views', './app/views');
app.set('view engine', 'jade');
app.locals.moment = require('moment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(cookieParser());
app.use(cookieSession({ secret: 'nodeflow' }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'nodeflow',
  store: new mongoStore({ url: mongo_uri })
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// Manage format request
app.use(function (req, res, next) {
  var format = req.query.format;
  if (format) {
    req.headers.accept = 'application/' + format;
  }
  next();
});

app.use(helpers('nodeflow'));
app.use(paginate.middleware(1, 50));

require('./config/routes')(app, passport);

app.listen(port);
