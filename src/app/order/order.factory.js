/**
 * 公司实体工厂
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class Order {
  constructor() {}
}
Order.mapping = {};
Order.futility = [];
Order.create = createObjectFn(Order);

export class OrderFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('order', Order, 'id', dataService);
  }
}