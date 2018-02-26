(function () {
  angular.module("greenhouseApp").service("userService", userService);

  userService.$inject = ["$http", "authentication"];
  function userService($http, authentication) {

    //Ottiene i dati del profilo corrente
    var getProfile = function () {
      return $http.get("/api/profile", {
        headers: {
          Authorization: "Bearer " + authentication.getToken()
        }
      });
    };

     //Associa una coltura a un contadino
     updateAssociazioneColtura = function (user) {
      return $http.post("/api/profile/updateColtura", user);
    };


    //funzioni private
    function handleSuccess(res) {
      return res.data;
    }

    function handleError(res) {
      return $q.reject(res.data);
    }

    return {
      getProfile: getProfile,
      updateAssociazioneColtura: updateAssociazioneColtura
    };
  }
})();
