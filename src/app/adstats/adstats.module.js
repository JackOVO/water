/**
 * 广告统计
 */

import { AdStatsFactory } from './adstats.factory';
import { AdStatsService } from './adstats.service';
import { AdStatsController } from './adstats.controller';
import { DetailsController } from './details.controller';

angular
  .module('water.adstats', [])
  .service('adStatsFactory', AdStatsFactory)
  .service('adStatsService', AdStatsService)
  .controller('AdstatsController', AdStatsController)
  .controller('DetailsController', DetailsController);