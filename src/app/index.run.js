/**
 * 均加载完毕启动开始
 * 自定义模块配置
 */

export function runBlock($log, dataService) {
  'ngInject';

  // 数据服务配置
  dataService.setBaseUrl('http://localhost:5323/admin');
  dataService.setRequestMapping({
    user: {}
  });

  $log.debug('runBlock end');
}
