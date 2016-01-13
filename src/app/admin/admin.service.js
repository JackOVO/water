/**
 * 管理员服务
 */

import { BusinessFactory } from '../main/business.factory';

export class AdminService extends BusinessFactory {
  constructor($q, toastr, adminFactory) {
    'ngInject';
    super(toastr);

    this.$q = $q;
    this.admin = null; // 管理员
    this.adminFactory = adminFactory;
  }

  // 登录方法
  login(loginName, password) {
    let that = this;
    let admin = this.adminFactory.create(loginName, password);

    return this.adminFactory.query(admin, 'login').then((msg) => {
      if (msg.succes === true) {
        return msg.data;
      } else {
        return that.$q.reject(msg.content);
      }
    });
  }
}