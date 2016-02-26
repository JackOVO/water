/**
 * 统计控制器
 */

export class StatisticsController {
  constructor($scope, $state, statisticsService, productFactory, statusService, machineService) {
    'ngInject';

    let _this = this;
    this.title = '统计列表';
    this.statisticsService = statisticsService;

    this.p = false;
    this.info = false;
    this.paging = null;
    this.columns = statisticsService.columns();

    // 按钮配置
    this.btns = [{
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
    });
    machineService.getCombobox().then((machines) => {
      _this.machines = machines;
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
  }

  download(vm) {
    // vm.statisticsService.download();
  }

  // 搜索
  search(sobj) {
    return this.statisticsService.search(1, undefined, sobj);
  }
}

