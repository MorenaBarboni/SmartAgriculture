(function () {
  angular.module("greenhouseApp").controller("detailsCtrl", detailsCtrl);

  detailsCtrl.$inject = ["$window", "$location", "$routeParams", "userService", "authentication", "colturaService", "$scope"];
  function detailsCtrl($window, $location, $routeParams, userService, authentication, colturaService, $scope) {

    var vm = this;
    //Utente corrente
    vm.user = {};

    //Controlla se l'utente è loggato
    vm.isLoggedIn = authentication.isLoggedIn();

    vm.numSensore = $routeParams.numSensore; //Numero di sensore

    vm.colturaCorrente = {}
    vm.colturaDefault = {};//Dati di default della coltura corrente

    //Parametri modifica coltura
    vm.modificaColtStato;
    vm.modificaColtMin;
    vm.modificaColtMax;

    initController();

    function initController() {
      userService
        .getProfile()
        .success(function (data) {
          vm.user = data;
        }).error(function (e) {
          console.log(e);
        }).then(function () {
          initColtura();
        }).then(function () {
          getColturaDefault();
        })
    }

    //Inizializza coltura corrente
    function initColtura() {
      for (var i = 0; i < vm.user.colture.length; i++) {
        if (vm.user.colture[i].sensore == vm.numSensore) {
          vm.colturaCorrente = vm.user.colture[i];
          break;
        }
      }
    }

    //Recupera i dati di default della coltura corrente
    function getColturaDefault() {
      colturaService.getColturaByName(vm.colturaCorrente.nome).then(function (result) {
        vm.colturaDefault = result;
      })
    }


    //Modifica lo stato e setta l'umidità di default
    vm.setStato = function () {
      for (var i = 0; i < vm.user.colture.length; i++) {
        if (vm.user.colture[i].sensore == vm.vm.numSensore) {
          vm.user.colture[i].statoCrescita = vm.modificaColtStato;

          //Associa umidità di default per quello stato
          switch (vm.modificaColtStato) {
            case "Seme":
              vm.user.colture[i].minUmidita = vm.colturaDefault.minUmidita[0];
              vm.user.colture[i].maxUmidita = vm.colturaDefault.maxUmidita[0];
              break;
            case "Germoglio":
              vm.user.colture[i].minUmidita = vm.colturaDefault.minUmidita[1];
              vm.user.colture[i].maxUmidita = vm.colturaDefault.maxUmidita[1];
              break;
            case "PiantaAdulta":
              vm.user.colture[i].minUmidita = vm.colturaDefault.minUmidita[2];
              vm.user.colture[i].maxUmidita = vm.colturaDefault.maxUmidita[2];
              break;
            case "Raccolta":
              vm.user.colture[i].minUmidita = vm.colturaDefault.minUmidita[3];
              vm.user.colture[i].maxUmidita = vm.colturaDefault.maxUmidita[3];
              break;
          }
        }
        userService.updateColtureUtente(vm.user).then(function (response) {
          if (response.data === "error") {
            console.log("errore");
          }
        })
        window.location.reload();
      }
    }



  }
})();
