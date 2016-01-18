/**
 * 右侧主要菜单模块
 */

import { MenuFactory } from './menu.factory';
import { MenuService } from './menu.service';

angular
  .module('water.menu', [])
  .service('menuFactory', MenuFactory)
  .service('menuService', MenuService);