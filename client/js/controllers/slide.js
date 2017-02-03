angular
.module('app')
.controller('SliderController', ['$scope', 'Files', function($scope, Files) {
    $scope.images=[{src:'img1.png',title:'Pic 1'},{src:'img2.jpg',title:'Pic 2'},{src:'img3.jpg',title:'Pic 3'},{src:'img4.png',title:'Pic 4'},{src:'img5.png',title:'Pic 5'}]; 
    
    /*var filter = {
        "filter": {
          "where": {
            "modelsliderIdmodel": 2
          }
        }
    };*/


    $scope.slides = Files.find( {"filter": {"where": {"modelsliderIdmodel": localStorage.getItem('idmodel')}}}).$promise.then(function(results) {
    	console.log(results);
    	$scope.teste1 = JSON.stringify(results);
    	$scope.images = JSON.parse($scope.teste1);
    	
    });   

}]);