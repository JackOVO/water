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

  /**
   * 分页下载
   * @param  {Number} page   页码
   * @param  {Number} size   每页显示数
   * @param  {Object} params 请求参数
   */
  download(page, size, params) {
    params = angular.extend({pageSize: size, pageNumber: page}, params);
    return super.download(params);
  }
}