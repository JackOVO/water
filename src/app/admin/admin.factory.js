/**
 * 管理员工厂
 */

import { EntityFactory } from '../main/entity.factory';

class Admin {
  constructor(code, name, loginName, password) {
    this.code = code;
    this.name = name;
    this.password = password;
    this.loginName = loginName;
  }
}
Admin.mapping = {};
Admin.create = function(...args) {
  let length = args.length;

  if (angular.isObject(args[0])) {
    let admin = new Admin();
    for (let key in args[0]) { admin[key] = args[0][key]; }
    return admin;
  }

  switch(length) {
    case 2: return new Admin(null, null, args[0], args[1]);
    default: return new Admin(args[0], args[1], args[2], args[3]);
  }
};

export class AddminFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('admin', Admin, 'code', dataService);
  }
}