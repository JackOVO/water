/**
 * 管理员模块定义
 */

import { AddminFactory } from './admin.factory';
import { AdminService } from './admin.service';
import { LoginController } from './login.controller';

angular
  .module('water.admin', [])
  .service('adminFactory', AddminFactory)
  .service('adminService', AdminService)
  .controller('LoginController', LoginController);