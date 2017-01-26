angular
  .module('app')
  .controller('ModelSliderController', ['$scope', 'Modelslider',
      function($scope, Modelslider) {
      $scope.modelo = 0; 	
 
      $scope.slides = Modelslider.find().$promise.then(function(results) {
      	  console.log(results);
          $scope.modelos = results;
      });


       $scope.selectInput = function (modelo) {
       	 console.log($scope);
         //alert(modelo);
         window.location.href = "/view/slide/";
       };
 
  }]);