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
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/admin/login.html',
      controller: 'LoginController',
      controllerAs: 'loginVM'
    })
    .state('home.single', {
      url: ':aim',
      resolve: { stateParams: ($stateParams) => $stateParams },
      templateUrl: (stateParams) => {
        return `app/template/${stateParams.aim}.html`;
      },
      controllerProvider: createControllerName,
      controllerAs: 'vm'
    })
    .state('home.list', {
      url: ':aim/:page',
      resolve: { stateParams: ($stateParams) => $stateParams },
      templateUrl: 'app/template/datatable.html',
      controllerProvider: createControllerName,
      controllerAs: 'vm'
    });

  $urlRouterProvider.otherwise('/');
}

// 根据参数创建控制器
function createControllerName(stateParams) {
  let aim = stateParams.aim,
      controllerName = null,
      sary = [...stateParams.aim];

  switch(aim) {
    case 'baseInfo':
      controllerName = 'AdminController';
      break;
    default:
      sary[0] = sary[0].charAt(0).toUpperCase();
      controllerName = sary.join('') + 'Controller';
      break;
  }

  return controllerName;
}
