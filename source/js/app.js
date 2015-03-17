angular.module('bicim', ['ui.router', 'leaflet-directive'])
    .config(bicimConfig)
    .run(bicimRun);

bicimConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function bicimConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('landing', {
          url: "/",
          templateUrl: "partials/landing.html",
          controller: 'landingController'
        });

}

function bicimRun() {
        
}