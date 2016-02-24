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

  // 列定义
  column() {
    return this.dataTableColumns;
  }

  // 搜索条件保存
  search(page, size = this.size, params = this.searchObject) {
    this.searchObject = params;
    this.searchObject.orderDirection = 'desc';
    this.searchObject.orderProperty = 'order_time';

    return super.search(page, size, params);
  }

  // 打开详情页
  openInfoPage(code) {
    let title = '订单详情';
    let binding = {
      order: this.orderFactory.getById(code).then((order) => {
// console.info(new Date(order.paymentTime).format('yyyy-MM-dd hh:mm:ss'));
// if(order.paymentTime) { order.paymentTime = order.paymentTime.format('yyyy-MM-dd HH:mm:ss'); }
// if(order.shippingTime) { order.shippingTime = order.shippingTime.format('yyyy-MM-dd HH:mm:ss'); }

if (order.orderStatusName) {
  order.orderStatusName = {'0': '未确认', '1': '已确认', '2': '已完成', '3': '已取消'}[order.orderStatusName];
}
if (order.paymentStatusName) {
  order.paymentStatusName = {'0': '未支付', '1': '部分支付', '2': '已支付', '3': '部分退款', '4': '已退款'}[order.paymentStatusName];
}
if (order.shippingStatusName) {
  order.shippingStatusName = {'0': '未发货', '1': '部分发货', '2': '已发货', '3': '部分退货', '4': '已退货'}[order.shippingStatusName];
}
        return order;
      })
    };

    let inputs = [
      {name: '订单编号', model: 'order.sn'},
      {name: '商品', model: 'order.productName'},
      {name: '客户', model: 'order.consignee'},
      {name: '商品数量', model: 'order.quantity'},
      {name: '订单金额', model: 'order.price'},
      {name: '订单状态', model: 'order.orderStatusName'},
      {name: '支付状态', model: 'order.paymentStatusName'},
      {name: '支付时间', model: 'order.paymentTime'},
      {name: '出货状态', model: 'order.shippingStatusName'},
      {name: '出货时间', model: 'order.shippingTime'},
      {name: '订单生成时间', model: 'order.orderTime'},
      {name: '机器编号', model: 'order.vmSn'},
      {name: '机器名称', model: 'order.vmName'}
    ];

    super.openEditDialog(title, inputs, binding, null, true)
      .then(({order}) => {
// console.info(order);
    });
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