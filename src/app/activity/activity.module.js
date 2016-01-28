/**
 * 活动模块
 */

import { ActivityFactory } from './activity.factory';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';

angular
  .module('water.activity', [])
  .service('activityFactory', ActivityFactory)
  .service('activityService', ActivityService)
  .controller('ActivityController', ActivityController);