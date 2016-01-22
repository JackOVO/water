/**
 * 状态模块, 暂时提供状态类数据, 静态
 */

import { StatusService } from './status.service';

angular
  .module('water.status', [])
  .service('statusService', StatusService);