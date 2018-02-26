var express = require("express");
var router = express.Router();
var jwt = require("express-jwt");
var auth = require("../config/authExample");

var ctrlProfile = require("../controllers/profile");
var ctrlAuth = require("../controllers/authentication");
var ctrlColtura = require("../controllers/coltura");


// Profilo Utente
router.get("/profile", auth, ctrlProfile.verify);

// Autenticazione e Registrazione Utente
router.post("/registration", ctrlAuth.registerUser); //Registrazione utente
router.post("/login", ctrlAuth.login); //login utente

// Colture
router.get("/coltura/:nome", auth, ctrlColtura.getColturaByName); //Prende una coltura per nome
//L'HO COMMENTATA PERCHE MI DAVA ERRORE :(
//router.post("/profile/associaColtura", ctrlProfile.associaColtura); //Associa una coltura a un utente
router.get("/colture", ctrlColtura.getAllColture, ctrlColtura.getTerreno, ctrlColtura.getStatiCrescita/*, ctrlProfile.getFreeSensori*/); //Prende tutte le colture disponibili
router.post("/profile/updateColtura", ctrlProfile.updateAssociazioneColtura); //Associa o Rimuove una coltura a un sensore per un certo utente

module.exports = router;
