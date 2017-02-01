angular
  .module('app')
  .controller('ModelSliderController', ['$scope', 'Modelslider', 'Files', '$location', 'Upload', '$window',
      function($scope, Modelslider,Files,$location,Upload,$window) {
      $scope.file = '';
      $scope.modelo = {};
      $scope.form = {};
      $scope.insert = {};
      $scope.telTypes = [{
        value: 1,
        name: "Imagem"
      }, {
        value: 2,
        name: "Url"
      }];

      /*var data = {
        category: $scope.form.category,
        plan: $scope.plan,
        type: 'save'
      } */
      $scope.partners = {};
      $scope.countPartners = 0;
      $scope.partners[0] = {count: 0, partnerId: 0, type: '', url: '', arquivo : '' , tempo : ''};
            //add um socio
            $scope.addPartners = function () {
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
                  type: '',
                  url: '',
                  arquivo : '',
                  tempo : '',
                  partnerId: 0
                };
                $scope.countPartners++;
              };

       $scope.selectInput = function (mo) {
         //alert(mo.name);
         localStorage.setItem('idmodel',mo.name);
         window.location.href = "/view/slide/";
       };

       $scope.save = function(form) {
          //alert($scope.form.modelo);
          var data = {
            "idmodel": 0,
            "nameSlider": $scope.form.name
          }
          Modelslider.create(data, function (retorno) {
              console.log(retorno);
              $scope.insert = retorno;

              var data = {};
              for (var k in $scope.up.partners) {
                 
                if($scope.up.partners[k].arquivo){
                 Upload.upload({
                  url: 'http://localhost:8000/upload', 
                  data:{file:$scope.up.partners[k].arquivo} 
                }).then(function (resp) { 
                  console.log(resp);
                  if(resp.data.error_code === 0){ 
                    $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                  } else {
                    $window.alert('an error occured');
                  }
                }, function (resp) { 
                  console.log('Error status: ' + resp.status);
                  $window.alert('Error status: ' + resp.status);
                }, function (evt) { 
                  console.log(evt);
          //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            //vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
          });
              }
                 
                data = {
                 "idfiles": 0,
                 "type": $scope.up.partners[k].type,
                 "content": 'file/'+$scope.up.partners[k].arquivo.name,
                 "url": $scope.up.partners[k].url,
                 "tempo": $scope.up.partners[k].tempo,
                 "modelsliderIdmodel": $scope.insert.idmodel
               }
               Files.create(data, function (retorno) {
                 console.log('ret ' + JSON.stringify(retorno));
              });
             }
             //location.reload();
             console.log('afff' + JSON.stringify(data));

          });  
          
          /*var data = {
             "idfiles": 0,
             "type": 1,
             "content": "file/arquivoteste.png",
             "url": "",
             "tempo": 25,
             "modelsliderIdmodel": 5
          }
          Files.create(data, function (retorno) {
              console.log(retorno);
          });*/
          //console.log($scope);
          //console.log($scope.partners);
          
          /*Files.create(data, function (retorno) {
              console.log(retorno);
          });*/

        /*  if(($scope.form.name == null || $scope.form.name == '') ){
             //Message.CUSTOM($filter('translate')('form.validationMessage.remoteSeg'), "error");
          }else{
             //Message.CUSTOM($filter('translate')('form.validationMessage.remoteSeg'), "error");
             for (var k =0; k<=$scope.partners.length; k++) {
                console.log($scope.partners[i].type);
             }
          }*/
         
    };

      $scope.slides = Modelslider.find().$promise.then(function(results) {
      	  console.log(results);
          $scope.modelos = results;
      });

  }]);