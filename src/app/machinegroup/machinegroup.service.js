/**
 * 机器分组服务
 */

import { BusinessFactory } from '../main/business.factory';

export class MachineGroupService extends BusinessFactory {
  constructor(toastr,
    $rootScope,
    dialogService,
    machineGroupFactory,
    dataTableService) {
    'ngInject';

    super(toastr, $rootScope, dialogService, machineGroupFactory);
    this.dataTableColumns = dataTableColumns;
    this.dataTableService = dataTableService;
  }

  // 附加列处理
  columns() {
    return this.dataTableColumns;
  }
}

// 显示列定义
let dataTableColumns = [
  {data:'serNum', title: '编号'},
  {data:'name', title: '名称'},
  {data:'address', title: '地址'},
  {data:'latitude', title: '纬度'},
  {data:'longitude', title: '经度'},
  {data:'operateSubjectName', title: '经营主体'},
  {data:'type', title: '类型'},
  {data:'enableFlag', title: '启用状态'}
];