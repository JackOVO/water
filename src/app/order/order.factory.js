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

  /**
   * 分页下载
   * @param  {Number} page   页码
   * @param  {Number} size   每页显示数
   * @param  {Object} params 请求参数
   */
  download(page, size, params) {
    if (!isEmptyObject(params)) {
      params = angular.extend({pageSize: size, pageNumber: page}, params);
    }
    return super.download(params);
  }
}

function isEmptyObject(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}