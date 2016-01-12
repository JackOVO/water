/**
 * 管理员服务
 */

export class AdminService {
  constructor(adminFactory) {
    'ngInject';

    this.adminFactory = adminFactory;
  }

  login(name, password) {
    var admin = this.adminFactory.create(name, password);
console.log(admin);
    // this.adminFactory.query(admin);
  }
}