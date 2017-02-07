angular
  .module('app', [
    'ui.router',
    'lbServices',
    'ngResource',
    'ngFileUpload',
    'ngCookies',
    'ngIdle',
    'angularUtils.directives.dirPagination'
  ]).config(['$stateProvider', '$urlRouterProvider', 'IdleProvider', 
  'KeepaliveProvider', function($stateProvider,
      $urlRouterProvider, IdleProvider, KeepaliveProvider) {
    
    IdleProvider.idle(1*60); // 10 minutes idle
    IdleProvider.timeout(30); // after 30 seconds idle, time the user out
    KeepaliveProvider.interval(1*60)
    
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
        url: '/error',
        templateUrl: '../view/slide/erro.html',
        controller: ''
      })
      .state('edit', {
         url : '/edit/:id',
         templateUrl : '../view/slide/editar.html',
         controller : 'ModelSliderEditController'
      })
  }])
  .run(function ($rootScope, $location , $cookieStore) {
    var rotasBloqueadasUsuariosNaoLogados = ['/new', '/livros'];
    var rotasBloqueadasUsuariosComuns = ['/usuarios'];
    $rootScope.$on('$locationChangeStart', function () {
        
        $rootScope.login = $cookieStore.get('user');
        //if($rootScope.usuarioLogado == null && rotasBloqueadasUsuariosNaoLogados.indexOf($location.path()) != -1){
        if($cookieStore.get('user') == null && rotasBloqueadasUsuariosNaoLogados.indexOf($location.path()) != -1) { 
            $location.path('/error');
        }else
        if($cookieStore.get('user') == null != null &&
            rotasBloqueadasUsuariosComuns.indexOf($location.path()) != -1 &&
            $rootScope.usuarioLogado.admin == false){
            $location.path('/error')
        }
    });
});    