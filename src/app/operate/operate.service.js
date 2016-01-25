/**
 * 运营服务
 */

import { BusinessFactory } from '../main/business.factory';

export class OperateService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, operateFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, operateFactory, 1);
    this.dataTableColumns = dataTableColumns;
  }
}

let dataTableColumns = [
  {data: 'serNum', title: '机器编号'},
  {data: 'name', title: '机器名称'},
  {data: 'address', title: '所在点位地址'},
  {data: 'onlineStatus', title: '在线状态'},
  {data: 'temp', title: '温度'},
  {data: 'aisleStatus', title: '货道状态'}
];