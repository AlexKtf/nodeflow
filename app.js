var express = require('express');
var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/test');

app.set('views', './app/views');
app.set('view engine', 'jade');

app.use('/assets', express.static(__dirname + './app/assets'));

require('./app/models/user.js');
require('./config/routes')(app);

app.listen(port);
