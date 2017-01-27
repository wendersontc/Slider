angular
  .module('app')
  .controller('ModelSliderController', ['$scope', 'Modelslider',
      function($scope, Modelslider) {
      $scope.modelo = {}; 	

       $scope.selectInput = function (mo) {
         //alert(mo.name);
         localStorage.setItem('idmodel',mo.name);
         window.location.href = "/view/slide/";
       };

      $scope.slides = Modelslider.find().$promise.then(function(results) {
      	  console.log(results);
          $scope.modelos = results;
      });


      
 
  }]);