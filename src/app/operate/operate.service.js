/**
 * 运营服务
 */

import { BusinessFactory } from '../main/business.factory';

export class OperateService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, operateFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, operateFactory);
    this.searchObject = {}; // 搜索添加缓存分页用
    this.dataTableColumns = dataTableColumns;
  }

  // 初始化, 清空搜索条件
  init(page) {
    this.search(page, this.size, {});
  }

  // 搜索条件保存
  search(page, size = this.size, params = this.searchObject) {
    this.searchObject = params;
    return super.search(page, size, params);
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