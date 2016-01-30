/**
 * 广告资源控制器
 */

export class AdPlanController {
  constructor($scope, $state, adPlanService) {
    'ngInject';

    let _this = this;
    this.adPlanService = adPlanService;

    this.title = '排期列表';
    this.paging = null;
    this.columns = adPlanService.columns();
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
      name: '新增排期', icon: 'fa-plus', click: this.add
    }];

    $scope.$on('adplanSearch', (e, paging) => {
      _this.paging = paging;
    });

    // 翻页请求
    this.turn = (params) => {
      let page = params.page;
      adPlanService.search(page).then(() => {
        $state.go('.', {page: page}, {notify: false});
      });
    };
  }
}