/**
 * 广告历史服务
 */

 import { BusinessFactory } from '../main/business.factory';

 export class AdHistoryService extends BusinessFactory {
  constructor(toastr,
    $rootScope,
    dialogService,
    dataTableService,
    adHistoryFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, adHistoryFactory);
    this.searchObject = {};
    this.detailSearchObject = {};
    this.dataTableColumn = dataTableColumn;
    this.adHistoryFactory = adHistoryFactory;
    this.dataTableService = dataTableService;
    this.detailsDataTableColumn = detailsDataTableColumn;
  }

  columns() {
    this.dataTableColumn[5].render = this.dataTableService.adTypeRender;
    this.dataTableColumn[2].render = this.dataTableService.mediaTypesRender;
    return this.dataTableColumn;
  }

  detailsColumns() {
    this.detailsDataTableColumn[3].render = this.dataTableService.timeRender;
    this.detailsDataTableColumn[4].render = this.dataTableService.timeRender;
    this.detailsDataTableColumn[2].render = this.dataTableService.mediaTypesRender;
    return this.detailsDataTableColumn;
  }

  // 搜索封装
  search(page, size = this.size, params = this.searchObject) {
    this.searchObject = params;
    return super.search(page, size, params);
  }

  // 历史详情初始化
  info(code) {
    if (code) { this.detailSearchObject = {resourceCode: code}; }
    else { this.detailSearchObject = {resourceCode: this.detailSearchObject.resourceCode}; }

    return this.detailsSearch(1, this.size);
  }

  getMachines(code) {
    let _this = this;
    this.adHistoryFactory.getMachines(code).then((children) => {
      return _this.globalNotice('toggleMachines', children);
    });
  }

  // 详情搜索
  detailsSearch(page, size = this.size, params) {
    let _this = this;
    this.detailSearchObject = angular.extend({}, this.detailSearchObject, params);

    return this.adHistoryFactory.detailsSearch(page, size, this.detailSearchObject).then((paging) => {
      return _this.globalNotice('detailsearch', paging);
    });
  }
 }

let dataTableColumn = [
  {data: 'resourceCode', title: '资源code'},
  {data: 'resourceName', title: '广告名称'},
  {data: 'resourceType', title: '资源类型'},
  {data: 'planTimes', title: '排期次数'},
  {data: 'duration', title: '排期总时间（天）'},
  {data: 'status', title: '当前状态'}
];

let detailsDataTableColumn = [
  {data: 'resourceCode', title: '资源CODE'},
  {data: 'resourceName', title: '资源名称'},
  {data: 'resourceType', title: '资源类型'},
  {data: 'planStartDate', title: '开始排期时间'},
  {data: 'planEndDate', title: '排期结束时间'},
  {data: 'duration', title: '排期时长(天)'}
];













