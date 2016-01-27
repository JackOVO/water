/**
 * 点位控制器
 */

export class StoreController {
  constructor($scope, $state, storeService) {
    'ngInject';
    this.storeService = storeService;

    this.paging = null;
    this.columns = storeService.dataTableColumns;

    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '改', action: ({code:c}) => `vm.edit('${c}')`},
        {text: '删', clas: 'danger',
          action: ({code:c, name:n}) => `vm.del('${c}', '${n}')`
        }]
    };

    // 按钮配置
    this.btns = [{
      name: '新增点位', icon: 'fa-plus', click: this.add
    }];

    // 分页监听
    $scope.$on('storeSearch', (e, paging) => {
      this.paging = paging;
    });

    // 翻页请求
    this.turn = (params) => {
      let page = params.page;
      storeService.search(page).then(() => {
        $state.go('.', {page: page}, {notify: false});
      });
    };
  }

  add(vm) {
    vm.storeService.openEditPage();
  }

  edit(code) {
    this.storeService.openEditPage(code);
  }

  del(code, name) {
    this.storeService.del(code, name);
  }
}