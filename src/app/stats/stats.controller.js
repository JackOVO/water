/**
 * 活动用户统计
 */

export class StatsController {
  constructor($scope, statsService) {
    'ngInject';

    this.title = '统计列表';
    this.statsService = statsService;

    this.paging = null;
    this.isPaging = true;
    this.columns = statsService.columns(); // 数据列定义

    // 按钮配置
    this.btns = [{
      name: '下载Excel', icon: 'fa-download', click: this.download
    }];

    $scope.sobj = {};
    // 回调监听
    $scope.$on('statsSearch', (e, paging) => {
      this.paging = paging;
    });

    $scope.$watch('vm.promotionStatsType', () => {
      $scope.sobj.startDate = null;
      $scope.sobj.endDate = null;
    });

    this.promotionStatsType = 'TODAY'; // 自定义
    // 搜索工具条配置
    this.tools = {
      inputs: [{
        type: 'radio', valKey: 'vm.promotionStatsType',
        clas: 'col-md-3', list: [
          {v: 'TODAY', t:'今天'},
          {v: 'THE_WEEK', t:'本周'},
          {v: 'THE_MONTH', t:'本月'},
          {v: 'THE_YEAR', t:'本年'}
        ]
      }, {
        type: 'datepicker', valKey: 'startDate',
        clas: 'col-md-2', placeholder: '开始时间'
      }, {
        type: 'datepicker', valKey: 'endDate',
        clas: 'col-md-2', placeholder: '结束时间'
      }, {
        type: 'buttons', clas: 'col-md-4 col-md-offset-1 text-right',
        reset: 'vm.reset', search: 'vm.search'
      }]
    };

    // 分页
    this.turn = (params) => {
      let page = params.page;
      statsService.search(page);
    };

    this.search = (sobj) => {
      sobj.promotionStatsType = this.promotionStatsType;
      this.statsService.search(1, undefined, sobj);
    };
  }

  download(vm) {
    vm.statsService.download();
  }
}