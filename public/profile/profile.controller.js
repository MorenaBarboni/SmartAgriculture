(function () {
  angular.module("greenhouseApp").controller("profileCtrl", profileCtrl);

  profileCtrl.$inject = ["$window", "$location", "userService", "authentication", "colturaService"];
  function profileCtrl($window, $location, userService, authentication, colturaService) {

    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.user = {}; //Utente corrente

    var provaNumeroSensore = 3;
    var provaNomeColtura = "Fragola";

    var provaRemoveSensore = 3;



    vm.nomeColtura //il nome della coltura da associare al sensore
    vm.colturaDaAssociare = {}; //Oggetto coltura da associare al sensore
    vm.numSensore // il numero del sensore a cui associare la coltura

    vm.coltureDisponibili = [];//Elenco di tutte le colture del db
    vm.terreni = [];
    vm.statiCrescita = [];
    vm.freeSensori = [];

    initController();

    function initController() {
      userService
        .getProfile()
        .success(function (data) {
          vm.user = data;
        }).error(function (e) {
          console.log(e);
        }).then(function () {
          getAllColture();
          getTerreno();
          getStatiCrescita();
        }).then(function () {
          //
        })
    }

    //prende una coltura per nome 
    function getColtura() {
      colturaService.getColturaByName("Insalata").then(function (result) {
        vm.colturaDaAssociare = result;
      })
    }

    //stampa tutte le colture disponibili
    function getAllColture() {
      colturaService.getAllColture().then(function (result) {
        vm.coltureDisponibili = result;
      });
    }

    //Ottiene tutti i tipi di terreno
    function getTerreno() {
      colturaService.getTerreno().then(function (result) {
        vm.terreni = result;
        console.log(vm.terreni);
      });
    }

    //Ottiene tutti i possibili stati di crescita
    function getStatiCrescita() {
      colturaService.getStatiCrescita().then(function (result) {
        vm.statiCrescita = result;
        console.log(vm.statiCrescita);
      });
    }

    //Dato un nome di coltura e un numero di sensore associa la coltura al sensore
    function associaColtura() {
      colturaService.getColturaByName(provaNomeColtura).then(function (result) {
        if (result === "error") {
          console.log("la coltura non esiste");
        }
        //Se tutti i sensori sono occupati
        else if (vm.user.colture.length === 4) {
          window.alert("Tutti i sensori sono occupati");
        }
        //Se il sensore scelto è occupato
        else if (checkSensore(provaNumeroSensore) === true) {
          window.alert("Il sensore selezionato è occupato. Rimuovere la coltura o selezionare un altro sensore");
        }
        else {
          vm.colturaDaAssociare = result;
          vm.colturaDaAssociare.sensore = provaNumeroSensore;

          //Se il contadino non ha l'array colture
          if (!vm.user.colture) {
            var colture = []
            colture.push(vm.colturaDaAssociare);
            vm.user.colture = colture;
            occupaSensore(provaNumeroSensore);

            //Se il contadino ha l'array colture
          } else {
            vm.user.colture.push(vm.colturaDaAssociare);
            occupaSensore(provaNumeroSensore);
          }
          userService.updateAssociazioneColtura(vm.user).then(function (response) {
            if (response.data === "error") {
              console.log("errore");
            }
          })
        }
      })
    }

    //Dato un numero di sensore e controlla se l'array di colture dell'utente contiene già
    //una coltura associata per quel numero di sensore.
    function checkSensore(numeroSensore) {
      var coltureUtente = vm.user.colture;
      for (var i = 0; i < coltureUtente.length; i++) {
        sensoreOccupato = coltureUtente[i].sensore;
        if (sensoreOccupato === numeroSensore) {
          return true;
        }
      }
      return false;
    }

    //Dato un numero di sensore in input setta il sensore a occupato.
    function occupaSensore(numeroSensore) {
      var sensoriUtente = vm.user.sensori;
      for (var i = 0; i < sensoriUtente.length; i++) {
        idSensore = sensoriUtente[i].idSensore;
        if (idSensore === numeroSensore) {
          sensoriUtente[i].libero = false;
        }
      }
    }

    //Dato un numero di sensore rimuove la coltura associata a quel sensore
    function rimuoviColtura() {
      removeColturaFromUser(provaRemoveSensore);
      liberaSensore(provaRemoveSensore);
      userService.updateAssociazioneColtura(vm.user).then(function (response) {
        if (response.data === "error") {
          console.log("errore");
        }
      })
    }

    //Prende in input un numero di sensore e rimuove la coltura che si riferisce a quel sensore
    //dall'array delle colture dell'utente
    function removeColturaFromUser(numeroSensore) {
      var coltureUtente = vm.user.colture;
      for (var i = 0; i < coltureUtente.length; i++) {
        numeroSensoreOccupato = coltureUtente[i].sensore;
        if (numeroSensoreOccupato === numeroSensore) {
          vm.user.colture.splice(i, 1);
        }
      }
    }

    //Dato un numero di sensore in input setta il sensore a libero.
    function liberaSensore(numeroSensore) {
      var sensoriUtente = vm.user.sensori;
      for (var i = 0; i < sensoriUtente.length; i++) {
        idSensore = sensoriUtente[i].idSensore;
        if (idSensore === numeroSensore) {
          sensoriUtente[i].libero = true;
        }
      }
    }



    //prende in input il numero sensore, e il valore di umidità minima da settare
    //e aggiorna il valore di umidità minima
    function setMinUmidita() {
      var coltureUtente = vm.user.colture;
      var statoColtura;
      var index;

      for (var i = 0; i < coltureUtente.length; i++) {
        numeroSensoreOccupato = coltureUtente[i].sensore;
        if (numeroSensoreOccupato === setMinUmiditaSensore) {

          statoColtura = coltureUtente[i].statoCrescita;
          index = i;

          break;
        }
      }
      if (statoColtura != null) {
        switch (statoColtura) {
          case "Seme":
            vm.user.colture[index].minUmidita[0] = provaMinUmidita;
            console.log("Seme:" + provaMinUmidita);
            break;
          case "Germoglio":
            vm.user.colture[index].minUmidita[1] = provaMinUmidita;
            console.log("Germoglio:" + provaMinUmidita);
            break;

          case "PiantaAdulta":
            vm.user.colture[index].minUmidita[2] = provaMinUmidita;
            console.log("PiantaAdulta:" + provaMinUmidita);
            break;
          case "Raccolta":
            vm.user.colture[index].minUmidita[3] = provaMinUmidita;
            console.log("Raccolta:" + provaMinUmidita);
            break;
        }

        var updateData = {};
        updateData._id = vm.user._id;
        updateData.colture = vm.user.colture;

        userService.updateColtureUtente(updateData).then(function (response) {
          if (response.data === "error") {
            console.log("errore");
          }
        })

      }
    }

  }
})();
