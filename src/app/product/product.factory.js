/**
 * 公司实体工厂
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class Product {
  constructor() {}
}
Product.mapping = {};
Product.futility = [];
Product.create = createObjectFn(Product);

export class ProductFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('product', Product, 'id', dataService);
  }

  // 封装一下映射关系
  getCombobox() {
    return super.getCombobox('sn', 'name');
  }
}