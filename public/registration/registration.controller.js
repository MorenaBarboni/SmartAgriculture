(function () {
  angular
    .module("greenhouseApp")
    .controller("registrationCtrl", registrationCtrl
    );
  registrationCtrl
    .$inject = [
      "$location", "$http", "$window", "$scope", "$location", "authentication", "userService"];
  function registrationCtrl
    ($location, $http, $window, $scope, $location, authentication, userService) {
    var vm = this;

    vm.user = {};

    vm.registerData = {
      nome: "",
      cognome: "",
      username: "",
      email: "",
      password: "",
      colture: null
    };

    vm.accessData = {
      email: "",
      password: ""
    };

    initController();

    function initController() {

    }

    //Registra utente e fai il login
    vm.onSubmit = function () {
      console.log(vm.registerData);
      authentication.register(vm.registerData).then(function (response) {
        if (response.data === "error") {
          window.alert("Email o username già esistente!");
        } else {
          vm.accessData.email = vm.registerData.email;
          vm.accessData.password = vm.registerData.password;
          window.alert("Registrazione avvenuta con successo");
          authentication
            .login(vm.accessData)
            .then(function () {
              userService
                .getProfile()
                .success(function (data) {
                  vm.user = data;
                })
                .error(function (e) {
                  console.log(e);
                })
                .then(function () {
                  $location.path("profile");
                });
            });
        }
      });
    };
  }
})();
