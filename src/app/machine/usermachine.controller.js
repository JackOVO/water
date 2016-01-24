/**
 * 用户机器树控制器
 */

export class UserMachineController {
  constructor($scope) {
    'ngInject';
    let _this = this;

    // 监听机器切换数据权限
    $scope.$on('machineToggleTree', (e, children) => {
      this.children = children;
    });
  }
}