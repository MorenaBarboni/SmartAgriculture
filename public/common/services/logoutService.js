angular.module('greenhouseApp').factory('logoutService', function ($location, $window) {
    return function () {
        console.log("Logout");
        $window.localStorage.removeItem('mean-token');
        $location.path('home');
    }
});