var mongoose = require('mongoose');
var url = 'mongodb://localhost/greenhouse';

//Models

require('../models/users'); //Utenti
require('../models/coltura'); //Colture
require('../models/sensore'); //Sensori

mongoose.connect(url);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + url);
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose error: ' + err);
});



