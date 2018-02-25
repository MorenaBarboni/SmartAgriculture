(function () {

    angular
        .module('greenhouseApp')
        .controller('logoutCtrl', logoutCtrl);

    logoutCtrl.$inject = ['logoutService'];
    function logoutCtrl(logoutService) {
        logoutService
            .logout()
    }

})();