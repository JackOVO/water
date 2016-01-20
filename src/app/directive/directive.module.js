/**
 * 指令模块
 */

// adminTle相关指令模块
import './alte/alte.directive.module';

import { DataTableDirective } from './datatable.directive';
import { ModalbodyDriective } from './modalbody.directive';
import { DataTableService } from './datatable.service';
import { DialogService } from './dialog.service';

angular
  .module('water.directive', ['water.directive.alte'])
  .service('dataTableService', DataTableService)
  .service('dialogService', DialogService)
  .directive('datatable', DataTableDirective)
  .directive('modalBody', ModalbodyDriective);