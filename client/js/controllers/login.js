angular
.module('app')
.controller('loginController', function ($scope, usuariosService, Idle, Keepalive) {

    $scope.logar = function(user){
        usuariosService.validaLogin(user);
    }

    $scope.$on('IdleStart', function() {
       console.log('start'); 	
    });
    
    $scope.$on('IdleEnd', function() {
    	console.log('end');
    });

    $scope.$on('IdleTimeout', function() {
    	console.log('timeout');
    });



})
.config(function(IdleProvider, KeepaliveProvider) {
	IdleProvider.idle(5);
	IdleProvider.timeout(5);
	KeepaliveProvider.interval(10);
});