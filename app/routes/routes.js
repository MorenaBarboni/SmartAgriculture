var express = require("express");
var router = express.Router();
var jwt = require("express-jwt");
var auth = require("../config/authExample");

var ctrlProfile = require("../controllers/profile");
var ctrlAuth = require("../controllers/authentication");


// Profilo Utente
router.get("/profile", auth, ctrlProfile.verify);

// Autenticazione e Registrazione Utente
router.post("/registration", ctrlAuth.registerUser); //Registrazione utente
router.post("/login", ctrlAuth.login); //login utente

//Gestione utenti 
router.delete("/profile/:_id", ctrlProfile.deleteUserById); //Elimina un utente tramite Id

module.exports = router;
