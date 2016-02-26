/**
 * 广告历史模块
 */

import { AdHistoryFactory } from './adhistory.factory';
import { AdHistoryService } from './adhistory.service';
import { AdHistoryController } from './adhistory.controller';
import { AdhistoryDetailsController } from './adhistory.details.controller';

angular
  .module('water.adhistory', [])
  .service('adHistoryFactory', AdHistoryFactory)
  .service('adHistoryService', AdHistoryService)
  .controller('AdhistoryController', AdHistoryController)
  .controller('AdhistoryDetailsController', AdhistoryDetailsController);