/**
 * 管理员服务
 */

import { BusinessFactory } from '../main/business.factory';

export class AdminService extends BusinessFactory {
  constructor(toastr, $state, $q, $rootScope, dialogService, dataService, adminFactory) {
    'ngInject';
    super(toastr, $rootScope, dialogService, adminFactory);

    this.$q = $q;
    this.admin = dataService.getLocal('admin'); // 管理员
    this.$state = $state;
    this.dataService = dataService;
    this.adminFactory = adminFactory;
  }

  // 登录用户基本信息
  getBaseInfo() {
    let _this = this;
    return this.adminFactory.getBaseInfo().then((info) => {
      return _this.globalNotice('info', info);
    });
  }

  // 登录方法
  login(loginName, password) {
    let that = this;
    let admin = this.adminFactory.create(loginName, password);

    return this.dataService.post('admin', 'login', admin).then((msg) => {
      if (msg.success === true) {
        that.admin = msg.data;
        that.globalNotice('login', that.admin);

        this.dataService.setLocal('admin', that.admin);
        return that.admin;
      } else {
        return that.$q.reject(msg.content);
      }
    });
  }

  // 登出
  signout() {
    let _this = this;
    return this.adminFactory.signout().then(() => {
      _this.$state.go('login');
    });
  }
}