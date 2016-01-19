/**
 * 用户实体工厂
 */

import { EntityFactory } from '../main/entity.factory';

class User {
  constructor() {}
}
User.mapping = {};
User.futility = [];
User.create = function(...args) {

  if (angular.isObject(args[0])) {
    var user = new User();
    for (let key in args[0]) {
      if (User.futility.indexOf(key) === -1) {
        user[key] = args[0][key];
      }
    }
    return user;
  }
};

export class UserFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('user', User, 'id', dataService);
  }
}