/**
 * 用户模块
 */

import { UserFactory } from './user.factory';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import '../subject/subject.module';
import '../role/role.module';

angular
  .module('water.user', ['water.subject', 'water.role', 'water.status'])
  .service('userFactory', UserFactory)
  .service('userService', UserService)
  .controller('UserController', UserController);