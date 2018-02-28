(function () {
  angular.module("greenhouseApp", ["ngRoute"]);

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "homepage/homepage.view.html",
        controller: "homepageCtrl",
        controllerAs: "vm"
      })
      .when("/profile", {
        templateUrl: "/profile/profile.view.html",
        controller: "profileCtrl",
        controllerAs: "vm"
      }).when("/profile/details/:numSensore", {
        templateUrl: "/profile/details.view.html",
        controller: "detailsCtrl",
        controllerAs: "vm"
      })
      .when("/logout", {
        resolve: {
          logout: [
            "logoutService",
            function (logoutService) {
              logoutService();
            }
          ]
        },
        redirectTo: "/"
      })
      .otherwise({ redirectTo: "/" });

    $locationProvider.html5Mode(true);
  }

  function run($rootScope, $location, authentication) {
    $rootScope.$on("$routeChangeStart", function (
      event,
      nextRoute,
      currentRoute
    ) {
      if (
        $location.path() === "/profile" && (!authentication.isLoggedIn())
      ) {
        $location.path("/");
      } else if ($location.path() === "/" && authentication.isLoggedIn()) {
        $location.path("/profile");
      }
    });
  }

  angular
    .module("greenhouseApp")
    .config(["$routeProvider", "$locationProvider", config])
    .run(["$rootScope", "$location", "authentication", run]);
})();
