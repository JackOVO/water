/**
 * 权限(资源)模块
 */

import { ResourceFactory } from './resource.factory';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';

angular
  .module('water.resource', [])
  .service('resourceFactory', ResourceFactory)
  .service('resourceService', ResourceService)
  .controller('ResourceController', ResourceController);