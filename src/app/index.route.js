/**
 * 路由配置
 */

export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'mainVM'
    });

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/admin/login.html',
      controller: 'LoginController',
      controllerAs: 'loginVM'
    });

  $urlRouterProvider.otherwise('/');
}
