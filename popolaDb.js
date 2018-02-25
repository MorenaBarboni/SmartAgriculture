//script per popolare il database
var coltura = require('./app/models/coltura');
var sensore = require('./app/models/sensore');
//var contadino = require('./models/user');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/greenhouse');
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'errore nella connessione al db'));

var fragola = new coltura({
    nome: 'Fragola',
    minUmidita: [45, 48, 50, 55],
    maxUmidita: [50, 52, 58, 62]
});

fragola.save(function (err) {
    if (err) throw err;
});

var insalata = new coltura({
    nome: 'Insalata',
    minUmidita: [40, 42, 45, 48],
    maxUmidita: [52, 55, 58, 63]
});
insalata.save(function (err) {
    if (err) throw err;
});

var sensore1 = new sensore({
    idSensore: 1
});
sensore1.save(function (err) {
    if (err) throw err;
});

var sensore2 = new sensore({
    idSensore: 2
});
sensore2.save(function (err) {
    if (err) throw err;
});

var sensore3 = new sensore({
    idSensore: 3
});
sensore3.save(function (err) {
    if (err) throw err;
});

var sensore4 = new sensore({
    idSensore: 4
});
sensore4.save(function (err) {
    if (err) throw err;
});



//Mi disconnetto dal database
//mongoose.connection.close();


