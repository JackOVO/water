/**
 * 活动控制器
 */

export class ActivityController {
  constructor($scope, activityService) {
    'ngInject';
    this.activityService = activityService;

    this.sp = $scope;
    this.paging = null;
    this.columns = activityService.columns();

    // 按钮配置
    this.btns = [{
      name: '新增活动', icon: 'fa-plus', click: this.add
    }];

    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '用户', action: ({code:c}) => `vm.info('${c}')`},
        {text: '改', action: ({code:c}) => `vm.edit('${c}')`},
        {text: '删', clas: 'danger',
          action: ({code:c, name:n}) => `vm.del('${c}', '${n}')`
        }]
    };

    // 分页监听
    $scope.$on('activitySearch', (e, paging) => {
      this.paging = paging;
    });
  }

  add(vm) {
    vm.activityService.openEditPage(vm.sp);
  }
}