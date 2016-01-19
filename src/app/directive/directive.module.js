/**
 * 指令模块
 */

// adminTle相关指令模块
import './alte/alte.directive.module';

import { DataTableDirective } from './datatable.directive';
import { DataTableService } from './datatable.service';

angular
  .module('water.directive', ['water.directive.alte'])
  .service('dataTableService', DataTableService)
  .directive('datatable', DataTableDirective);