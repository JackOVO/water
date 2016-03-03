/**
 * 机器控制器
 */

export class MachineController {
  constructor($scope, $state, machineService) {
    'ngInject';
    this.$state = $state;
    this.machineService = machineService;

    this.paging = null;
    this.title = '机器列表';
    this.columns = machineService.columns();

    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '详', action: ({machineCode:c}) => `vm.info('${c}')`},
        {text: '改', action: ({machineCode:c}) => `vm.edit('${c}')`},
        {text: '删', clas: 'danger',
          action: ({machineCode:c, name:n}) => `vm.del('${c}', '${n}')`
        }]
    };

    // 按钮配置
    this.btns = [{
      name: '正常运营', icon: 'fa-male', click: this.on
    }, {
      name: '平台维护', icon: 'fa-hotel', click: this.off
    }, {
      name: '新增机器', icon: 'fa-plus', click: this.add
    }];
    // platformMaintain

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

  on(vm) {
    vm.machineService.tooglePlatformStatus(true);
  }

  off(vm) {
    vm.machineService.tooglePlatformStatus(false);
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