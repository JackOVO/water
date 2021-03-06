/**
 * 依赖模块常量配置
 */

export function config($logProvider, toastrConfig) {
  'ngInject';

  // Enable log
  $logProvider.debugEnabled(true);

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-bottom-right';
  // toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;
}
