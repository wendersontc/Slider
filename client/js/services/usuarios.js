angular
.module('app')
.service('usuariosService', function ($rootScope, $location, $cookieStore) {

    this.validaLogin = function(user){
        var usuarios = [{username:'Robson', password:'123', admin:false},
            {username:'admin', password:'123', admin:true},
            {username:'Admin', password:'123', admin:true},
            {username: 'Wenderson', password: '123', admin: false}
        ]

        angular.forEach(usuarios, function(value, index){
            if(value.username == user.username &&
                value.password == user.password){
                delete value.password;
                $rootScope.usuarioLogado = value;
                $cookieStore.put('user', value);
                $location.path('/home')
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