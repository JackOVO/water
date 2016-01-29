/**
 * 活动用户统计
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class Stats {
  constructor() {}
}
Stats.mapping = {};
Stats.futility = [];
Stats.create =  createObjectFn(Stats);

export class StatsFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('stats', Stats, 'id', dataService);
  }
}