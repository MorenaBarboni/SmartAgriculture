(function () {
  angular.module("greenhouseApp").service("colturaService", colturaService);

  colturaService.$inject = ["$http", "authentication"];
  function colturaService($http, authentication) {

    //Ottiene una coltura per nome
    getColturaByName = function (nomeColtura) {
      return $http
        .get("/api/coltura/" + nomeColtura, {
          headers: {
            Authorization: "Bearer " + authentication.getToken()
          }
        })
        .then(handleSuccess, handleError);
    };

     //Ottiene tutte le colture
    getAllColture = function () {
      return $http
        .get("/api/colture", {
          headers: {
            Authorization: "Bearer " + authentication.getToken()
          }
        })
        .then(handleSuccess, handleError);
    };

     //Ottiene tutti i tipi di terreno
    getTerreno = function () {
      return $http
        .get("/api/terreni", {
          headers: {
            Authorization: "Bearer " + authentication.getToken()
          }
        })
        .then(handleSuccess, handleError);
    };
    
     //Ottiene tutti i possibili stati di crescita
    getStatiCrescita = function () {
      return $http
        .get("/api/statiCrescita", {
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
      getColturaByName: getColturaByName,
      getAllColture: getAllColture,
      getTerreno : getTerreno,
      getStatiCrescita : getStatiCrescita
    };
  }
})();
