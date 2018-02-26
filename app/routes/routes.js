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
router.get("/colture", ctrlColtura.getAllColture); //Prende tutte le colture disponibili
router.get("/terreni", ctrlColtura.getTerreno);  //Ottiene tutti i tipi di terreno
router.get("/statiCrescita", ctrlColtura.getStatiCrescita);//Ottiene tutti i possibili stati di crescita

//Associazione Sensori
router.post("/profile/updateAssociazioneColtura", ctrlProfile.updateAssociazioneColtura); //Associa o Rimuove una coltura a un sensore per un certo utente

//Modifica Colture
router.post("/profile/updateColtura", ctrlProfile.updateColtura); //Aggiorna le colture del contadino in caso di modifiche

module.exports = router;
