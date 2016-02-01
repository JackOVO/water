/**
 * 广告资源实体工厂
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class AdPlan {
 constructor() {
   this.machineCodes = [];
 }
}
AdPlan.mapping = {};
AdPlan.futility = [];
AdPlan.create =  createObjectFn(AdPlan);

export class AdPlanFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('adplan', AdPlan, 'adSysPlanCode', dataService);
  }

  // 选中封装
  getById(code) {
    let ck = this.query({'adUserPlanCode': code}, 'byAdPlanCode', (cks) => {
      return cks;
    });
    return super.getById(code).then((adplan) => {
      ck.then((checkeds) => {
        adplan.machineCodes = checkeds;
      });
      return adplan;
    });
  }
}