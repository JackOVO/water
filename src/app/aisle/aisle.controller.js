/**
 * 货道控制器
 */

export class AisleController {
  constructor($scope) {
    'ngInject';
    this.title = '货道列表';
    this.aisleArray = [];

    // 监听货道
    $scope.$on('aisleAll', (e, array) => {
      this.aisleArray = array;
console.info('controller', array);
    });
  }
}