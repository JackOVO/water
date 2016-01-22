/**
 * 角色模块
 */

import { RoleFactory } from './role.factory';
import { RoleService } from './role.service';

angular
  .module('water.role', [])
  .service('roleFactory', RoleFactory)
  .service('roleService', RoleService);