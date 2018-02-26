var passport = require("passport");
var mongoose = require("mongoose");
var User = mongoose.model("User");


module.exports.login = function (req, res) {
  passport.authenticate("local", function (err, user, info) {
    var token;

    if (err) {
      res.status(404).json(err);
      return;
    }

    if (user) {
      token = user.generateToken();
      res.status(200);
      res.json({
        token: token
      });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports.registerUser = function (req, res) {
 
  var user = new User();

  user.nome = req.body.nome;
  user.cognome = req.body.cognome;
  user.email = req.body.email;
  user.username = req.body.username;
  user.colture = req.body.colture;
  user.sensori = req.body.sensori;

  user.setPassword(req.body.password);
  if (user.username === "" || user.email === "") {
    res.send("error");
  } else {
    User.findOne({ username: user.username }, function (err, data) {
      if (data) {
        res.send("error");
      } else {
        user.save(function (err) {
          var token;
          token = user.generateToken();
          res.status(200);
          res.json({
            token: token
          });
        });
      }
    });
    console.log("User registered");
  }
};
