(function() {
  angular.module("greenhouseApp").controller("profileCtrl", profileCtrl);

  profileCtrl.$inject = ["$location","userService","authentication" ];
  function profileCtrl($location, userService, authentication) {
    
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.user = {}; //Utente corrente

 
    initController();

    function initController() {
     userService
        .getProfile()
        .success(function(data) {
          vm.user = data;
        })
        .error(function(e) {
          console.log(e);
        });
    } 
  }
})();
