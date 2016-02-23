/**
 * 主页控制器
 */

export class MainController {
  constructor($scope, $state, adminService, globalService) {
    'ngInject';

    let _this = this;
    this.$state = $state;
    this.globalService = globalService;

    $scope.admin = adminService.admin;
    $scope.signout = () => {
      adminService.signout();
    };

    // 登录监听
//     $scope.$watch('admin', (admin) => {
// console.info(admin);
//     });

    // 侧边栏菜单点击通知
    $scope.$on('sideBarMenuOnClick', (e, key, pkey) => {
      _this.sideBarMenuClickAssociate(key, pkey);
    });

    // 路由状态加载完成
    $scope.$on('$stateChangeSuccess', (e, state, params) => {
      let {aim, page} = params;

      if ($state.is('home.list')) {
        globalService.refreshListByAction(aim, page);
      } else if ($state.is('home.single')) {
        globalService.initPageDataByAction(aim);
      } else if ($state.is('home.child')) {
        let {aim, id} = params;
        globalService.refreshChildListByAction(aim, id);
      }
    });
  }

  // 菜单点击关联处理
  sideBarMenuClickAssociate(key, pkey) {
    // let keys = key.split(':');
    // key = keys[keys.length - 1];
console.info('menuKey----->', key);

    // 点击项key判断
    let params = {};
    switch(key) {
      case 'user':
      case 'role':
      case 'adplan':
      case 'adstats':
      case 'resource':
      case 'baseInfo':
      case 'statistics':
      case 'machinegroup':
        params = {aim: key, t: 'Test'};
        this.$state.go('home.single', params);
      break;
      case 'app':
      case 'store':
      case 'order':
      case 'operate':
      case 'machine':
      case 'product':
      case 'subject':
      case 'activity':
      case 'adhistory':
      case 'adresource':
        params = {aim: key, page: 1};
        this.$state.go('home.list', params);
      break;
        // params = {aim: key, page: 1}
        // this.$state.go('home.list', params);
        // break;
    }

    switch(pkey) {
      default: break;
    }
  }
}