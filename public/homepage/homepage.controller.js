(function () {
    //CONTROLLER HOME
    angular.module("greenhouseApp").controller("homepageCtrl", homepageCtrl);

    homepageCtrl.$inject = ["$http", "$window", "$location", "userService", "$scope", "authentication", "userService"];
    function homepageCtrl($http, $window, $location, userService, $scope, authentication, ) {
        var vm = this;

        vm.accessData = {
            email: "",
            password: ""
        };

        vm.registerData = {
            nome: "",
            cognome: "",
            username: "",
            email: "",
            password: "",
            colture: [],
            sensori: [
                {
                    idSensore: 1,
                    libero: true,
                    umiditaPercepita: Math.floor((Math.random() * 100) + 1)
                },
                {
                    idSensore: 2,
                    libero: true,
                    umiditaPercepita: Math.floor((Math.random() * 100) + 1)
                }, {
                    idSensore: 3,
                    libero: true,
                    umiditaPercepita: Math.floor((Math.random() * 100) + 1)
                }, {
                    idSensore: 4,
                    libero: true,
                    umiditaPercepita: Math.floor((Math.random() * 100) + 1)
                }
            ]
        };

        vm.isLoggedIn = authentication.isLoggedIn();

        initController(); //Inizializza il controller

        function initController() {
        }

        //Login
        vm.onSubmitLogin = function () {
            authentication
                .login(vm.accessData)
                .error(function (err) {
                    alert("Email o password errata");
                })
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
        };



        //Registra utente e fai il login
        vm.onSubmitRegister = function () {
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
