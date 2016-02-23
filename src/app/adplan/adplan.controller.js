/**
 * 广告资源控制器
 */

export class AdPlanController {
  constructor($scope, $state, adPlanService) {
    'ngInject';

    this.$state = $state;
    this.adPlanService = adPlanService;

    this.title = '排期计划';
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

    $scope.$on('adplanSearch', (e, paging) => {
      this.paging = paging;
    });

    $scope.$on('adplanToggleMachines', (e, data) => {
      this.children = data;
    });

    // 翻页请求
    this.turn = (params) => {
      let page = params.page;
      adPlanService.search(page);
    };

    // 表格点击相应, 通知权限更新权限树
    this.onTableClick = ({adUserPlanCode}) => {
      adPlanService.getMachines(adUserPlanCode);
    }
  }

  add() {
    this.adPlanService.openEditPage();
  }

  goHistory() {
    this.$state.go('home.list', {aim: 'adhistory'});
  }

  del(code, name) {
    this.adPlanService.del(code, name);
  }

  edit(code) {
    this.adPlanService.openEditPage(code);
  }
}