/**
 * 指令模块
 */

// adminTle相关指令模块
import './alte/alte.directive.module';

import { DataTableDirective } from './datatable.directive';

angular
  .module('water.directive', ['water.directive.alte'])
  .directive('datatable', DataTableDirective);