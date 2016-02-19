/**
 * 广告排期模块(没有广告资源选项?)
 */

import { AdPlanFactory } from './adplan.factory';
import { AdPlanService } from './adplan.service';
import { AdPlanController } from './adplan.controller';

angular
  .module('water.adplan', ['water.adresource', 'water.machine', 'water.machinegroup', 'water.adhistory'])
  .service('adPlanService', AdPlanService)
  .service('adPlanFactory', AdPlanFactory)
  .controller('AdplanController', AdPlanController);