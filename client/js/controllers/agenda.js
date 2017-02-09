angular
.module('app')
.controller('AgendaController', ['$scope', 'Appoint',
	function($scope,Appoint) {

		Appoint.find().$promise.then(function(results) {
			console.log(results);
			$scope.agendas = results;
		});

}])
.controller('NewAgendaController', ['$scope', 'Modelslider', 'Files', 
	'$location', 'Appoint','TimeAppoint',
	function($scope, Modelslider, Files, $location,Appoint,TimeAppoint) {
        
        $scope.models = [];
        
        $scope.partners = {};
        $scope.countPartners = 0;
        $scope.partners[0] = {
        	count: 0,
        	partnerId: 0,
        	hour_end:  new Date(),
        	hour_start:  new Date(),
        	model: ''
        };

        $scope.addPartners = function() {
        	var j = 0;
        	for (var k in $scope.partners) {
        		if ($scope.partners.hasOwnProperty(k)) {
        			++j;
        		}
        	}
        	var i = $scope.countPartners;
                //alert(count);
                $scope.partners[j] = {
                	count: j,
                	partnerId: 0,
                	hour_end:  new Date(),
                	hour_start:  new Date(),
                	model: ''
                };
                $scope.countPartners++;
        };
        
        $scope.removePartners = function(i) {
        	delete $scope.partners[i];
        };

		Appoint.find().$promise.then(function(results) {
			console.log(results);
			$scope.agendas = results;
		});

		Modelslider.find().$promise.then(function(results){
            results.forEach(function (models,index) {
                //console.log(files);
                $scope.models.push({
                	"value": models.idmodel,
                	"name": models.nameSlider
                });  

            });
		});

		$scope.save = function() {
			console.log($scope);
			console.log(
				$scope.partners[0].hour_start.getHours()+ 
				':'+$scope.partners[0].hour_start.getMinutes()+
				':'+$scope.partners[0].hour_start.getSeconds() );
 
			var data = {
				"idappoint": 0,
				"name": $scope.name,
				"patternModel" : $scope.model_pattern
			}

			Appoint.create(data, function(retorno) {
				console.log(retorno);
                 for (var k in $scope.partners) {
                 	
                 	$scope.hs = $scope.partners[k].hour_start.getHours()+ 
                 	':'+$scope.partners[k].hour_start.getMinutes()+
                 	':'+$scope.partners[k].hour_start.getSeconds();

                 	$scope.hf = $scope.partners[k].hour_end.getHours()+ 
                 	':'+$scope.partners[k].hour_end.getMinutes()+
                 	':'+$scope.partners[k].hour_end.getSeconds();
                 	
                 	data = {
                 		"idtimeAppoint": 0,
                 		"timeStart": $scope.hs,
                 		"timeEnd": $scope.hf,
                 		"appointIdappoint": retorno.idappoint,
                 		"modelsliderIdmodel": $scope.partners[k].model
                 	}
                 	 TimeAppoint.create(data, function(retorno) {
                 		console.log('ret ' + JSON.stringify(retorno));
                 		$location.path('/new_appoint');
                 	});
                 }
			});
		};

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};	


}])
.controller('EditAgendaController', ['$scope', 'Modelslider', 'Files', 
	'$location', 'Appoint','TimeAppoint',
	function($scope, Modelslider, Files, $location,Appoint,TimeAppoint) {

    
		$scope.partners = {};
		$scope.countPartners = 0;
		$scope.partners[0] = {
			count: 0,
			partnerId: 0,
			hour_end:  new Date(),
			hour_start:  new Date(),
			model: ''
		};

		$scope.addPartners = function() {
			var j = 0;
			for (var k in $scope.partners) {
				if ($scope.partners.hasOwnProperty(k)) {
					++j;
				}
			}
			var i = $scope.countPartners;
                //alert(count);
                $scope.partners[j] = {
                	count: j,
                	partnerId: 0,
                	hour_end:  new Date(),
                	hour_start:  new Date(),
                	model: ''
                };
                $scope.countPartners++;
        };

        $scope.removePartners = function(i) {
            delete $scope.partners[i];
        };


}]);        	