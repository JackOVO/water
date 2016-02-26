/**
 * 公司实体工厂
 */

import { createObjectFn, Message } from '../main/model';
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

    super('product', Product, 'productSn', dataService);
    this.dataService = dataService;
  }

  // 封装一下映射关系
  getCombobox(params) {
    return super.getCombobox('sn', 'name', params);
  }

  // 添加上传封装
  add(entity, uploadFn) {
    if (typeof(uploadFn) === 'undefined') {
      return super.add(entity);
    } else {
      return this.dataService.upload(this.aim, 'add', entity, uploadFn)
        .then(({success, message}) => {
          return new Message(success, message);
      });
    }
  }

  // 修改上传封装
  upd(entity, uploadFn) {
    if (typeof(uploadFn) === 'undefined') {
      return super.update(entity);
    } else {
      return this.dataService.upload(this.aim, 'upd', entity, uploadFn)
        .then(({success, message}) => {
          return new Message(success, message);
      });
    }
  }
}