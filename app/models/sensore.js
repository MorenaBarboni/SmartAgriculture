var mongoose = require("mongoose");

var sensoreSchema = new mongoose.Schema({
  idSensore: { type: Number, required: true, min: 1, unique: true },
  libero: { type: Boolean, required: true, default: true },
  umiditaPercepita: {type: Number}
},
  {
    versionKey: false
  });

const Sensore = (module.exports = mongoose.model("Sensore", sensoreSchema));


