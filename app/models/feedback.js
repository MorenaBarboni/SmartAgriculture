var mongoose = require("mongoose");

var Coltura = require('./coltura');
var Contadino = require('./users');


var feedbackSchema = new mongoose.Schema({
  gradoSoddisfazione: { type: String, required: true },
  utente: { type: String, ref: 'Contadino' },
  tipoColtura: { type: String, ref: 'Coltura' },
  tipoTerreno: { type: String, ref: 'Coltura' },
  statoColtura: { type: String, ref: 'Coltura' },
  sogliaUmiditàMin: { type: Number, ref: 'Coltura' },
  sogliaUmiditàMax: { type: Number, ref: 'Coltura' }
},
  //toglie il campo __v dal db
  {
      versionKey: false
  });

const Feedback = (module.exports = mongoose.model("Feedback", feedbackSchema));




