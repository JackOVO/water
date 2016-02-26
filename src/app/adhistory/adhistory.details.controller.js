/**
 * 广告历史详情控制器
 */

export class AdhistoryDetailsController {
  constructor($scope, $state, machineFactory, statusService, adHistoryService) {
    'ngInject';

    let _this = this;
    this.paging = null;
    this.children = null;
    this.title = '历史详情';
    this.columns = adHistoryService.detailsColumns();

    // 搜索源预定义
    $scope.sobj = {}; // 关联到搜索条件
    this.timeType = null;
    this.machines = [{value: -1, text: '不限机器'}];

    machineFactory.getCombobox().then((combobox) => {
      _this.machines = _this.machines.concat(combobox);
    });
    this.timeType = statusService.getCombobox('adTimeType');

    // 搜索工具条配置
    this.tools = {
      inputs: [{
        type: 'select', valKey: 'scopeType', source: 'vm.timeType',
        clas: 'col-md-4', placeholder: '选择时间类型'
      }, {
        type: 'datepicker', valKey: 'planStartDate',
        clas: 'col-md-3', placeholder: '开始时间'
      }, {
        type: 'datepicker', valKey: 'planEndDate',
        clas: 'col-md-3', placeholder: '结束时间',
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
      adHistoryService.detailsSearch(1, undefined, condition);
    }

    // 翻页请求
    this.turn = (params) => {
      let page = params.page;
      adHistoryService.detailsSearch(page);
    };

    // 表格点击相应, 通知权限更新权限树
    this.onTableClick = ({planCode}) => {
      adHistoryService.getMachines(planCode);
    }

    // 机器树点击, 选中售货机, 再次跳转
    this.machineClick = ({machineCode}) => {
      $scope.sobj.machineCode = machineCode;
      $scope.$apply();
      _this.search($scope.sobj);
    };

    // 重置
    this.reset = () => {
      adHistoryService.info();
    };

    $scope.$on('adhistoryDetailsearch', (e, paging) => {
      this.paging = paging;
    });

    $scope.$on('adhistoryToggleMachines', (e, data) => {
      this.children = data;
    });
  }
}