angular
.module('app')
.controller('loginController', function ($scope, usuariosService) {

    $scope.logar = function(user){
        usuariosService.validaLogin(user);
    }
});