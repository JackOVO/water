/**
 * 广告统计控制器
 */

export class AdStatsController {
  constructor($scope, $state, adStatsService, statusService, machineFactory) {
    'ngInject';

    let _this = this;
    this.adStatsService = adStatsService;
    this.paging = null;
    this.title = '播放汇总';
    this.columns = adStatsService.columns();

    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '明细', action: ({adresourceCode:c}) => `vm.goInfo('${c}')`}
      ]
    };

    // 搜索源预定义
    $scope.sobj = {}; // 关联到搜索条件
    this.adTypes = null;
    this.timeType = null;
    this.machines = [{value: -1, text: '不限机器'}];
    this.playTypes = null;

    // 按钮配置
    this.btns = [{
      name: '下载Excel', icon: 'fa-download', click: this.download
    }];

    // 搜索工具条配置
    this.tools = {
      inputs: [{
        type: 'select', valKey: 'adType', source: 'vm.adTypes',
        clas: 'col-md-2', placeholder: '选择资源类型'
      },{
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
      }, {
        type: 'select', valKey: 'machineCode', source: 'vm.machines',
        clas: 'col-md-4', placeholder: '选择所属机器'
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

    // 搜索
    this.search = (sobj) => {
      let condition = angular.copy(sobj);
      for (let key in condition) {
        if (condition[key] - 0 === -1) {
          delete condition[key];
        }
      }
      adStatsService.search(condition);
    }

    // 重置
    this.reset = () => {
      adStatsService.init();
    };

    // 明细
    this.goInfo = (code) => {
      if (code === '合计') { return; }
      $state.go('home.child', {pAim: 'adstats', aim: 'details', id: code});
    };

    machineFactory.getCombobox().then((combobox) => {
      _this.machines = _this.machines.concat(combobox);
    });
    this.adTypes = statusService.getCombobox('adType');
    this.timeType = statusService.getCombobox('adTimeType');
    this.playTypes = statusService.getCombobox('adPlayType');

    $scope.$on('adstatsGetSummary', (e, paging) => {
      this.paging = paging;
    });

  }

  // 下载excel
  download(vm) {
    vm.adStatsService.download();
  }
}