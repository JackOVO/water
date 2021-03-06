/**
 * 广告资源控制器
 */

export class AdresourceController {
  constructor($scope, $state, adresourceService) {
    'ngInject';

    let _this = this;
    this.adresourceService = adresourceService;

    this.title = '资源列表';
    this.paging = null;
    this.columns = adresourceService.columns();
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
      name: '新增资源', icon: 'fa-plus', click: this.add
    }];

    $scope.$on('adresourceSearch', (e, paging) => {
      _this.paging = paging;
    });

    // 翻页请求
    this.turn = (params) => {
      let page = params.page;
      adresourceService.search(page).then(() => {
        $state.go('.', {page: page}, {notify: false});
      });
    };
  }

  add(vm) {
    vm.adresourceService.openEditPage();
  }

  edit(code) {
    this.adresourceService.openEditPage(code);
  }

  del(code, name) {
    this.adresourceService.del(code, name);
  }
}