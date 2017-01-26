angular
  .module('app', [
    'ui.router',
    'lbServices',
    'ngResource'
  ]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    
    $stateProvider
      .state('index', {
        url: '/index.html',
        templateUrl: 'index.html',
        controller: 'ModelSliderController'
      })
      .state('slide', {
        url: '/view/slide/index.html',
        templateUrl: '/view/slide/index.html',
        controller: 'SliderController'
      })
  }]);    