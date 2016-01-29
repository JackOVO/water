/**
 * 活动用户统计
 */

import { createObjectFn, Message } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class App {
  constructor() {}
}
App.mapping = {};
App.futility = [];
App.create =  createObjectFn(App);

export class AppFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('app', App, 'activityCode', dataService);
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
      return super.add(entity);
    } else {
      return this.dataService.upload(this.aim, 'upd', entity, uploadFn)
        .then(({success, message}) => {
          return new Message(success, message);
      });
    }
  }
}