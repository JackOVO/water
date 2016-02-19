/**
 * 广告历史实体工厂
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class AdPlan {
 constructor() {
  this.type = 0; // 关联类型
  this.codes = [];
  this.machineCodes = [];
 }
}
AdPlan.mapping = {};
AdPlan.futility = [];
AdPlan.create =  createObjectFn(AdPlan);

export class AdHistoryFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('adhistory', AdPlan, 'id', dataService);
  }
}