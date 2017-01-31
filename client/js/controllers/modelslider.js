angular
  .module('app')
  .controller('ModelSliderController', ['$scope', 'Modelslider', 'Files', '$location',
      function($scope, Modelslider,Files,$location) {
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
              for (var k in $scope.partners) {
                console.log($scope.partners[k].type);
                data = {
                 "idfiles": 0,
                 "type": $scope.partners[k].type,
                 "content": $scope.partners[k].arquivo,
                 "url": $scope.partners[k].url,
                 "tempo": $scope.partners[k].tempo,
                 "modelsliderIdmodel": $scope.insert.idmodel
               }
               Files.create(data, function (retorno) {
                console.log('ret ' + JSON.stringify(retorno));
                 location.reload();
              });
             }
             
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

          if(($scope.form.name == null || $scope.form.name == '') ){
             //Message.CUSTOM($filter('translate')('form.validationMessage.remoteSeg'), "error");
          }else{
             //Message.CUSTOM($filter('translate')('form.validationMessage.remoteSeg'), "error");
             for (var k =0; k<=$scope.partners.length; k++) {
                console.log($scope.partners[i].type);
             }
          }

       };

      $scope.slides = Modelslider.find().$promise.then(function(results) {
      	  console.log(results);
          $scope.modelos = results;
      });

  }]);