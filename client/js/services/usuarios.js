angular
.module('app')
.service('usuariosService', function ($rootScope, $location) {

    this.validaLogin = function(user){
        var usuarios = [{username:'Robson', password:'123', admin:true},
            {username:'Juliano', password:'123', admin:false},
            {username:'Bruno', password:'123', admin:false}
        ]

        angular.forEach(usuarios, function(value, index){
            if(value.username == user.username &&
                value.password == user.password){
                delete value.password;
                $rootScope.usuarioLogado = value;
                $location.path('/new')
                console.log('logou');
            }
        })
    }

    this.logout = function(){
        $rootScope.usuarioLogado = null;
        $location.path('/home')
    }
    this.getUsers = function(){
      return [{nome:'Robson', admin:true},
          {nome:'Juliano', admin:false},
          {nome:'Bruno', admin:false}]
    }

});