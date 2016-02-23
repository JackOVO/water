/**
 * 运营控制器
 */

export class OperateController {
  constructor($scope, $state, operateService) {
    'ngInject';
    this.title = '机器列表';
    this.$state = $state;
    this.operateService = operateService;

    this.paging = null;
    this.columns = operateService.dataTableColumns; // 数据列定义
    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '排期', action: ({machineCode:c}) => `vm.goAdPlan('${c}')`},
        {text: '货道', action: ({machineCode:c}) => `vm.goAisle('${c}')`},
        {text: '日志', action: ({machineCode:c}) => `vm.goLog('${c}')`}]
    };

    // 搜索工具条配置
    this.tools = {
      inputs: [{
        type: 'search',
        clas: 'col-md-offset-8 col-md-4',
        reset: 'vm.reset',
        search: 'vm.search',
        valKey: 'searchValue',
        placeholder: '按机器编号查询'
      }]
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

    // 跳到货道列表
    this.goAisle = (code) => {
      $state.go('home.child', {pAim: 'operate', aim: 'aisle', id: code});
    };

    // 跳到日志列表
    this.goLog = (code) => {
      $state.go('home.child', {pAim: 'operate', aim: 'log', id: code});
    };

    // 清空
    this.reset = () => {
      $state.go('.', {page: 1}, {notify: false});
      operateService.search(1, undefined, {});
    };
  }

  // 跳转相关的排期
  goAdPlan(code) {
    this.$state.go('home.child', {pAim: 'machine', aim: 'adplan', id: code});
  }

  // 搜索
  search(sobj) {
    sobj.searchProperty = 'ser_num';
    this.$state.go('.', {page: 1}, {notify: false});
    this.operateService.search(1, undefined, sobj);
  }
}