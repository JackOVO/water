/**
 * 广告历史控制器
 */

export class AdHistoryController {
  constructor($scope, $state, machineFactory, statusService, adHistoryService) {
    'ngInject';

    let _this = this;
    this.title = '排期历史';
    this.paging = null;
    this.columns = adHistoryService.columns();

    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '明细', action: ({resourceCode:c}) => `vm.goInfo('${c}')`}
      ]
    };

    // 搜索源预定义
    $scope.sobj = {}; // 关联到搜索条件
    this.adTypes = null;
    this.timeType = null;
    this.machines = [{value: -1, text: '不限机器'}];
    this.playTypes = null;

    machineFactory.getCombobox().then((combobox) => {
      _this.machines = _this.machines.concat(combobox);
    });
    this.adTypes = statusService.getCombobox('adType');
    this.status = statusService.getCombobox('planStatus');
    this.timeType = statusService.getCombobox('adTimeType');


    // 搜索工具条配置
    this.tools = {
      inputs: [{
        type: 'select', valKey: 'resourceType', source: 'vm.adTypes',
        clas: 'col-md-2', placeholder: '选择资源类型'
      }, {
        type: 'select', valKey: 'status', source: 'vm.status',
        clas: 'col-md-2', placeholder: '选择投放状态'
      }, {
        type: 'select', valKey: 'scopeType', source: 'vm.timeType',
        clas: 'col-md-2', placeholder: '选择时间类型'
      }, {
        type: 'datepicker', valKey: 'planStartDate',
        clas: 'col-md-2', placeholder: '开始时间'
      }, {
        type: 'datepicker', valKey: 'planEndDate',
        clas: 'col-md-2', placeholder: '结束时间',
        setHours: '23'
      }, {
        type: 'buttons2', search: 'vm.search',
        clas: 'col-md-2', reset: 'vm.reset'
      }, {
        type: 'select', valKey: 'machineCode', source: 'vm.machines',
        clas: 'col-md-4', placeholder: '选择所属机器'
      }]
    };

    // 监听搜索条件, 绑定响应的逻辑- -
    $scope.$watch('sobj.scopeType', (type) => {
      if (type && type-0 !== -1 && type !== 'SELF_DEF') {
        delete $scope.sobj.planEndDate;
        delete $scope.sobj.planStartDate;
      }
    });
    $scope.$watch('sobj.planStartDate', (date) => {
      if (!date) { return; }
      $scope.sobj.scopeType = 'SELF_DEF';
    });
    $scope.$watch('sobj.planEndDate', (date) => {
      if (!date) { return; }
      $scope.sobj.scopeType = 'SELF_DEF';
    });

    // 搜索
    this.search = (sobj) => {
      let condition = angular.copy(sobj);
      for (let key in condition) {
        if (condition[key] - 0 === -1) {
          delete condition[key];
        }
      }
      adHistoryService.search(1, undefined, condition);
    }

    // 重置
    this.reset = () => {
      adHistoryService.search(1, undefined, {});
    };

    // 明细
    this.goInfo = (code) => {
      $state.go('home.child', {pAim: 'adhistory', aim: 'details', id: code});
    };

    $scope.$on('adhistorySearch', (e, paging) => {
      this.paging = paging;
    });

    // 翻页请求
    this.turn = (params) => {
      let page = params.page;
      adHistoryService.search(page).then(() => {
        $state.go('.', {page: page}, {notify: false});
      });
    };
  }
}