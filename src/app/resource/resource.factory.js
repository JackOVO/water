/**
 * 权限(资源)实体工厂
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class Resource {
 constructor() {}
}
Resource.mapping = {};
Resource.futility = ['url', 'parentId'];
Resource.create =  createObjectFn(Resource);

export class ResourceFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('resource', Resource, 'resourceCode', dataService);
  }

  // 获取树
  getTree() {
    return super.query({}, 'tree', 'packTree');
  }
}