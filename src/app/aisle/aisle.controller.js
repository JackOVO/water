/**
 * 货道控制器
 */

export class AisleController {
  constructor($scope, $state, aisleService) {
    'ngInject';
    this.title = '货道列表';
    this.aisleService = aisleService;

    this.paging = null;
    this.columns = aisleService.columns();
    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '改', action: ({id:i}) => `vm.edit('${i}')`},
        {text: '删', clas: 'danger',
          action: ({id:i, aisleCode:a}) => `vm.del('${i}', '${a}')`
        }]
    };

    // 按钮配置
    this.btns = [{name: '新增货道', icon: 'fa-plus', click: this.add}];

    // 翻页请求
    this.turn = (params) => {
      let page = params.page;
      aisleService.search(page).then(() => {
        $state.go('.', {page: page}, {notify: false});
      });
    };

    // 监听货道
    $scope.$on('aisleSearch', (e, paging) => {
      this.paging = paging;
    });
  }

  // 新增货道
  add(vm) {
    vm.aisleService.openEditPage();
  }

  // 删除货道
  del(id, acode) {
    this.aisleService.del(id, acode);
  }

  // 编辑货道
  edit(id) {
    this.aisleService.openEditPage(id);
  }
}

// aisleCode:123123
// amount:123123123
// createDate:1453806027000
// id:150
// machineCode:20151222162823787
// machineName:苏州街测试机1
// modifyDate:1453806027000
// picUrl:/upload/image//201512/68fe06af-4183-48b2-9ddb-dd04c8f4fa9f_可口可乐1.png
// price:2.5
// productCode:20151222164535066
// productName:可乐