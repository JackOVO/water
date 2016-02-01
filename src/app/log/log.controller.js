/**
 * 运营控制器
 */

export class LogController {
  constructor($scope, logService, productService) {
    'ngInject';
    this.title = '日志列表';
    this.logService = logService;

    this.paging = null;
    this.isPaging = true;
    this.columns = logService.dataTableColumns; // 数据列定义

    // 搜索配置
    this.products = null;

    // 回调监听
    $scope.$on('logSearch', (e, paging) => {
      this.paging = paging;

      // 获取货道查询条件
      logService.getAisleCombobox().then((array) => {
        this.aisles = array;
      });
    });

    // 搜索工具条配置
    this.tools = {
      inputs: [{
        type: 'select', valKey: 'productCode', source: 'vm.products',
        clas: 'col-md-2', placeholder: '选择商品'
      }, {
        type: 'select', valKey: 'aisleCode', source: 'vm.aisles',
        clas: 'col-md-2', placeholder: '选择货道'
      }, {
        type: 'datepicker', valKey: 'supplyStartDate',
        clas: 'col-md-2', placeholder: '开始时间'
      }, {
        type: 'datepicker', valKey: 'supplyEndDate',
        clas: 'col-md-2', placeholder: '结束时间'
      }, {
        type: 'search', valKey: 'createdBy',
        reset: 'vm.reset', search: 'vm.search',
        clas: 'col-md-4',
        placeholder: '按补货人查询'
      }]
    };

    this.turn = (params) => {
      let page = params.page;
      logService.search(undefined, page);
    };

    // 清空
    this.reset = () => {
      logService.search(undefined, 1, undefined, {});
    };

    // 获取商品
    productService.getCombobox().then((array) => {
      this.products = array;
    });

  }

  // 搜索
  search(sobj) {
    sobj = angular.extend({}, sobj);
    // sobj.searchProperty = 'created_by';
    let fmt = 'yyyy-MM-dd';
    if(sobj.supplyEndDate){
      sobj.supplyEndDate =sobj.supplyEndDate.format(fmt);
    }
    if(sobj.supplyStartDate){
      sobj.supplyStartDate = sobj.supplyStartDate.format(fmt);
    }
console.info(sobj);
    this.logService.search(undefined, 1, undefined, sobj);
  }
}