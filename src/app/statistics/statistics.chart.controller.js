/**
 * 统计图标控制器
 */

export class StatisticsChartController {
  constructor($scope, statisticsService, statusService, productFactory, machineService) {
    'ngInject';
    let _this = this;

    this.title = '销售统计图表';
    this.chartData = null;

    // 搜索引用
    $scope.sobj = {
      searchType: 'byProduct',
      statsTimeScopeType: 'TRELVE_MONTH'
    };
    this.products = null;
    this.machines = null;
    this.statisticsService = statisticsService;
    this.statsTimeType = statusService.getCombobox('allTimeType');
    this.searchTypes = [{
      value: 'byProduct',
      text: '按商品统计售货机销售总额'
    }, {
      value: 'byMachine',
      text: '按售货机统计商品销售总额'
    }];

    this.btns = [{
      name: '列表视图', icon: 'fa-pie-chart', click: this.getList
    }];


    // 搜索工具条配置
    this.tools = {
      inputs: [{
        type: 'select', valKey: 'productCode', source: 'cvm.products',
        clas: 'col-md-4', placeholder: '选择所属商品'
      }, {
        type: 'select', valKey: 'statsTimeScopeType', source: 'cvm.statsTimeType',
        clas: 'col-md-2', placeholder: '选择时间类型'
      }, {
        type: 'datepicker', valKey: 'startDate',
        clas: 'col-md-2', placeholder: '开始时间'
      }, {
        type: 'datepicker', valKey: 'endDate',
        clas: 'col-md-2', placeholder: '结束时间',
        setHours: '23'
      }, {
        type: 'buttons2', clas: 'col-md-2 text-right',
        reset: 'cvm.reset', search: 'cvm.search'
      }, {
        type: 'select', valKey: 'machineCode', source: 'cvm.machines',
        clas: 'col-md-4', placeholder: '选择所属机器'
      }, {
        type: 'select', valKey: 'searchType', source: 'cvm.searchTypes',
        clas: 'col-md-4', placeholder: '选择统计的维度'
      }]
    };

    // 填充
    productFactory.getCombobox().then((products) => {
      _this.products = products;
      _this.products.splice(0, 0, {value: '-1', 'text': '不限制商品类型'});
    });
    machineService.getCombobox().then((machines) => {
      _this.machines = machines;
      _this.machines.splice(0, 0, {value: '-1', 'text': '不限制所属机器'});
    });

    // 监听图表
    $scope.$on('statisticsByProduct', (e, cdata) => {
      _this.chartData = cdata;
    });

    // 监听图表(机器)
    $scope.$on('statisticsByMachine', (e, cdata) => {
console.info(cdata);
      _this.chartData = cdata;
    });

        // 重置
    this.reset = () => {
      let key = $scope.sobj.searchType || 'byProduct';
      return this.statisticsService[key]({});
    };

        // 监听搜索条件, 绑定响应的逻辑- -
    $scope.$watch('sobj.statsTimeScopeType', (type) => {

      if (type && type-0 !== -1 && type !== 'SELF_DEF') {
        delete $scope.sobj.endDate;
        delete $scope.sobj.startDate;
      }
    });
    $scope.$watch('sobj.startDate', (date) => {
      if (!date) { return; }
      $scope.sobj.statsTimeScopeType = 'SELF_DEF';
    });
    $scope.$watch('sobj.endDate', (date) => {
      if (!date) { return; }
      $scope.sobj.statsTimeScopeType = 'SELF_DEF';
    });

  }

  search (sobj) {
    this.loading = true;
    let copy = angular.copy(sobj);
    for (let key in copy) {
      if (copy[key] === '-1') { delete copy[key]; }
    }

    let key = sobj.searchType || 'byProduct';
    return this.statisticsService[key](copy);
  }
}