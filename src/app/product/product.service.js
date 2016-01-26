/**
 * 运营服务
 */

import { BusinessFactory } from '../main/business.factory';

export class ProductService extends BusinessFactory {
  constructor(
    toastr,
    $rootScope,
    dialogService,
    dataTableService,
    productFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, productFactory);
    this.dataTableColumns = dataTableColumns;

    this.dataTableService = dataTableService;
  }

  // 附加列处理
  columns() {
    this.dataTableColumns[6].render = this.dataTableService.delFlagRender;
    return this.dataTableColumns;
  }
}

let dataTableColumns = [
  {data: 'sn', title: '编号'},
  {data: 'name', title: '商品名称'},
  {data: 'price', title: '售价'},
  {data: 'marketPrice', title: '市场价'},
  {data: 'id', title: '商品ID'},
  {data: 'image', title: '图片'},
  // isDel Number  Y 删除标识 1已删除，0未删除
  {data: 'isDel', title: '删除标识'}
];