angular.module('appCrimeMaps', ['uiGmapgoogle-maps'])
    .controller('mainCtrl', function($scope,loadDataCrimeService) {

$scope.dataAvailable=false;
  $scope.dataHisto=loadDataCrimeService.getDataD3js();
   if($scope.dataHisto == "undefined" || $scope.dataHisto == null || $scope.dataHisto.length == 0)
   {
       var promise = loadDataCrimeService.loadData().then(function(){

       $scope.dataHisto=loadDataCrimeService.getDataD3js();
       $scope.dataGoogleAPI=loadDataCrimeService.getDataGoogleAPI();
       $scope.dataAvailable=true;

       });
   }

   $scope.windowOptions = {
            visible: false
        };

        $scope.markersEvents = {

        mouseover: function (marker) {
              //disabled google map crash, too many markers 
        },
        };

     $scope.show = function() {
            $scope.windowOptions.visible = true;
        };

        $scope.map = {center: {latitude: 53.483959, longitude:  -2.244644 }, zoom: 10 };
        $scope.options = {
                            scrollwheel: true,
                            disableDefaultUI: true,
                            zoomControl: true, 
                            scaleControl: true,
                          
                    };

    });