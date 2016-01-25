/**
 * 运营控制器
 */

export class OperateController {
  constructor($scope, $state, operateService) {
    'ngInject';
    let _this = this;
    this.title = '机器列表';

    this.paging = null;
    this.columns = operateService.dataTableColumns; // 数据列定义
    this.operateService = operateService;

    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '货道', action: ({userCode:u}) => `vm.edit('${u}')`},
        {text: '日志', action: ({userCode:u, loginName:l}) => `vm.del('${u}', '${l}')`}]
    };

    // 搜索回调监听
    $scope.$on('operateSearch', (e, paging) => {
      this.paging = paging;
    });

    // 分页
    this.turn = (params) => {
      let page = params.page;
      this.operateService.search(page).then(() => {
        $state.go('.', {page: page}, {notify: false});
      });
    };

console.info('---');
  }
}