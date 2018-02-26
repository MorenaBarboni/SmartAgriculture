var mongoose = require("mongoose");
var Coltura = mongoose.model("Coltura");

//Ottiene una coltura per nome
module.exports.getColturaByName = function (req, res) {
  Coltura.findOne({ nome: req.params.nome }, function (err, data) {
    console.log(data);
    if (data) {
      res.send(data);
    } else {
      res.send("error");
    }
  });
};

//Ottiene tutte le colture
module.exports.getAllColture = function (req, res) {
  Coltura.find({}, function (err, data) {
    res.send(data);
  }).sort({ nome: 1 });
};

//Ottiene tutti i terreni
module.exports.getTerreno = function (req, res) {
  res.send(Coltura.schema.path('tipoTerreno').enumValues);
};

//Ottiene tutti gli stati di crescita
module.exports.getStatiCrescita = function (req, res) {
  res.send(Coltura.schema.path('statoCrescita').enumValues);
};