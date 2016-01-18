/**
 * 用户实体工厂
 */

import { BusinessFactory } from '../main/business.factory';

class User {
  constructor() {

  }
}

export class UserFactory extends BusinessFactory {
  constructor(dataService) {
    'ngInject';

    super('user', User, 'id', dataService);
  }
}