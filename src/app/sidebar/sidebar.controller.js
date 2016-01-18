/**
 * 侧边栏控制器定义
 */

export class SidebarController {
  constructor($scope, menuService) {
    'ngInject';

    // 注册回调
    // menuService.register('all', (menuData) => {
    //   this.menuData = menuData;
    // });

    // 请求数据
    menuService.all();

    // 点击发射通知
    this.menuClick = function(node, pary) {
      $scope.$emit('sideBarMenuOnClick', node.key, pary);
    };
  }
}