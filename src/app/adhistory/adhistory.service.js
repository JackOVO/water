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
    this.dataTableCloum = dataTableCloum;
    this.dataTableService = dataTableService;
  }

  columns() {
    this.dataTableCloum[2].render = this.dataTableService.timeRender;
    this.dataTableCloum[3].render = this.dataTableService.timeRender;
    this.dataTableCloum[4].render = this.dataTableService.adTypeRender;
    this.dataTableCloum[5].render = this.dataTableService.enableflagRender;
    return this.dataTableCloum;
  }
 }

let dataTableCloum = [
  {data: 'adUserPlanCode', title: '资源code'},
  {data: 'resourceName', title: '广告名称'},
  {data: 'startTime', title: '广告开始时间'},
  {data: 'endTime', title: '广告结束时间'},
  {data: 'status', title: '广告状态'},
  {data: 'enableFlag', title: '启用状态'}
];