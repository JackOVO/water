/**
 * 公司实体工厂
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class Operate {
  constructor() {}
}
Operate.mapping = {};
Operate.futility = [];
Operate.create = createObjectFn(Operate);

export class OperateFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('operate', Operate, 'id', dataService);
  }
}