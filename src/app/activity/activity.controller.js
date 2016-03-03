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
    this.children = null;
    this.columns = activityService.columns();

    // 按钮配置
    this.btns = [{
      name: '新增活动', icon: 'fa-plus', click: this.add
    }];

    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '用户', action: ({wechatOriginalId:i}) => `vm.goUser('${i}')`},
        {text: '改', action: ({activityCode:c}) => `vm.edit('${c}')`},
        {text: '删', clas: 'danger',
          action: ({activityCode:c, activityName:n}) => `vm.del('${c}', '${n}')`
        }]
    };

    // 分页监听
    $scope.$on('activitySearch', (e, paging) => {
      this.paging = paging;
    });

    // 机器列表
    $scope.$on('activityToggleMachines', (e, data) => {
      this.children = data;
    });

    // 翻页请求
    this.turn = (params) => {
      let page = params.page;
      activityService.search(page);
    };

    // 跳转用户
    this.goUser = (i) => {
      $state.go('home.child', {pAim: 'activity', aim: 'stats', id: i});
    };

        // 表格点击相应, 通知权限更新权限树
    this.onTableClick = ({activityCode}) => {
      activityService.getMachines(activityCode);
    }
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