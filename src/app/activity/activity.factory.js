/**
 * 活动实体工厂
 */

import { createObjectFn, Message } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class Activity {
  constructor() {
    this.activityType = 1;
    this.activityBeginTime = new Date();
    this.activityEndTime = new Date();
  }
}
Activity.mapping = {};
Activity.futility = [];
Activity.create =  createObjectFn(Activity);

export class ActivityFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('activity', Activity, 'activityCode', dataService);
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