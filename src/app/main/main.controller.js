/**
 * 主页控制器
 */

export class MainController {
  constructor($scope, $state) {
    'ngInject';
    let _this = this;
    this.$state = $state;

    // 侧边栏菜单点击通知
    $scope.$on('sideBarMenuOnClick', (e, key, pkey) => {
      _this.sideBarMenuClickAssociate(key, pkey);
    });
  }

  // 菜单点击关联处理
  sideBarMenuClickAssociate(key, pkey) {
    let keys = key.split(':');
    key = keys[keys.length - 1];

console.log('menuKey----->', key);

    // 点击项key判断
    let params = {};
    switch(key) {
      case 'user':
      case 'baseInfo':
        params = {aim: key, t: 'Test'};
        this.$state.go('home.single', params);
      break;
        params = {aim: key, page: 1}
        this.$state.go('home.list', params);
      break;
    }
  }
}