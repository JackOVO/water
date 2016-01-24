/**
 * 用户模块
 */

import { UserFactory } from './user.factory';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import '../machine/machine.module';
import '../subject/subject.module';
import '../role/role.module';

angular
  .module('water.user', ['water.subject', 'water.role', 'water.machine', 'water.status'])
  .service('userFactory', UserFactory)
  .service('userService', UserService)
  .controller('UserController', UserController);