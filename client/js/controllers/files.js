  angular
  .module('app')
  .controller('FilesController', ['$scope', 'Files',
      function($scope, Files) {
      
      //$scope.images=[{src:'img1.png',title:'Pic 1'},{src:'img2.jpg',title:'Pic 2'},{src:'img3.jpg',title:'Pic 3'},{src:'img4.png',title:'Pic 4'},{src:'img5.png',title:'Pic 5'}]; 
       $scope.slides = Files.find().$promise.then(function(results) {
      	  console.log(results);
      });

   }]);   	