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

    // 搜索回调监听
    $scope.$on('orderSearch', (e, paging) => {
      this.paging = paging;
    });

    // 翻页方法
    this.turn = (params) => {
      let page = params.page;
      _this.orderService.search(page);
    };
  }
}