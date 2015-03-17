angular.module('bicim')
    .controller('landingController', landingController);

landingController.$inject = ['$scope', 'leafletData'];

function landingController($scope, leafletData){

    'use strict';

    var mapInstance;
    var waypoints = [];
    var formatter = new L.Routing.Formatter({
        language: 'sp'
    });
    var routeControl = L.Routing.control({
        waypoints: waypoints,
        formatter: formatter
    });

    $scope.mensaje = 'hola';

    routeControl.on('routesfound', function(e){
        console.log(e);
    });

    leafletData.getMap()
        .then(function(map) {
            mapInstance = map;
        });

    angular.extend($scope, {
        defaults: {
            center: {
                lat: 20.669408195674592,
                lng: -103.34426879882811,
                zoom: 12
            }
        }
    });

    $scope.$on('leafletDirectiveMap.click', function(event, args){

        var posLatlng = args.leafletEvent.latlng;

        waypoints.push(posLatlng);

        console.log(mapInstance);

        if(waypoints.length > 1) {

            routeControl.setWaypoints(waypoints);
            try{
                routeControl.removeFrom(mapInstance);
            } catch(e) {
                console.error(e.message);
            }
            routeControl.addTo(mapInstance);

            $scope.$apply();

        }

    });
    
}

