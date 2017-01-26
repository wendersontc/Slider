angular
.module('app')
.controller('SliderController', ['$scope', 'Files', function($scope, Files) {
    //$scope.images=[{src:'img1.png',title:'Pic 1'},{src:'img2.jpg',title:'Pic 2'},{src:'img3.jpg',title:'Pic 3'},{src:'img4.png',title:'Pic 4'},{src:'img5.png',title:'Pic 5'}]; 
    
    $scope.slides = Files.find().$promise.then(function(results) {
    	
    	$scope.teste = results;
    	$scope.images = results;

    	console.log($scope.teste);
    	console.log($scope.images);
    	
    });   

}])
.directive('slider', function ($timeout) {
  return {
    restrict: 'AE',
	replace: true,
	scope:{
		images: '='
	},
    link: function (scope, elem, attrs) {
	
		scope.currentIndex=0;
		scope.time = 0;

		scope.next=function(){
			scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
		};
		
		scope.prev=function(){
			scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
		};
		
		scope.$watch('currentIndex',function(){
			scope.images.forEach(function(image){
				console.log(scope.currentIndex);
				image.visible=false;
                //console.log(scope.images);
			});
			//console.log(scope.images[scope.currentIndex]);
			
			scope.time = 10000;

			//sliderFunc();
            timer=$timeout(scope.time);

			timer=$timeout(function(){
				scope.next();
				
			},scope.time);
            
			scope.$on('$destroy',function(){
				$timeout.cancel(timer);
			});
			scope.images[scope.currentIndex].visible=true;
		});
		
		/* Start: For Automatic slideshow*/
		
		var timer;
		
		var sliderFunc=function(){
			timer=$timeout(function(){
				scope.next();
				timer=$timeout(sliderFunc,scope.time);
			},scope.time);
		};
		
		
		
		/* End : For Automatic slideshow*/
		
    },
	templateUrl:'templates/templateurl.html'
  }
});