/**
 * 广告资源控制器
 */

export class AdPlanController {
  constructor($scope, $state, adPlanService) {
    'ngInject';

    this.$state = $state;
    this.adPlanService = adPlanService;

    this.title = '排期历史';
    this.paging = null;
    this.columns = adPlanService.columns();
    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '改', action: ({adUserPlanCode:c}) => `vm.edit('${c}')`},
        {text: '删', clas: 'danger',
          action: ({adUserPlanCode:c, resourceName:n}) => `vm.del('${c}', '${n}')`
        }]
    };

    // 按钮配置
    this.btns = [{name: '新增排期', icon: 'fa-plus', click: this.add},
     {name: '查看历史', icon: 'fa-search', click: this.goHistory}];

    $scope.$on('adplanSearch', (e, paging) => {
      this.paging = paging;
    });

    // 翻页请求
    this.turn = (params) => {
      let page = params.page;
      adPlanService.search(page).then(() => {
        $state.go('.', {page: page}, {notify: false});
      });
    };
  }

  add(vm) {
    vm.adPlanService.openEditPage();
  }

  goHistory(vm) {
    vm.$state.go('home.list', {aim: 'adhistory'});
  }

  del(code, name) {
    this.adPlanService.del(code, name);
  }

  edit(code) {
    this.adPlanService.openEditPage(code);
  }
}