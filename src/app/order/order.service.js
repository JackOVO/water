/**
 * 订单服务
 */

import { BusinessFactory } from '../main/business.factory';

export class OrderService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, orderFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, orderFactory);
    this.searchObject = {};
    this.orderFactory = orderFactory;
    this.dataTableColumns = dataTableColumns;
  }

  // 路由接口
  init(page) {
    this.search(page, this.size, {});
  }

  // 搜索条件保存
  search(page, size = this.size, params = this.searchObject) {
    this.searchObject = params;

    return super.search(page, size, params);
  }

  // 下载, 要关联搜索条件
  download() {
    this.orderFactory.download(1, this.size, this.searchObject);
  }
}

// 数据列定义
let dataTableColumns = [
  {data: 'sn', title: '订单编号'},
  {data: 'productName', title: '商品'},
  {data: 'consignee', title: '客户'},
  {data: 'price', title: '订单金额'},
  {data: 'orderStatusName', title: '订单状态'},
  {data: 'paymentStatusName', title: '支付状态'},
  {data: 'shippingStatusName', title: '出货状态'},
  {data: 'orderTime', title: '订单生成时间'},
  {data: 'vmName', title: '机器名称'}
];