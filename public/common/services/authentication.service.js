(function () {
  angular.module("greenhouseApp").service("authentication", authentication);

  authentication.$inject = ["$http", "$window", "$location"];
  function authentication($http, $window, $location) {
    var saveToken = function (token) {
      $window.localStorage["mean-token"] = token;
    };

    var getToken = function () {
      return $window.localStorage["mean-token"];
    };

    //Controlla se l'utente è loggato
    var isLoggedIn = function () {
      var token = getToken();
      var payload;

      if (token) {
        payload = token.split(".")[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    //restituisce gli attributi dell'utente corrente
    var currentUser = function () {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = token.split(".")[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        console.log("EMAIL:" + payload.email);
        console.log("NOME:" + payload.nome);
        console.log("USERNAME:" + payload.username);
        return {
          email: payload.email,
          username: payload.username,
          nome: payload.nome,
          cognome: payload.cognome,
          colture: payload.colture
        };
      }
    };

    //Registrazione
    register = function (user) {
      return $http.post("/api/registration", user);
    };

    //Login
    login = function (user) {
      return $http.post("/api/login", user).success(function (data) {
        saveToken(data.token);
      });
    };

    return {
      currentUser: currentUser,
      saveToken: saveToken,
      getToken: getToken,
      isLoggedIn: isLoggedIn,
      register: register,
      login: login
    };
  }
})();
