/**
 * 侧边栏模块(组件)
 */

import '../menu/menu.module'

import { SidebarController } from './sidebar.controller';

angular
  .module('water.sidebar', ['water.menu'])
  .controller('SidebarController', SidebarController);