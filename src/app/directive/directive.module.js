/**
 * 指令模块
 */

// adminTle相关指令模块
import './alte/alte.directive.module';

import { TableBoolsDirective } from './tabletools.directive';
import { SlimscrollDriective } from './slimscroll.directive';
import { DataTableDirective } from './datatable.directive';
import { ModalbodyDriective } from './modalbody.directive';
import { DataTableService } from './datatable.service';
import { UploadDirective } from './upload.directive';
import { zTreeDirective } from './ztree.directive';
import { iCheckDirective } from './icheck.directive';
import { DialogService } from './dialog.service';

angular
  .module('water.directive', ['water.directive.alte', 'ui.bootstrap.tpls', 'ui.bootstrap.tooltip', 'ui.bootstrap.datepicker'])
  .service('dataTableService', DataTableService)
  .service('dialogService', DialogService)
  .directive('ztree', zTreeDirective)
  .directive('upload', UploadDirective)
  .directive('icheck', iCheckDirective)
  .directive('datatable', DataTableDirective)
  .directive('modalBody', ModalbodyDriective)
  .directive('slimscroll', SlimscrollDriective)
  .directive('tableTools', TableBoolsDirective);