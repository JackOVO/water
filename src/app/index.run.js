/**
 * 均加载完毕启动开始
 * 自定义模块配置
 */

export function runBlock($log, dataService, menuService) {
  'ngInject';

  // 数据服务配置
  dataService.setBaseUrl('http://localhost:5324/admin');
  dataService.setRequestMapping({
    menu: {
      prefix: '',
      all: 'menus'
    },
    user: {
      add: 'add',
      unWechatQR: 'unbindWechatAccount',
      wechatQR: 'generateWechatAuthQRCode'
    },
    subject: {
      all: 'subjectList'
    },
    role: {
      findBy: 'findBySubject'
    },
    admin: {
      prefix: '',
      login: 'login',
      base: 'http://localhost:5324'
    }
  });

  // 菜单映射key
  menuService.setMenuKeyMapping({
    'admin:user:baseInfo': 'baseInfo',
    'admin:user:userMgr': 'user'
  });

  $log.debug('runBlock end');
}
