/**
 * 角色实体工厂
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class Role {
  constructor() {}
}
Role.mapping = {};
Role.futility = [];
Role.create =  createObjectFn(Role);

export class RoleFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('role', Role, 'id', dataService);
  }
}