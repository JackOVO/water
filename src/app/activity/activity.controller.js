/**
 * 活动控制器
 */

export class ActivityController {
  constructor($scope, $state, activityService) {
    'ngInject';
    this.activityService = activityService;

    this.sp = $scope;
    this.paging = null;
    this.title = '推广列表';
    this.columns = activityService.columns();

    // 按钮配置
    this.btns = [{
      name: '新增活动', icon: 'fa-plus', click: this.add
    }];

    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '用户', action: ({activityCode:c}) => `vm.goUser('${c}')`},
        {text: '改', action: ({activityCode:c}) => `vm.edit('${c}')`},
        {text: '删', clas: 'danger',
          action: ({activityCode:c, activityName:n}) => `vm.del('${c}', '${n}')`
        }]
    };

    // 分页监听
    $scope.$on('activitySearch', (e, paging) => {
      this.paging = paging;
    });

    // 挑战用户
    this.goUser = (i) => {
      $state.go('home.child', {pAim: 'activity', aim: 'stats', id: i});
    };
  }

  add(vm) {
    vm.activityService.openEditPage(vm.sp);
  }

  edit(code) {
    this.activityService.openEditPage(this.sp, code);
  }

  del(code, name) {
    this.activityService.del(code, name);
  }
}