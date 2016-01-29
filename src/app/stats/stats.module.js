/**
 * 活动用户统计
 */

import { StatsFactory } from './stats.factory';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';

angular
  .module('water.stats', [])
  .service('statsFactory', StatsFactory)
  .service('statsService', StatsService)
  .controller('StatsController', StatsController);