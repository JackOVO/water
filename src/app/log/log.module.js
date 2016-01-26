/**
 * 运营模块
 */

import { LogFactory } from './log.factory';
import { LogService } from './log.service';
import { LogController } from './log.controller';

angular
  .module('water.log', ['water.product', 'water.aisle'])
  .service('logFactory', LogFactory)
  .service('logService', LogService)
  .controller('LogController', LogController);