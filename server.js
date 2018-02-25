var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

console.log('Our app is running on http://localhost:8080');

//Require Passport
var passport = require('passport');

//Require Database
require('./app/config/db');

//Passport configuration
require('./app/config/passport');

// API routes
var routesApi = require('./app/routes/routes');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Passport 
app.use(passport.initialize());

// API routes used when path starts with /api
app.use('/api', routesApi);

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Port 
app.listen(8080);

// Errors

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ "message": err.name + ": " + err.message });
  }
});

module.exports = app;
