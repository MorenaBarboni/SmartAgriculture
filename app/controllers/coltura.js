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

module.exports.getAllColture = function (req, res) {
  Coltura.find({}, function (err, data) {
    console.log(data);
    if (data) {
      var colture = [];
      data.forEach(d => {
        colture.push(d);
      });
      console.log(colture.nome);
      res.send(colture);
    } else {
      res.send("error");
    }
  })
}


