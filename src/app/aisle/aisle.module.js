/**
 * 货道模块
 */

import { AisleFactory } from './aisle.factory';
import { AisleService } from './aisle.service';
import { AisleController } from './aisle.controller';

angular
  .module('water.aisle', [])
  .service('aisleFactory', AisleFactory)
  .service('aisleService', AisleService)
  .controller('AisleController', AisleController);