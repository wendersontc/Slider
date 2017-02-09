angular
  .module('app', [
    'ui.router',
    'lbServices',
    'ngResource',
    'ngFileUpload',
    'ngCookies',
    'ngIdle',
    'angularUtils.directives.dirPagination',
    'sy.bootstrap.timepicker',
    'template/syTimepicker/timepicker.html',
    'template/syTimepicker/popup.html'
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
        templateUrl: '../view/erro.html',
        controller: ''
      })
      .state('edit', {
         url : '/edit/:id',
         templateUrl : '../view/slide/editar.html',
         controller : 'ModelSliderEditController'
      })
      .state('agendamentos', {
         url : '/new_appoint',
         templateUrl : '../view/agenda/novo.html',
         controller : 'NewAgendaController'
      })
      .state('editagendamentos', {
         url : '/edit_appoint/:id',
         templateUrl : '../view/agenda/editar.html',
         controller : 'EditAgendaController'
      })
  }])
  .run(function ($rootScope, $location , $cookieStore, $timeout) {
    var rotasBloqueadasUsuariosNaoLogados = ['/new', '/edit'];
    var rotasBloqueadasUsuariosComuns = ['/agendamento'];
    $rootScope.$on('$locationChangeStart', function () {
        
        if($location.path() == '/slide') {$rootScope.slide = true} else {$rootScope.slide = false}
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

    $rootScope.logout = function(){
       $cookieStore.put('user', null);
       $location.path('/login');
    };
    
    $rootScope.currentIndex=0;
    $rootScope.time = 0;
    
    $rootScope.next=function(){
      console.log(new Date());
      $rootScope.currentIndex++;
    };

    $rootScope.$watch('currentIndex',function(){

      $rootScope.time = (60 * 1000);

           timer=$timeout(function(){
            $rootScope.next();

          },$rootScope.time);

           console.log('apenas teste');
           $rootScope.$on('$destroy',function(){
            $timeout.cancel(timer);
          });
           //scope.images[scope.currentIndex].visible=true;
         });

});    