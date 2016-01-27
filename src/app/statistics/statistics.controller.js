/**
 * 统计控制器
 */

export class StatisticsController {
  constructor($scope, $timeout, statisticsService, productService, machineService) {
    'ngInject';
    let _this = this;
    this.title = '统计列表';
    this.statisticsService = statisticsService;

    this.paging = null;
    this.columnDefs = {};
    this.Machinecolumns = statisticsService.columns('byProduct');
    this.Productcolumns = statisticsService.columns('byMachine');

    // 按钮配置
    this.btns = [{
      name: '下载Excel', icon: 'fa-download', click: this.download
    }];

    // 搜索引用
    $scope.sobj = {};
    $scope.stype = 'byProduct'; // 列判断
    $scope.sobj.stype = 'byProduct';
    this.stypes = [
      {value: 'byProduct', text: '按商品统计售货机'},
      {value: 'byMachine', text: '按售货机统计商品'}
    ];
    this.typeAry = [];
    // 搜索工具条配置
    this.tools = {
      inputs: [{
        type: 'select', valKey: 'stype', source: 'vm.stypes',
        clas: 'col-md-2', placeholder: '选择查询类型'
      }, {
        type: 'select', valKey: 'typeCode', source: 'vm.typeAry',
        clas: 'col-md-4', placeholder: '选择类型数据'
      }, {
        type: 'datepicker', valKey: 'startDate',
        clas: 'col-md-2', placeholder: '开始时间'
      }, {
        type: 'datepicker', valKey: 'endDate',
        clas: 'col-md-2', placeholder: '结束时间'
      }, {
        type: 'buttons', clas: 'col-md-2 text-right',
        reset: 'vm.reset', search: 'vm.search'
      }]
    };

    // 监听搜索类型变化
    $scope.$watch('sobj.stype', (stype) => {
      if (stype === 'byProduct') {
        productService.getCombobox().then((ary) => {
          _this.typeAry = ary;
        });
      } else if (stype === 'byMachine') {
        machineService.getCombobox().then((ary) => {
          _this.typeAry = ary;
        });
      }
      $scope.sobj.typeCode = undefined;
    });

    // 搜索回调监听
    $scope.$on('statisticsSearch', (e, paging) => {
      this.paging = paging;
      $scope.stype = $scope.sobj.stype; // 变更时更新列定义
    });

    // 分页
    this.turn = (params) => {
      let page = params.page;
      statisticsService.search(page);
    };
  }

  download(vm) {
    vm.statisticsService.download();
  }

  // 搜索
  search(sobj) {
    let searchObject = angular.copy(sobj);
    let type = searchObject.stype;
    delete searchObject.stype;
    if(searchObject.typeCode) {
      let key = {'byProduct': 'sn', 'byMachine': 'serNum'}[type];
      searchObject[key] = searchObject.typeCode;
    }
    delete searchObject.typeCode;

    let fmt = 'yyyy-MM-dd';
    if(searchObject.startDate){
      searchObject.startDate = searchObject.startDate.format(fmt);
    }
    if(searchObject.endDate){
      searchObject.endDate = searchObject.endDate.format(fmt);
    }

    return this.statisticsService.search(1, undefined, type, searchObject);
  }
}

