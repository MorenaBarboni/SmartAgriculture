(function () {
  angular.module("greenhouseApp").controller("profileCtrl", profileCtrl);

  profileCtrl.$inject = ["$location", "userService", "authentication", "colturaService"];
  function profileCtrl($location, userService, authentication, colturaService) {

    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.user = {}; //Utente corrente

    var provaNumeroSensore = 2;
    var provaNomeColtura = "Insalata";

    vm.nomeColtura //il nome della coltura da associare al sensore
    vm.colturaDaAssociare = {}; //Oggetto coltura da associare al sensore
    vm.numSensore // il numero del sensore a cui associare la coltura
    vm.coltureDisponibili = [];

    initController();

    function initController() {
      userService
        .getProfile()
        .success(function (data) {
          vm.user = data;
        }).error(function (e) {
          console.log(e);
        }).then(function () {
          associaColtura();
        })
/*      colturaService
        .getAllColture()
        .success(function (result) {
          vm.coltureDisponibili = result;
        }).error(function (e) {
          console.log(e);
        })*/
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

    /*  function associaColtura() {
        colturaService.getColturaByName(provaNomeColtura).then(function (result) {
          if (result === "error") {
            console.log("la coltura non esiste");
          } else {
            vm.colturaDaAssociare = result;
            vm.colturaDaAssociare.sensore = provaNumeroSensore;
  
            if (!vm.user.colture) {
              var colture = []
              colture.push(vm.colturaDaAssociare);
              vm.user.colture = colture;
            } else {
              vm.user.colture.push(vm.colturaDaAssociare);
            }
            userService.associaColtura(vm.user).then(function (response) {
              if (response.data === "error") {
                console.log("errore");
              }
            })
          }
        })
      }*/
  }
})();
