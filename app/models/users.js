var mongoose = require("mongoose");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var auth = require("../config/secretExample");
var Coltura = require('./coltura');
var Sensore = require('./sensore');


var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  nome: {
    type: String,
    required: true
  },
  cognome: {
    type: String,
    required: true
  },
  colture: [Coltura.schema],
  sensori: [Sensore.schema],
  hash: String,
  salt: String
},
  {
    versionKey: false
  });


userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha1")
    .toString("hex");
};

userSchema.methods.verifyPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha1")
    .toString("hex");
  return this.hash === hash;
};

userSchema.methods.generateToken = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.email,
      name: this.name,
      colture: this.colture,
      sensori:this.sensori,
      exp: parseInt(expiry.getTime() / 1000)
    },
    auth
  );
};

mongoose.model("User", userSchema);