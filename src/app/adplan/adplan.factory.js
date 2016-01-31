/**
 * 广告资源实体工厂
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class AdPlan {
 constructor() {}
}
AdPlan.mapping = {};
AdPlan.futility = [];
AdPlan.create =  createObjectFn(AdPlan);

export class AdPlanFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('adplan', AdPlan, 'adSysPlanCode', dataService);
  }
}