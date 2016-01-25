/**
 * 订单服务
 */

import { BusinessFactory } from '../main/business.factory';

export class OrderService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, orderFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, orderFactory);
    this.dataTableColumns = dataTableColumns;
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