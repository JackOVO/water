/**
 * 机器控制器
 */

export class MachineController {
  constructor($scope, $state, machineService) {
    'ngInject';
    this.machineService = machineService;

    this.paging = null;
    this.title = '机器列表';
    this.columns = machineService.columns();

    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '详', action: ({code:c}) => `vm.info('${c}')`},
        {text: '改', action: ({code:c}) => `vm.edit('${c}')`},
        {text: '删', clas: 'danger',
          action: ({code:c, name:n}) => `vm.del('${c}', '${n}')`
        }]
    };

    // 按钮配置
    this.btns = [{
      name: '新增机器', icon: 'fa-plus', click: this.add
    }];

    // 分页监听
    $scope.$on('machineSearch', (e, paging) => {
      this.paging = paging;
    });

    // 翻页请求
    this.turn = (params) => {
      let page = params.page;
      machineService.search(page).then(() => {
        $state.go('.', {page: page}, {notify: false});
      });
    };
  }

  // 详情
  info(code) {
    this.machineService.openInfoPage(code);
  }

  edit(code) {
    this.machineService.openEditPage(code);
  }

  add(vm) {
    vm.machineService.openEditPage();
  }

  del(code, name) {
    this.machineService.del(code, name);
  } 
}