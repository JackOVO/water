/**
 * 机器分组
 */

import { MachineGroupFactory } from './machinegroup.factory';
import { MachineGroupService } from './machinegroup.service';
import { MachinegroupController } from './machinegroup.controller';

angular
  .module('water.machinegroup', [])
  .service('machineGroupFactory', MachineGroupFactory)
  .service('machineGroupService', MachineGroupService)
  .controller('MachinegroupController', MachinegroupController);