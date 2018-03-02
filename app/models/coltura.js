var mongoose = require("mongoose");

var Sensore = require('./sensore');

var colturaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  minUmidita: [{ type: Number }],
  maxUmidita: [{ type: Number }],
  sensore: {
    type: Number,
    ref: 'Sensore'
  },
  irrigazioneAutomatica: {
    type: Boolean,
    default: true
  },
  irrigazioneOn: {
    type: Boolean,
    default: false
  },
  statoCrescita: {
    type: String,
    enum: ['Seme', 'Germoglio', 'PiantaAdulta', 'Raccolta'], default: 'Seme'
  },
  tipoTerreno: {
    type: String, enum: ['Sabbioso', 'Ghiaioso', 'Argilloso', 'Limoso']
  },
  orarioAttivazione: {
    type: Date
  },
  orarioDisattivazione: {
    type: Date
  }
});

const Coltura = (module.exports = mongoose.model("Coltura", colturaSchema));




