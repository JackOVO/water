/**
 * 机器模块定义
 */

import { MachineFactory } from './machine.factory';
import { MachineService } from './machine.service';
import { UserMachineController } from './usermachine.controller';

angular
  .module('water.machine', [])
  .service('machineFactory', MachineFactory)
  .service('machineService', MachineService)
  .controller('UserMachineController', UserMachineController);