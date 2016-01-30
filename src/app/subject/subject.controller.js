/**
 * 公司控制器
 */

export class SubjectController {
  constructor($scope, $state, subjectService) {
    'ngInject';
    this.subjectService = subjectService;

    this.paging = null;
    this.title = '公司列表';
    this.columns = subjectService.columns();

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
      name: '新增公司', icon: 'fa-plus', click: this.add
    }];

    // 分页监听
    $scope.$on('subjectSearch', (e, paging) => {
      this.paging = paging;
    });

    // 翻页请求
    this.turn = (params) => {
      let page = params.page;
      subjectService.search(page).then(() => {
        $state.go('.', {page: page}, {notify: false});
      });
    };
  }

  add(vm) {
    vm.subjectService.openEditPage();
  }

  edit(code) {
    this.subjectService.openEditPage(code);
  }

  del(code, name) {
    this.subjectService.del(code, name);
  }
}