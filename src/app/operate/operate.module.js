/**
 * 运营模块
 */

import { OperateFactory } from './operate.factory';
import { OperateService } from './operate.service';
import { OperateController } from './operate.controller';

angular
  .module('water.operate', [])
  .service('operateFactory', OperateFactory)
  .service('operateService', OperateService)
  .controller('OperateController', OperateController);