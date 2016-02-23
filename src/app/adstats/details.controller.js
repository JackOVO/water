/**
 * 广告统计详情控制器
 */

export class DetailsController  {
  constructor($scope, adStatsService, statusService, machineFactory) {
    'ngInject';

    let _this = this;
    this.paging = null;
    this.title = '播放明细';
    this.columns = adStatsService.detailColums();

    // 搜索源
    $scope.sobj = {}; // 关联到搜索条件
    this.timeType = null;
    this.playTypes = null;
    this.machines = [{value: -1, text: '不限机器'}];

    // 搜索工具条配置
    this.tools = {
      inputs: [{
        type: 'select', valKey: 'machineCode', source: 'vm.machines',
        clas: 'col-md-2', placeholder: '选择所属机器'
      }, {
        type: 'select', valKey: 'isPlayComplete', source: 'vm.playTypes',
        clas: 'col-md-2', placeholder: '选择播放程度'
      }, {
        type: 'select', valKey: 'queryTimeType', source: 'vm.timeType',
        clas: 'col-md-2', placeholder: '选择时间类型'
      }, {
        type: 'datepicker', valKey: 'beginPlayDate',
        clas: 'col-md-2', placeholder: '开始时间'
      }, {
        type: 'datepicker', valKey: 'endPlayDate',
        clas: 'col-md-2', placeholder: '结束时间'
      }, {
        type: 'buttons2', search: 'vm.search',
        clas: 'col-md-2', reset: 'vm.reset'
      }]
    };

    // 监听搜索条件, 绑定响应的逻辑- -
    $scope.$watch('sobj.queryTimeType', (type) => {
      if (type && type-0 !== -1) {
        delete $scope.sobj.endPlayDate;
        delete $scope.sobj.beginPlayDate;
      }
    });
    $scope.$watch('sobj.beginPlayDate', (date) => {
      if (!date) { return; }
      delete $scope.sobj.queryTimeType;
    });
    $scope.$watch('sobj.endPlayDate', (date) => {
      if (!date) { return; }
      delete $scope.sobj.queryTimeType;
    });

    $scope.$on('adstatsSearch', (e, paging) => {
      this.paging = paging;
    });

    // 机器列表
    machineFactory.getCombobox().then((combobox) => {
      _this.machines = _this.machines.concat(combobox);
    });
    this.timeType = statusService.getCombobox('adTimeType');
    this.playTypes = statusService.getCombobox('adPlayType');

    // 分页
    this.turn = (params) => {
      let page = params.page;
      adStatsService.detailSearch(page);
    };

    // 重置
    this.reset = () => {
      adStatsService.info(null);
    };

    // 搜索
    this.search = (sobj) => {
      let condition = angular.copy(sobj);
      for (let key in condition) {
        if (condition[key] - 0 === -1) {
          delete condition[key];
        }
      }
      adStatsService.detailSearch(1, condition);
    };
  }
}

// detailColums