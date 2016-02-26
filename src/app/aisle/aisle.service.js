/**
 * 货道服务
 */

import { BusinessFactory } from '../main/business.factory';

export class AisleService extends BusinessFactory {
  constructor(
    toastr,
    $rootScope,
    dialogService,
    aisleFactory,
    productFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, aisleFactory);
    this.machineCode = null;
    this.aisleFactory = aisleFactory;
    this.productFactory = productFactory;

    this.dataTableColumns = dataTableColumns;
  }

  // 打开编辑页添加依赖数据
  openEditPage(id) {
    let _this = this;
    let title = '增加货道';

    // 商品区分参数, 必须要添加机器code
    let productP = {
      code: this.machineCode,
      pageAction: 'MAINTAIN_AISLE'
    };

    let binding = {
      'aisle': {},
      'products': this.productFactory.getCombobox(productP)
    };

    // 存在code即识别为编辑状态
    if (id) {
      title = '修改货道';
      binding.aisle = this.aisleFactory.getById(id).then((aisle) => {
          delete aisle.picUrl;
          delete aisle.createDate;
          delete aisle.modifyDate;
          delete aisle.productName;
        return aisle;
      });
    }

    let inputs = [
      {name: '货道编号', model: 'aisle.aisleCode', required: true},
      {name: '商品名称', model: 'aisle.productCode', type: 'select',
       source: 'products', m2: 'aisle.productName', def: '请选择货道商品'},
      {name: '货道容量', model: 'aisle.amount', type:'number', required: true},
      {name: '商品价格', model: 'aisle.price', type:'number', required: true}];

    super.openEditDialog(title, inputs, binding).then(({aisle}) => {
      aisle.machineCode = _this.machineCode;
      if (typeof(aisle.id) !== 'undefined') {
        super.update(aisle);
      } else {
        super.add(aisle);
      }
    });
  }

  // 删除在封装
  del(id, acode) {
    let _this = this;
    let title = '删除货道(' + acode + ')';
    let content = '<p>确认删除该货道吗?</p>';

    super.confirmDialog(title, content).then(() => {
      return _this.aisleFactory.delete('ids', [id]).then((msg) => {
        _this.refreshList(msg);
        return msg;
      });
    });
  }

  init(code = this.machineCode) {
    this.machineCode = code;
    this.search(1, this.size, code);
  }

  search(page) {
    let params = {'machineCode': this.machineCode};
    return super.search(page, this.size, params);
  }

  // // 获取机器的货道列表
  // getAll(code = this.machineCode) {
  //   let _this = this;
  //   this.machineCode = code;

  //   return this.aisleFactory.getAllByMachineCode(code).then((array) => {
  //     return _this.globalNotice('all', array);
  //   });
  // }

  // 获取combobox封装
  getCombobox(machineCode) {
    return this.aisleFactory.getCombobox(machineCode);
  }
}

// 列定义
let dataTableColumns = [
  {data: 'machineCode', title: '机器编号'},
  {data: 'machineName', title: '机器名称'},
  {data: 'aisleCode', title: '货道编号'},
  {data: 'aisleProblem', title: '货道状态'},
  {data: 'productName', title: '商品名称'},
  {data: 'price', title: '商品价格'},
  {data: 'amount', title: '货道容量'},
  {data: 'stock', title: '当前库存'}
];
