angular
    .module('app')
    .controller('ModelSliderController', ['$scope', 'Modelslider', 'Files', 
        '$location', 'Upload', '$window', '$state' , '$cookieStore',
        function($scope, Modelslider, Files, $location, Upload, $window,$state,$cookieStore) {
            $scope.state = $state;
            $scope.file = '';
            $scope.modelo = {};
            $scope.form = {};
            $scope.insert = {};
            $scope.filesTypes = [{
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
            $scope.partners[0] = {
                count: 0,
                partnerId: 0,
                type: '',
                url: '',
                arquivo: '',
                tempo: ''
            };
            
            $scope.logout = function(){
               $cookieStore.put('user', null);
               $location.path('/login');
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
                    type: '',
                    url: '',
                    arquivo: '',
                    tempo: '',
                    partnerId: 0
                };
                $scope.countPartners++;
            };

            $scope.removePartners = function(i) {
                delete $scope.partners[i];
                //$('[data-part-row="' + i + '"').remove();
            };

            $scope.selectInput = function(mo) {
                //alert(mo.name);
                if (mo.name > 0) {
                    localStorage.setItem('idmodel', mo.name);
                    window.location.href = "#/slide";
                }
            };

            $scope.save = function(form) {
                //alert($scope.form.modelo);
                var data = {
                    "idmodel": 0,
                    "nameSlider": $scope.form.name
                }
                Modelslider.create(data, function(retorno) {
                    //console.log(retorno);
                    $scope.insert = retorno;

                    var dataFiles = [];

                    function imgFor(index, data) {


                        if (data[index].arquivo) {
                            //$scope.file = 'files/' + data[index].arquivo.name;
                            Upload.upload({
                                url: 'http://localhost:4000/upload',
                                data: {
                                    file: data[index].arquivo
                                }
                            }).then(function(resp) {
                                
                                console.log(resp);
                                if (resp.data.error_code === 0) {

                                    console.log(resp);
                                    dataFiles.push({
                                       "idfiles": 0,
                                        "type": data[index].type,
                                        "content": /*$scope.file*/ 'files/'+resp.data.arquivo.filename,
                                        "url": data[index].url,
                                       "tempo": data[index].tempo,
                                        "modelsliderIdmodel": $scope.insert.idmodel,
                                        "url": ""
                                    });   


                                    //$window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');



                                    if (Object.keys(data).length > 0 && index < (Object.keys(data).length - 1)) {

                                        index = index + 1;
                                        imgFor(index, data);

                                    } else {
                                        if (dataFiles.length > 0) {
                                            saveFile(0, dataFiles);                                            

                                        }

                                    }


                                } else {
                                    $window.alert('Ocorreu um erro inesperado!');
                                }
                            }, function(resp) {
                                console.log('Error status: ' + resp.status);
                                //$window.alert('Error status: ' + resp.status);
                            }, function(evt) {
                                console.log(evt);
                            });
                        }else{

                            dataFiles.push({
                                "idfiles": 0,
                                "type": data[index].type,
                                "content": '',
                                "url": data[index].url,
                                "tempo": data[index].tempo,
                                "modelsliderIdmodel": $scope.insert.idmodel
                            });

                            saveFile(0, dataFiles);
                        }

                    }


                    imgFor(0, $scope.up.partners);




                    function saveFile(index, data) {

                        console.log(data.length)
                        Files.create(data[index], function(obj) {

                            console.log('ret ' + JSON.stringify(obj));
                            if (data.length > 0 && index < data.length - 1) {
                                index = index + 1;
                                saveFile(index, data);
                            }else{
                               location.reload(); 
                            }

                        });



                    }


                    /* for (var k in $scope.up.partners) {

                         if ($scope.up.partners[k].arquivo) {
                             $scope.file = 'files/' + $scope.up.partners[k].arquivo.name;
                             Upload.upload({
                                 url: 'http://localhost:4000/upload',
                                 data: {
                                     file: $scope.up.partners[k].arquivo
                                 }
                             }).then(function(resp) {
                                 console.log(resp);
                                 if (resp.data.error_code === 0) {



                                     //$window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');



                                 } else {
                                     $window.alert('Ocorreu um erro inesperado!');
                                 }
                             }, function(resp) {
                                 console.log('Error status: ' + resp.status);
                                 //$window.alert('Error status: ' + resp.status);
                             }, function(evt) {
                                 console.log(evt);
                             });
                         }
                         console.log($scope);
                         data = {
                             "idfiles": 0,
                             "type": $scope.up.partners[k].type,
                             "content": $scope.file,
                             "url": $scope.up.partners[k].url,
                             "tempo": $scope.up.partners[k].tempo,
                             "modelsliderIdmodel": $scope.insert.idmodel
                         }
                         Files.create(data, function(retorno) {
                             console.log('ret ' + JSON.stringify(retorno));
                         });
                         $scope.file = '';
                     }*/
                    //  location.reload();


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
                //console.log(results);
                $scope.modelos = results;
            });

        }
    ])
.controller('ModelSliderEditController', ['$scope', 'Modelslider', 'Files', 
        '$location', 'Upload', '$state' ,
        function($scope, Modelslider, Files, $location, Upload,$state) {
        
        $scope.filesTypes = [{
            value: 1,
            name: "Imagem"
        }, {
            value: 2,
            name: "Url"
        }]; 

        $scope.partners = {};
        $scope.countPartners = 0;

        $scope.slides = Modelslider.findById({ "id" : $state.params.id }).$promise.then(function(results) {            
            console.log(results);
            $scope.modelo = results;
            $scope.name = $scope.modelo.nameSlider;
        });

        $scope.files = Files.find( {"filter": {"where": {"modelsliderIdmodel": $state.params.id}}}).$promise.then(function(results) {
            
            results.forEach(function (files,index) {
                console.log(files);
                console.log(index);
                $scope.partners[index] = {
                    count: index,
                    partnerId: files.idfiles,
                    type: files.type,
                    url: files.url,
                    arquivo: files.content,
                    tempo: files.tempo
                };   

            });
        });

        $scope.saveEdit = function() {
            var data = {
                "idmodel": $state.params.id,
                "nameSlider": $scope.name
            }
            Modelslider.upsert(data, function(retorno) {
                /*for (var k in $scope.partners) {
                   console.log($scope.partners[k]);  
                   console.log($scope.partners[k].partnerId);   
               }*/
               var dataFiles = [];

               function imgFor(index, data) {
                console.log(data[index]);
                if (data[index].arquivo && data[index].partnerId == 0) {
                            Upload.upload({
                                url: 'http://localhost:4000/upload',
                                data: {
                                    file: data[index].arquivo
                                }
                            }).then(function(resp) {

                                console.log(resp);
                                if (resp.data.error_code === 0) {

                                    console.log(resp);
                                    dataFiles.push({
                                       "idfiles": 0,
                                       "type": data[index].type,
                                       "content": /*$scope.file*/ 'files/'+resp.data.arquivo.filename,
                                       "url": data[index].url,
                                       "tempo": data[index].tempo,
                                       "modelsliderIdmodel": $state.params.id,
                                       "url": ""
                                   });   
                                    
                                    if (Object.keys(data).length > 0 && index < (Object.keys(data).length - 1)) {

                                        index = index + 1;
                                        imgFor(index, data);

                                    } else {
                                        if (dataFiles.length > 0) {
                                            saveFile(0, dataFiles);
                                        }

                                    }

                                } else {
                                    $window.alert('Ocorreu um erro inesperado!');
                                }
                            }, function(resp) {
                                console.log('Error status: ' + resp.status);
                            }, function(evt) {
                                console.log(evt);
                            });
                        }else if(data[index].partnerId == 0){
                            console.log('aqui == 0');
                            dataFiles.push({
                                "idfiles": 0,
                                "type": data[index].type,
                                "content": '',
                                "url": data[index].url,
                                "tempo": data[index].tempo,
                                "modelsliderIdmodel": $state.params.id
                            });

                            saveFile(0, dataFiles);
                        }else{
                             console.log('aqui aqui');
                             index = index + 1;
                             imgFor(index, $scope.partners);
                        }

                    }
                    
                    imgFor(0, $scope.partners);

                    function saveFile(index, data) {

                        console.log(data.length)
                        Files.create(data[index], function(obj) {

                            console.log('ret ' + JSON.stringify(obj));
                            if (data.length > 0 && index < data.length - 1) {
                                index = index + 1;
                                saveFile(index, data);
                            }else{
                             location.reload(); 
                         }

                     });

                    }

                });
        }
        
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
                    type: '',
                    url: '',
                    arquivo: '',
                    tempo: '',
                    partnerId: 0
                };
                $scope.countPartners++;
        };

        $scope.removePartners = function(i){
            Files.deleteById({id : $scope.partners[i].partnerId},function(){
                delete $scope.partners[i];
            });
            /*$http.post('/deleteAll', {
                'whereFilter': {partnerId: scope.partners[i].partnerId},
                'entidade': 'CompanyPartner'
            }).success(function (res) {
                if (res.count === 1) {
                    Partner.deleteById(
                        {id: scope.partners[i].partnerId},
                        function () {
                            delete scope.partners[i];
                            $('[data-part-row="' + i + '"').remove();
                            Message.DELETETRUE();
                        }, function () {
                            Message.DELETEERRO();
                        })
                }
            });*/ 
        }

}]);            
