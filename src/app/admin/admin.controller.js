/**
 * 管理员控制器
 */

export class AdminController {
  constructor($scope, adminService) {
    'ngInject';
    this.adminInfo = null;

    // 基本信息监听
    $scope.$on('adminInfo', (e, adminInfo) => {
      this.adminInfo = adminInfo;
    });
  }
}