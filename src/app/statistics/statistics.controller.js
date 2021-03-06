/**
 * 统计控制器
 */

export class StatisticsController {
  constructor($scope, $state, statisticsService, productFactory, statusService, machineService) {
    'ngInject';

    let _this = this;
    this.title = '统计列表';

    this.$state = $state;
    this.statisticsService = statisticsService;

    this.p = false;
    this.info = false;
    this.paging = null;
    this.columns = statisticsService.columns();

    // 按钮配置
    this.btns = [{
      name: '图表视图', icon: 'fa-pie-chart', click: this.getChart
    }, {
      name: '下载Excel', icon: 'fa-download', click: this.download
    }];

    // 搜索引用
    $scope.sobj = {};
    this.products = null;
    this.machines = null;
    this.statsTimeType = statusService.getCombobox('allTimeType');

    // 搜索工具条配置
    this.tools = {
      inputs: [{
        type: 'select', valKey: 'productCode', source: 'vm.products',
        clas: 'col-md-4', placeholder: '选择所属商品'
      }, {
        type: 'select', valKey: 'statsTimeScopeType', source: 'vm.statsTimeType',
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
        reset: 'vm.reset', search: 'vm.search'
      }, {
        type: 'select', valKey: 'machineCode', source: 'vm.machines',
        clas: 'col-md-4', placeholder: '选择所属机器'
      }]
    };

    // 获取搜索选项数据
    // let productP = {
    //   code: this.machineCode,
    //   pageAction: 'MAINTAIN_AISLE'
    // };
    productFactory.getCombobox().then((products) => {
      _this.products = products;
      _this.products.splice(0, 0, {value: '-1', 'text': '不限制商品类型'});
    });
    machineService.getCombobox().then((machines) => {
      _this.machines = machines;
      _this.machines.splice(0, 0, {value: '-1', 'text': '不限制所属机器'});
    });

    // 搜索回调监听
    $scope.$on('statisticsSearch', (e, paging) => {
      this.paging = paging;
    });

    // 分页
    this.turn = (params) => {
      let page = params.page;
      statisticsService.search(page).tehn(() => {
        $state.go('.', {page: page}, {notify: false});
      });
    };

    // 重置
    this.reset = () => {
      return this.statisticsService.search(1, undefined, {});
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

  download(vm) {
    vm.statisticsService.download();
  }

  getChart(vm) {
    vm.$state.go('home.chart', {aim: 'statistics'});
  }

  // 搜索
  search(sobj) {
    this.loading = true;
    let copy = angular.copy(sobj);
    for (let key in copy) {
      if (copy[key] === '-1') { delete copy[key]; }
    }
    return this.statisticsService.search(1, undefined, copy);
  }
}

