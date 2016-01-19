/**
 * 用户服务
 */

 import { BusinessFactory } from '../main/business.factory';

export class UserService extends BusinessFactory {
  constructor(toastr, $rootScope, userFactory, dataTableService) {
   'ngInject';

   super(toastr, $rootScope, userFactory, 2);
   this.dataTableService = dataTableService;
   this.dataTableColumns = dataTableColumns;
   this.dataTableColumnSpecific = dataTableColumnSpecific;
  }

  /**
   * 用户服务初始化
   * @return {[type]} [description]
   */
  init() {
    this.search(1);
  }

  // 附加列处理
  columns() {
    this.dataTableColumns[4].render = this.dataTableService.flagRender;
    return this.dataTableColumns;
  }
}

// 列定义
let dataTableColumns = [
  {data: 'userName', title: '用户名称'},
  {data: 'loginName', title: '登录名称'},
  {data: 'subjectName', title: '公司名称', orderable: false},
  {data: 'roleName', title: '角色名称', orderable: false},
  {data: 'enableFlag', title: '状态', orderable: false},
  {data: 'bandedWechat', title: '微信', orderable: false}
];

// 特殊列处理
let dataTableColumnSpecific = {
  5: ({userCode, bandedWechat, wechatInfo}) => {
    let button = {};
    if (bandedWechat === false) {
      button = {
        text: '绑定微信',
        action: `vm.bindWechat('${userCode}')`
      };
    } else {
      button = {
        type: 'a', text: `${wechatInfo}`,
        action: `vm.unBindWechat('${userCode}')`
      };
    }
    return button;
  }
};