/**
 * adminLTE指令定义
 */

// 布局指令定义
import * as alte from './alte.layout.directive';

angular
  .module('water.directive.alte', [])
  .directive('alteLayout', alte.WrapperDriective)
  .directive('alteHeader', alte.HeaderDriective)
  .directive('alteTooggleBtn', alte.toggleBtnDriective)
  .directive('alteSidebar', alte.SidebarDriective)
  .directive('alteFooter', alte.FooterDriective);

