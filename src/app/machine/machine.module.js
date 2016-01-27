/**
 * 机器模块定义
 */

import { MachineFactory } from './machine.factory';
import { MachineService } from './machine.service';
import { MachineController } from './machine.controller';
import { UserMachineController } from './usermachine.controller';

angular
  .module('water.machine', ['water.aisle', 'water.subject', 'water.store'])
  .service('machineFactory', MachineFactory)
  .service('machineService', MachineService)
  .controller('MachineController', MachineController)
  .controller('UserMachineController', UserMachineController);