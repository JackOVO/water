/**
 * 活动统计服务
 */

import { BusinessFactory } from '../main/business.factory';

export class StatsService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, dataTableService, statsFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, statsFactory);
    this.searchObject = {};
    this.wechatOriginalId = null;
    this.statsFactory = statsFactory;
    this.dataTableService = dataTableService;
    this.dataTableColumns = dataTableColumns;
  }

  // 路由初始化
  init(wechatOriginalId) {
    this.wechatOriginalId = wechatOriginalId;
    this.search(1);
  }

  columns() {
    this.dataTableColumns[2].render = this.dataTableService.imgRender;
    this.dataTableColumns[5].render = this.dataTableService.dataRender;
    return this.dataTableColumns;
  }

  // 搜索
  search(page, size = this.size, params = this.searchObject) {
    let id = this.wechatOriginalId;
    this.searchObject = params;

    params = angular.extend({
      'wechatQrscene': 1,
      'wechatOriginalId': id
    }, this.searchObject);
    return super.search(page, size, params);
  }

  // 下载, 要关联搜索条件
  download() {
    let params = angular.copy(this.searchObject);
    if (!params.endDate) { delete params.endDate; }
    if (!params.startDate) { delete params.startDate; }
    this.statsFactory.download(1, this.size, params);
  }
}

// 数据列定义
let dataTableColumns = [
  {data: 'tel', title: '手机号'},
  {data: 'nickName', title: '昵称'},
  {data: 'headimgUrl', title: '头像'},
  {data: 'city', title: '地区'},
  {data: 'sex', title: '性别'},
  {data: 'createDate', title: '订阅时间'}
];