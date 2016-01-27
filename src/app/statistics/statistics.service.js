/**
 * 统计服务
 */

import { BusinessFactory } from '../main/business.factory';

export class StatisticsService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, statisticsFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, statisticsFactory);
    this.searchObj = {};
    this.stype = 'byProduct'; // byProduct, byMachine
    this.statisticsFactory = statisticsFactory;
  }

  // 获取列定义
  columns(stype) {
    if (stype === 'byProduct') {
      return dataTableColumnsMachine;
    } else if (stype === 'byMachine') {
      return dataTableColumnsProduct;
    } else {
      return [];
    }
  }

  // 路由初始化接口
  init() {
    this.search(1, undefined, this.stype, {});
  }

  // 下载
  download() {
    return this.statisticsFactory.download(this.stype, this.searchObj);
  }

  // 搜索包装
  search(page, size = this.size, type = this.stype, params = this.searchObj) {
    let _this = this;
    this.searchObj = params;

    this.stype = type;
    return this.statisticsFactory.search(page, size, type, params)
      .then((paging) => {
// console.info(paging);
      return paging;
    }).then((paging) => {
      _this.globalNotice('search', paging);
    });
  }
}

// 售货机
let dataTableColumnsMachine = [
  {data: 'serNum', title: '售货机编号'},
  {data: 'name', title: '售货机名称'},
  {data: 'aPennyCount', title: '一分钱喝商品销售数量'},
  {data: 'aPennyAmount', title: '一分钱喝销售金额'},
  {data: 'giftCount', title: '礼品券兑换数量'},
  {data: 'giftAmount', title: '礼品券金额'},
  {data: 'saleCount', title: '零售销售数量'},
  {data: 'saleAmount', title: '零售销售金额'},
  {data: 'totalCount', title: '商品销售总数量'},
  {data: 'totalAmount', title: '销售总金额'}
];

// 商品
let dataTableColumnsProduct = [
  {data: 'productSn', title: '商品编码'},
  {data: 'productName', title: '商品名称'},
  {data: 'aPennyCount', title: '一分钱喝商品销售数量'},
  {data: 'aPennyAmount', title: '一分钱喝销售金额'},
  {data: 'giftCount', title: '礼品券兑换数量'},
  {data: 'giftAmount', title: '礼品券金额'},
  {data: 'saleCount', title: '零售销售数量'},
  {data: 'saleAmount', title: '零售销售金额'},
  {data: 'totalCount', title: '商品销售总数量'},
  {data: 'totalAmount', title: '销售总金额'}
];