/**
 * 均加载完毕启动开始
 * 自定义模块配置
 */

export function runBlock($log, dataService, menuService) {
  'ngInject';

  // 数据服务配置
  // dataService.setBaseUrl('/admin');
  dataService.setBaseUrl('http://localhost:5324/admin');
  dataService.setRequestMapping({
    menu: {
      prefix: '',
      tree: 'menus',
      all: 'menus'
    },
    admin: {
      base: 'http://localhost:5324',
      // base: '',
      prefix: '',
      login: 'login',
      signout: 'logout',
      baseInfo: {aim: 'subject', action: 'my'}
      // machineOperation/deleteAisle.do`
    },
    // 用户
    user: {
      wechatQR: 'generateWechatAuthQRCode',
      unWechatQR: 'unbindWechatAccount',
      updMachine: 'modifyUserMachineResource'
    },
    // 公司
    subject: {
      my: 'my',
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
      treeByUserCode: 'listTreeVM',
      combobox: 'findVendingMachineAll',
      byAdPlanCode: 'findMachineByAdUserPlanId'
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
    order: {
      download: 'download'
    },
    // 商品
    product: {
      combobox: 'findAll'
    },
    // 日志
    log: {
      prefix: 'machineProductLog',
      list: 'srv_machine_goods_replenish_log'
    },
    // 统计
    statistics: {
      prefix: 'salestats',
      byProduct: 'getOfftake',
      byMachine: 'getOrderCountPage',
      byPDdownload: 'download_1',
      byMDownload: 'download_2'
    },
    // 点位
    store: {
      combobox: 'findStoreAll'
    },
    // 资源(权限)
    resource: {
      prefix: 'res', // /listRes.do
      tree: 'listRes'
    },
    // 活动推广
    activity: {
      prefix: 'promotion/wechat'
    },
    // 推广统计
    stats: {
      prefix: 'promotion/wechat/stats',
      download: 'download.do'
    },
    // app推广
    app: {
      prefix: 'promotion/app'
    },
    // 广告资源
    adresource: {
      prefix: 'adResource',
      combobox: 'findAll'
    },
    // 广告排期
    adplan: {
      prefix: 'adSysPlan',
      findMachines: 'findMachines',
      byAdPlanCode: {aim: 'machine', action: 'byAdPlanCode'}
    },
    // 广告历史
    adhistory: {
      prefix: 'adSysPlan/history'
    },
    // 广告统计
    adstats: {
      prefix: 'adResourceStats',
      summary: 'findByCondition',
      download: 'downLoadAdResourceStatsCount'
    },
    machinegroup: {
      prefix: 'machinegroup',
      combobox: 'listGroups',
      machineTree: 'listMachinesWithTree',
      updMachineTree: 'modifyMachinesInTheGroup'
    }
  });

  // 菜单映射key
  menuService.setMenuKeyMapping({
    'admin:interactionAdsMgr:wechatSpreadMgr': 'activity',
    'admin:machineMgr:machinegroup': 'machinegroup',
    'admin:systemMgr:resourceMaintain': 'resource',
    'admin:machineMgr:machineMaintain': 'machine',
    'admin:interactionAdsMgr:appSpreadMgr': 'app',
    'admin:staticAds:adResourceMgr': 'adresource',
    'admin:staticAds:adResourceStats': 'adstats',
    'admin:subjectMgr:companyMgr': 'subject',
    'admin:storeMgr:storeMaintain': 'store',
    'admin:shopMgr:saleStats': 'statistics',
    'admin:shopMgr:machineOpr': 'operate',
    'admin:staticAds:adPlanMgr': 'adplan',
    'admin:shopMgr:goodsMgr': 'product',
    'admin:user:baseInfo': 'baseInfo',
    'admin:shopMgr:orderMgr': 'order',
    'admin:user:userMgr': 'user',
    'admin:user:roleMgr': 'role'
  });

  // 扩展格式化
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
