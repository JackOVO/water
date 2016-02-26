/**
 * 广告历史实体工厂
 */

import { createObjectFn, Paging } from '../main/model';
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
    this.dataService = dataService;
  }

  // 获取机器
  getMachines(code) {
    let params = {'planCode': code};
    return super.query(params, 'findMchines', 'packArray');
  }

  // 详情搜索
  detailsSearch(page, size, options) {
    let _this = this,
        aim = this.aim;
    options = angular.extend({pageSize: size, pageNumber: page}, options);

    if (typeof(options.order) !== 'undefined') {
      options.orderProperty = options.order.pro;
      options.orderDirection = options.order.dir;
      delete options.order;
    }

    return this.dataService.get(aim, 'details', options).then((res) => {
      let paging = new Paging([], page, size, res.total);
      paging.data = _this.packArray(res.rows);

      return paging;
    });
  }
}