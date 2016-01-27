/**
 * 运营控制器
 */

export class OrderController {
  constructor($scope, orderService) {
    'ngInject';
    let _this = this;
    this.title = '订单列表';

    this.paging = null;
    this.columnDefs = {};
    this.orderService = orderService;
    this.columns = orderService.dataTableColumns; // 数据列定义

    // 按钮配置
    this.btns = [{
      name: '下载Excel', icon: 'fa-download', click: this.download
    }];

    // 搜索工具条配置
    this.tools = {
      inputs: [{
        type: 'search',
        clas: 'col-md-offset-7 col-md-5',
        reset: 'vm.reset',
        search: 'vm.search',
        valKey: 'searchValue',
        parKey: 'searchProperty',
        placeholder: '输入查询的值',
        downbar: [{value: 'sn', text: '订单编号'},
                  {value: 'consignee', text: '客户名称'},
                  {value: 'productName', text: '商品名称'}]
      }]
    };

    // 搜索回调监听
    $scope.$on('orderSearch', (e, paging) => {
      this.paging = paging;
    });

    // 翻页方法
    this.turn = (params) => {
      let page = params.page;
      _this.orderService.search(page);
    };

    // 清空方法
    this.reset = () => {
      orderService.search(1, undefined, {});
    };
  }

  // 搜索
  search(sobj) {
    this.orderService.search(1, undefined, sobj);
  }

  // 下载
  download(vm) {
    vm.orderService.download();
  }
}