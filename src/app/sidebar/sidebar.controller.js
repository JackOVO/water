/**
 * 侧边栏控制器定义
 */

export class SidebarController {
  constructor($scope, menuService) {
    'ngInject';
    this.search = ''; // 菜单搜索值

    // 回调监听
    $scope.$on('menuGetSideMenuData', (e, menuData) => {
      this.menuData = menuData;
    });

    // 点击发射通知
    this.menuClick = function(node, pary) {
      $scope.$emit('sideBarMenuOnClick', node.key, pary);
    };

    // 请求数据-> 迁移到管理模块初始化中
    menuService.getSideMenuData();
  }
}