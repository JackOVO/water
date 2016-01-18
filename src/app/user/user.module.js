/**
 * 用户模块
 */

import { UserFactory } from './user.factory';
import { UserService } from './user.service';
import { UserController } from './user.controller';

angular
  .module('water.user', [])
  .service('userFactory', UserFactory)
  .service('userService', UserService)
  .controller('UserController', UserController);