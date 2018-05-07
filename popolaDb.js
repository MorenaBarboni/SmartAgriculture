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
})

var carote = new coltura({
    nome: 'Carote',
    minUmidita: [48, 52, 54, 56],
    maxUmidita: [60, 63, 66, 68]
});
carote.save(function (err) {
    if (err) throw err;
});

var pomodori = new coltura({
    nome: 'Pomodori',
    minUmidita: [50, 52, 55, 57],
    maxUmidita: [68, 70, 74, 78]
});
pomodori.save(function (err) {
    if (err) throw err;
});

var angurie = new coltura({
    nome: 'Angurie',
    minUmidita: [55, 58, 63, 65],
    maxUmidita: [68, 70, 74, 80]
});
angurie.save(function (err) {
    if (err) throw err;
});

var erba = new coltura({
    nome: 'Erba',
    minUmidita: [30, 33, 36, 40],
    maxUmidita: [46, 48, 50, 52]
});
erba.save(function (err) {
    if (err) throw err;
});

var ciliegie = new coltura({
    nome: 'Ciliegie',
    minUmidita: [44, 46, 48, 50],
    maxUmidita: [56, 60, 65, 68]
});
ciliegie.save(function (err) {
    if (err) throw err;
});

var fagioli = new coltura({
    nome: 'Fagioli',
    minUmidita: [34, 38, 41, 44],
    maxUmidita: [46, 48, 51, 53]
});
fagioli.save(function (err) {
    if (err) throw err;
});

var mele = new coltura({
    nome: 'Mele',
    minUmidita: [50, 53, 55, 57],
    maxUmidita: [60, 63, 65, 69]
});
mele.save(function (err) {
    if (err) throw err;
});

var cactus = new coltura({
    nome: 'Cactus',
    minUmidita: [15, 23, 25, 30],
    maxUmidita: [33, 35, 38, 44]
});
cactus.save(function (err) {
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


