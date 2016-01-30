/**
 * 广告资源实体工厂
 */

import { createObjectFn, Message } from '../main/model';
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
    this.dataService = dataService;
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