/**
 * 统计服务
 */

import { BusinessFactory } from '../main/business.factory';

export class StatisticsService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, statisticsFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, statisticsFactory);
    this.searchObj = {};
    this.dataTableColumns = dataTableColumns;
    this.statisticsFactory = statisticsFactory;
  }

  // 获取列定义
  columns() {
    return this.dataTableColumns;
  }

  // 搜索添加封装
  search(page, size = this.size, params = this.searchObj) {
    this.searchObj = params;
    return super.search(page, size, params);
  }

  download() {
    return this.statisticsFactory.download(this.searchObj);
  }
}

// 售货机
let dataTableColumns = [
  {data: 'serNum', title: '售货机编号'},
  {data: 'machineName', title: '售货机名称'},
  {data: 'aPennyCount', title: '一分钱喝商品销售数量'},
  {data: 'aPennyAmounts', title: '一分钱喝商品销售金额'},
  {data: 'giftCount', title: '礼品券兑换数量'},
  {data: 'giftAmounts', title: '礼品券金额'},
  {data: 'saleCount', title: '零售数量'},
  {data: 'saleAmounts', title: '零售金额'},
  {data: 'totalCount', title: '商品销售总数量'},
  {data: 'totalAmounts', title: '销售总金额'}
];