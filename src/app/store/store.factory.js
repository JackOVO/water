/**
 * 点位实体工厂
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class Store {
  constructor() {}
}
Store.mapping = {};
Store.futility = [];
Store.create =  createObjectFn(Store);

export class StoreFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('store', Store, 'storeCode', dataService);
  }

  // 封装一下映射关系
  getCombobox() {
    return super.getCombobox('code', 'name');
  }
}