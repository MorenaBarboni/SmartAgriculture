(function() {
  angular.module("greenhouseApp").service("userService", userService);

  userService.$inject = ["$http", "authentication"];
  function userService($http, authentication) {

    //Ottiene i dati del profilo corrente
    var getProfile = function() {
      return $http.get("/api/profile", {
        headers: {
          Authorization: "Bearer " + authentication.getToken()
        }
      });
    };

     //Cancella un utente tramite Id
    deleteUser = function(userId) {
      return $http
        .delete("/api/profile/" + userId)
        .success(function(data, status) {
          console.log(data);
        });
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
      deleteUser: deleteUser
    };
  }
})();
