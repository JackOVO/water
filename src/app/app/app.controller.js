/**
 * 活动用户统计
 */

export class AppController {
  constructor($scope, appService) {
    'ngInject';

    this.title = 'App推广列表';
    this.scope = $scope;
    this.appService = appService;

    this.paging = null;
    this.isPaging = true;
    this.columns = appService.columns(); // 数据列定义

    // 按钮配置
    this.btns = [{
      name: '新建APP', icon: 'fa-plus', click: this.add
    }];

    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '改', action: ({activityCode:c}) => `vm.edit('${c}')`},
        {text: '删', clas: 'danger',
          action: ({activityCode:c, activityName:l}) => `vm.del('${c}', '${l}')`
        }]
    };

    // 回调监听
    $scope.$on('appSearch', (e, paging) => {
      this.paging = paging;
    });

    // 分页
    this.turn = (params) => {
      let page = params.page;
      appService.search(page);
    };
  }

  add(vm) {
    vm.appService.openEditPage(vm.scope);
  }

  edit(code) {
    this.appService.openEditPage(this.scope, code);
  }

  del(code, name) {
    this.appService.del(code, name);
  }
}