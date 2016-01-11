/**
 * 管理员模块定义
 */

import { LoginController } from './login.controller';

angular
  .module('water.admin', [])
  .controller('LoginController', LoginController);