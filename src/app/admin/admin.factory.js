/**
 * 管理员工厂
 */

import { EntityFactory } from '../main/entity.factory';

// class BaseModel {
//   constructor(subClass, create) {
//     subClass.create = create;
//     // this.create = create;
//     // this.mapping = mapping;
//     // this.streamline = streamline;
//   }
// }

class Admin {
  constructor(name, password) {

    this.name = name;
    this.password = password;
  }
}
Admin.mapping = {
  name: 'loginName'
};

export class AddminFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('admin', Admin, 'code', dataService);
  }
}