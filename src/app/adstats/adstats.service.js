/**
 * 广告统计服务
 */

import { BusinessFactory } from '../main/business.factory';

export class AdStatsService extends BusinessFactory {
  constructor(toastr,
    $rootScope,
    dialogService,
    adStatsFactory,
    dataTableService) {
    'ngInject';

    super(toastr, $rootScope, dialogService, adStatsFactory);
    this.searchObject = {};
    this.searchObjectInfo = {};
    this.adStatsFactory = adStatsFactory;
    this.dataTableCloum = dataTableCloum;
    this.dataTableService = dataTableService;
    this.detailDataTableCloum = detailDataTableCloum;
  }

  columns() {
    this.dataTableCloum[6].render = this.dataTableService.MsturnSecRender;
    this.dataTableCloum[2].render = this.dataTableService.mediaTypesRender;
    return this.dataTableCloum;
  }

  // 详情列表
  detailColums() {
    this.detailDataTableCloum[3].render = this.dataTableService.timeRender;
    this.detailDataTableCloum[4].render = this.dataTableService.timeRender;
    this.detailDataTableCloum[2].render = this.dataTableService.mediaTypesRender;
    this.detailDataTableCloum[5].render = this.dataTableService.MsturnSecRender;
    this.detailDataTableCloum[6].render = this.dataTableService.playTypeRender;
    return this.detailDataTableCloum;
  }

  // 初始化汇总数据
  init() {
    this.searchObject = {};
    this.getSummaryList();
  }

  // 详情初始化
  info(id) {
    if (id) { this.searchObjectInfo = {adresourceCode: id}; }
      else {
        this.searchObjectInfo = {
          adresourceCode: this.searchObjectInfo.adresourceCode
        };
      }
    return super.search(1, this.size, this.searchObjectInfo);
  }

  // 详情搜索
  detailSearch(page, params) {
    this.searchObjectInfo = angular.extend({}, this.searchObjectInfo, params);
this.formatDate(this.searchObjectInfo);
    return super.search(page, this.size, this.searchObjectInfo);
  }

  search(condition) {
    this.searchObject = condition;
this.formatDate(this.searchObject);
    return this.getSummaryList(condition);
  }

  // 下载, 要关联搜索条件
  download(condition = this.searchObject) {
    this.adStatsFactory.download(condition);
  }

  // 详情信息下载
  detailDownload(condition = this.searchObjectInfo) {
    this.adStatsFactory.detailDownload(condition);
  }

  getSummaryList(entity) {
    let _this = this;
    return this.adStatsFactory.getSummaryList(entity).then((data) => {
      return _this.globalNotice('getSummary', data);
    });
  }

  formatDate(c) {
    if (c.endTime) {
      c.endTime = c.endTime.format('yyyy-MM-dd');
    }
    if (c.startTime) {
      c.startTime = c.startTime.format('yyyy-MM-dd');
    }
  }
}

let dataTableCloum = [
  {data: 'adresourceCode', title: '广告CODE'},
  {data: 'adName', title: '广告名称'},
  {data: 'adType', title: '资源类型'},
  {data: 'playFrequency', title: '播放总次数'},
  {data: 'complete', title: '完整播放次数'},
  {data: 'suspension', title: '播放中断次数'},
  {data: 'totalTime', title: '播放总时间(秒)'}
];

let detailDataTableCloum = [
  {data: 'adresourceCode', title: '广告CODE'},
  {data: 'adName', title: '广告名称'},
  {data: 'adType', title: '类型'},
  {data: 'beginPlayDate', title: '播放开始时间'},
  {data: 'endPlayDate', title: '播放结束时间'},
  {data: 'playSecond', title: '播放合计（秒）'},
  {data: 'isPlayComplete', title: '播放类型'},
  {data: 'serNum', title: '机器编号'},
  {data: 'machineName', title: '机器名称'}
];