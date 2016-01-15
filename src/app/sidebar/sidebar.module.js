/**
 * 侧边栏模块(组件)
 */

import { SidebarController } from './sidebar.controller';

angular
  .module('water.sidebar', [])
  .controller('SidebarController', SidebarController);