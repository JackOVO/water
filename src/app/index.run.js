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
      prefix: 'machineOperation',
      deleteAisle: 'deleteAisle',
      updateAisle: 'updateAisle',
      aisleList: 'listAisle',
      addAisle: 'addAisle',
      getAisle: 'find'
    },
    // 货道
    aisle: {
      combobox: {aim: 'operate', action: 'aisleList'},
      upd: {aim: 'operate', action: 'updateAisle'},
      del: {aim: 'operate', action: 'deleteAisle'},
      all: {aim: 'operate', action: 'aisleList'},
      add: {aim: 'operate', action: 'addAisle'},
      get: {aim: 'operate', action: 'getAisle'}
    },
    // 订单
    order: {},
    // 商品
    product: {
      'combobox': 'findAll'
    },
    // 日志
    log: {
      prefix: 'machineProductLog',
      list: 'srv_machine_goods_replenish_log'
    },
    admin: {
      prefix: '',
      login: 'login',
      base: 'http://localhost:5324'
      // machineOperation/deleteAisle.do
    }
  });

  // 菜单映射key
  menuService.setMenuKeyMapping({
    'admin:shopMgr:machineOpr': 'operate',
    'admin:shopMgr:goodsMgr': 'product',
    'admin:shopMgr:orderMgr': 'order',
    'admin:user:baseInfo': 'baseInfo',
    'admin:user:userMgr': 'user',
    'admin:user:roleMgr': 'role'
  });

  Date.prototype.format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  };

  $log.debug('服务, 开!');
}
