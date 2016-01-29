/**
 * 广告资源实体工厂
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class AdResource {
  constructor() {}
}
AdResource.mapping = {};
AdResource.futility = [];
AdResource.create =  createObjectFn(AdResource);

export class AdresourceFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('adresource', AdResource, 'adResourceCode', dataService);
  }
}