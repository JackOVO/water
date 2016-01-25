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
      tree: 'menus',
      all: 'menus'
    },
    // 用户
    user: {
      wechatQR: 'generateWechatAuthQRCode',
      unWechatQR: 'unbindWechatAccount',
      updMachine: 'modifyUserMachineResource'
    },
    // 公司
    subject: {
      combobox: 'subjectList'
    },
    // 角色
    role: {
      // comboboxBySubjectCode: 'findBySubject'
      tree: 'findRoleResource',
      combobox: 'findBySubject',
      updCompetence: 'modifyRoleResource'
    },
    // 机器
    machine: {
      prefix: 'vendingmachine',
      treeByUserCode: 'listTreeVM'
    },
    // 权限
    competence: {
      // 后台api模块划分不明确
      treeByRoleCode: {aim: 'role', action: 'tree'}
    },
    // 运营
    operate: {
      prefix: 'machineOperation'
    },
    // 订单
    order: {},
    admin: {
      prefix: '',
      login: 'login',
      base: 'http://localhost:5324'
    }
  });

  // 菜单映射key
  menuService.setMenuKeyMapping({
    'admin:shopMgr:machineOpr': 'operate',
    'admin:shopMgr:orderMgr': 'order',
    'admin:user:baseInfo': 'baseInfo',
    'admin:user:userMgr': 'user',
    'admin:user:roleMgr': 'role'
  });

  $log.debug('服务, 开!');
}
