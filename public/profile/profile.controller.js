(function () {
  angular.module("greenhouseApp").controller("profileCtrl", profileCtrl);

  profileCtrl.$inject = ["$window", "$location", "userService", "authentication", "colturaService"];
  function profileCtrl($window, $location, userService, authentication, colturaService) {

    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.user = {}; //Utente corrente

    var provaNumeroSensore = 3;
    var provaNomeColtura = "Fragola";

    vm.nomeColtura //il nome della coltura da associare al sensore
    vm.colturaDaAssociare = {}; //Oggetto coltura da associare al sensore
    vm.numSensore // il numero del sensore a cui associare la coltura

    initController();

    function initController() {
      userService
        .getProfile()
        .success(function (data) {
          vm.user = data;
        }).error(function (e) {
          console.log(e);
        }).then(function () {
         //associaColtura();
        })
    }

    //prende una coltura per nome 
    function getColtura() {
      colturaService.getColturaByName("Insalata").then(function (result) {
        vm.colturaDaAssociare = result;
      })
    }

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
          userService.associaColtura(vm.user).then(function (response) {
            if (response.data === "error") {
              console.log("errore");
            }
          })
        }
      })
    }

    //Prende in input un numero di sensore e controlla se esso è libero.
    function checkSensore(numeroSensore) {
      var coltureUtente = vm.user.colture;
      for (var i = 0; i < coltureUtente.length; i++) {
        sensoreOccupato = coltureUtente[i].sensore;
        console.log(" sensore: " + sensoreOccupato)
        if (sensoreOccupato === numeroSensore) {
          console.log("Occupato");
          return true;
        }
      }
      console.log("Libero");
      return false;
    }

    //Setta un sensore a occupato.
    function occupaSensore(numeroSensore) {
      var sensoriUtente = vm.user.sensori;
      for (var i = 0; i < sensoriUtente.length; i++) {
        idSensore = sensoriUtente[i].idSensore;
        if (idSensore === numeroSensore) {
          sensoriUtente[i].libero = false;
        }
      }
    }



  }
})();
