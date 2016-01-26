/**
 * 运营服务
 */

import { BusinessFactory } from '../main/business.factory';

export class LogService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, logFactory, aisleService) {
    'ngInject';

    super(toastr, $rootScope, dialogService, logFactory, 1);
    this.machineCode = null;
    this.logFactory = logFactory;
    this.aisleService = aisleService;

    this.dataTableColumns = dataTableColumns;
  }

  // 获取货道的combobox, 由于要machineCode参数, 所以要封装一下
  getAisleCombobox() {
    return this.aisleService.getCombobox(this.machineCode);
  }

  // 包装搜索
  search(code = this.machineCode, page, size = this.size, options) {
    let _this = this;
    this.machineCode = code;

    return this.logFactory.searchByMachineCode(code, page, size, options)
      .then((paging) => {
        return _this.globalNotice('search', paging);
    });
  }
}

// 数据列定义
let dataTableColumns = [
  {data: 'machine_code', title: '机器Code'},
  {data: 'machine_name', title: '机器名称'},
  {data: 'aisle_code', title: '货道'},
  {data: 'product_name', title: '商品名称'},
  {data: 'product_num', title: '商品数量'},
  {data: 'created_date', title: '补货时间'},
  {data: 'created_by', title: '补货人'},
  {data: 'remarks', title: '补货备注'}
];