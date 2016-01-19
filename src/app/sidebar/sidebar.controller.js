/**
 * 侧边栏控制器定义
 */

export class SidebarController {
  constructor($scope, menuService) {
    'ngInject';

    // 回调监听
    $scope.$on('menuAll', (e, menuData) => {
      this.menuData = menuData;
    });

    // 请求数据-> 迁移到管理模块初始化中
    menuService.all();

    // 点击发射通知
    this.menuClick = function(node, pary) {
      $scope.$emit('sideBarMenuOnClick', node.key, pary);
    };
  }
}