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
    .state('home.chart', {
          url: 'chart/:aim',
          resolve: { stateParams: ($stateParams) => $stateParams },
          templateUrl: () => {
            return 'app/template/chart.html';
          },
          controllerProvider: (stateParams) => {
            let aim = stateParams.aim || '',
                controllerName = null,
                sary = [...aim];

            sary[0] = sary[0].charAt(0).toUpperCase();
            controllerName = sary.join('') + 'Chart' + 'Controller';
            return controllerName;
          },
          controllerAs: 'cvm'
    })
    .state('home.single', {
      url: ':aim',
      resolve: { stateParams: ($stateParams) => $stateParams },
      templateUrl: (stateParams) => {

        // XXX 活动推广机器列表选中
        if (stateParams.aim === 'activity') {
          // 广告跳转类页面
          return 'app/template/adplan.html';
        }
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
    })
    .state('home.child', {
      url: ':pAim/:aim/:id',
      resolve: { stateParams: ($stateParams) => $stateParams },
      templateUrl: (stateParams) => {
        // XXX 临时更改?
        if ((stateParams.pAim === 'machine' && stateParams.aim === 'adplan') ||
            (stateParams.pAim === 'adhistory' && stateParams.aim === 'details')) {

          // 广告跳转类页面
          return 'app/template/adplan.html';
        }
        return 'app/template/child-datatable.html';
      },
      controllerProvider: createControllerName,
      controllerAs: 'vm'
    });

  $urlRouterProvider.otherwise('/');
}

// 根据参数创建控制器
function createControllerName(stateParams) {
  let aim = stateParams.aim,
      controllerName = null,
      paim = stateParams.pAim,
      sary = [...stateParams.aim];

  switch(aim) {
    case 'baseInfo':
      controllerName = 'AdminController';
      break;
    case 'details':

      // 广告历史详情特殊处理
      if (paim === 'adhistory') {
        controllerName = 'AdhistoryDetailsController';
      } else {
        controllerName = 'DetailsController';
      }

      break;
    default:
      sary[0] = sary[0].charAt(0).toUpperCase();
      controllerName = sary.join('') + 'Controller';
      break;
  }

  return controllerName;
}
