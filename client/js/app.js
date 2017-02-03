angular
  .module('app', [
    'ui.router',
    'lbServices',
    'ngResource',
    'ngFileUpload'
  ]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '../view/slide/home.html',
        controller: 'ModelSliderController'
      })
      .state('view', {
        url: '/view',
        templateUrl: '../view/slide/index.html',
        controller: 'SliderController'
      })
      .state('new', {
        url: '/new',
        templateUrl: '../view/slide/novo.html',
        controller: 'ModelSliderController'
      })
      .state('slide', {
        url: '/slide',
        templateUrl: '../view/slide/slide.html',
        controller: 'SliderController'
      })
      .state('login', {
        url: '/login',
        templateUrl: '../view/slide/login.html',
        controller: 'loginController'
      })
      .state('acessoNegado', {
        url: '/acessoNegado',
        templateUrl: '../view/slide/erro.html',
        controller: 'SliderController'
      })
  }])
  .run(function ($rootScope, $location) {
    var rotasBloqueadasUsuariosNaoLogados = ['/new', '/livros'];
    var rotasBloqueadasUsuariosComuns = ['/usuarios'];
    $rootScope.$on('$locationChangeStart', function () {
       
        if($rootScope.usuarioLogado == null && rotasBloqueadasUsuariosNaoLogados.indexOf($location.path()) != -1){
            $location.path('/acessoNegado');
        }else
        if($rootScope.usuarioLogado != null &&
            rotasBloqueadasUsuariosComuns.indexOf($location.path()) != -1 &&
            $rootScope.usuarioLogado.admin == false){
            $location.path('/acessoNegado')
        }
    });
});    