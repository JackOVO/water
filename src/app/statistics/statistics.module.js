/**
 * 统计模块
 */

import { StatisticsFactory } from './statistics.factory';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';

angular
  .module('water.statistics', [])
  .service('statisticsFactory', StatisticsFactory)
  .service('statisticsService', StatisticsService)
  .controller('StatisticsController', StatisticsController);