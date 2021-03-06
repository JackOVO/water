/**
 * 指令模块
 */

// adminTle相关指令模块
import './alte/alte.directive.module';

import { iCheckDirective, iCheckGroupDirective } from './icheck.directive';
import { TableBoolsDirective } from './tabletools.directive';
import { SlimscrollDriective } from './slimscroll.directive';
import { DataTableDirective } from './datatable.directive';
import { ModalbodyDriective } from './modalbody.directive';
import { EchartsDirective } from './echarts.directive';
import { DataTableService } from './datatable.service';
import { UploadDirective } from './upload.directive';
import { zTreeDirective } from './ztree.directive';
import { DialogService } from './dialog.service';

angular
  .module('water.directive', ['water.directive.alte', 'ui.bootstrap.tpls', 'ui.bootstrap.tooltip', 'ui.bootstrap.datepicker'])
  .service('dataTableService', DataTableService)
  .service('dialogService', DialogService)
  .directive('ztree', zTreeDirective)
  .directive('upload', UploadDirective)
  .directive('icheck', iCheckDirective)
  .directive('echarts', EchartsDirective)
  .directive('datatable', DataTableDirective)
  .directive('modalBody', ModalbodyDriective)
  .directive('slimscroll', SlimscrollDriective)
  .directive('checkgroup', iCheckGroupDirective)
  .directive('tableTools', TableBoolsDirective);