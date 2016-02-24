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
    this.searchObj = {};
    this.productFactory = productFactory;
    this.dataTableColumns = dataTableColumns;

    this.dataTableService = dataTableService;
  }

  // 附加列处理
  columns() {
    this.dataTableColumns[4].render = this.dataTableService.imgLinkRender;
    return this.dataTableColumns;
  }

  // 搜索包装
  search(page, params = this.searchObj) {
    let size = this.size;
    this.searchObj = params;
    return super.search(page, size, params);
  }

  // 打开编辑页添加依赖数据
  openEditPage(code) {
    let _this = this;
    let title = '增加商品';
    let binding = {
      product: {}
    };

    // 存在code即识别为编辑状态
    if (code) {
      title = '修改商品';
      binding.product = this.productFactory.getById(code);
    }

    let inputs = [
      {name: '商品名称', model: 'product.name', required: true},
      {name: '售价', model: 'product.price', type:'number', required: true},
      {name: '市场价', model: 'product.marketPrice', type:'number', required: true},
      {name: '商品图片', model: 'product.image', required: true,
        type: 'upload', upName: 'img'}
    ];

    super.openEditDialog(title, inputs, binding)
      .then(({product, uploadFn, files}) => {
      let key = product.sn ? 'upd' : 'add';
      if (files && files.length) { // 上传
        _this[key](product, uploadFn);
      } else {
        _this[key](product);
      }
    });
  }

  // 上传添加封装
  add(entity, uploadFn) {
    let _this = this;
    return this.productFactory.add(entity, uploadFn).then((msg) => {
      _this.refreshList(msg, _this.page, 1);
      return msg;
    });
  }

  // 修改添加封装
  upd(entity, uploadFn) {
    let _this = this;
    return this.productFactory.upd(entity, uploadFn).then((msg) => {
      _this.refreshList(msg);
      return msg;
    });
  }

  // 删除在封装
  del(code, productName) {
    let title = '删除商品(' + productName + ')';
    let content = '<p>确认删除该商品吗?</p>';

    super.confirmDialog(title, content).then(() => {
      return super.del(code);
    });
  }
}

let dataTableColumns = [
  {data: 'sn', title: '编号'},
  {data: 'name', title: '商品名称'},
  {data: 'price', title: '售价'},
  {data: 'marketPrice', title: '市场价'},
  // {data: 'id', title: '商品ID'},
  {data: 'image', title: '图片'}
  // isDel Number  Y 删除标识 1已删除，0未删除
  // {data: 'isDel', title: '删除标识'}
];