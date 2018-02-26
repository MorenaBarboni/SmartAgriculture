var mongoose = require("mongoose");
var User = mongoose.model("User");

//Per verificare l'accesso
module.exports.verify = function (req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      message: "You're not authorized to access this page"
    });
  } else {
    User.findById(req.payload._id).exec(function (err, user) {
      res.status(200).json(user);
    });
  }
};

//Associa una coltura a un utente

module.exports.updateAssociazioneColtura = function (req, res) {
 User.update(
    { _id: req.body._id },
    {
      $set: {
       colture: req.body.colture,
       sensori: req.body.sensori
      }
    },
    function(err) {
      if (err) {
        console.log(err);
      }
      res.status(200);
    }
  );
  
};



