var mongoose = require("mongoose");
var User = mongoose.model("User");

//Per verificare l'accesso
module.exports.verify = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      message: "You're not authorized to access this page"
    });
  } else {
    User.findById(req.payload._id).exec(function(err, user) {
      res.status(200).json(user);
    });
  }
};

//Cancella un utente selezionandolo tramite id
module.exports.deleteUserById = function(req, res) {
  User.remove(
    {
      _id: req.params._id
    },
    function(err, course) {
      if (err) res.send(err);
      res.json({ message: "User successfully deleted" });
    }
  );
};


