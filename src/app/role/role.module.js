/**
 * 角色模块
 */

import { RoleFactory } from './role.factory';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

angular
  .module('water.role', ['water.subject', 'water.status', 'water.competence'])
  .service('roleFactory', RoleFactory)
  .service('roleService', RoleService)
  .controller('RoleController', RoleController);