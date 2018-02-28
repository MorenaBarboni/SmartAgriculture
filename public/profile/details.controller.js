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


  }
})();
