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

    //Associa o rimuove una coltura da un sensore per un contadino
    updateAssociazioneColtura = function (user) {
      return $http.post("/api/profile/updateAssociazioneColtura", user);
    };

    //Aggiorna le colture del contadino in caso di modifiche
    updateColtureUtente = function (updateData) {
      return $http.post("/api/profile/updateColtura", updateData);
    };

    getFreeSensori = function () {
      return $http
        .get("/api/colture", {
          headers: {
            Authorization: "Bearer " + authentication.getToken()
          }
        })
        .then(handleSuccess, handleError);
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
      updateAssociazioneColtura: updateAssociazioneColtura,
      updateColtureUtente:updateColtureUtente,
      getFreeSensori: getFreeSensori
    };
  }
})();
