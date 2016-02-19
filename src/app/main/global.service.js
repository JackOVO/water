/**
 * 全局控制服务
 */

export class GlobalService {
  constructor(
    logService,
    appService,
    userService,
    roleService,
    orderService,
    adminService,
    storeService,
    aisleService,
    statsService,
    adPlanService,
    operateService,
    productService,
    machineService,
    subjectService,
    resourceService,
    activityService,
    adHistoryService,
    adresourceService,
    statisticsService) {
    
    'ngInject';

    this.us = userService;
    this.ro = roleService;
    this.log = logService;
    this.app = appService;
    this.stats = statsService;
    this.store = storeService;
    this.order = orderService;
    this.admin = adminService;
    this.aisle = aisleService;
    this.adplan = adPlanService;
    this.operate = operateService;
    this.product = productService;
    this.machine = machineService;
    this.subject = subjectService;
    this.activity = activityService;
    this.resource = resourceService;
    this.adhistory = adHistoryService;
    this.adresource = adresourceService;
    this.statistics = statisticsService;
  }

  /**
   * 特殊模块单页初始化数据
   * @param  {String} aim 目标
   */
  initPageDataByAction(aim) {
    switch(aim) {
      case 'user': this.us.init(); break;
      case 'role': this.ro.init(); break;
      case 'resource': this.resource.init(); break;
      case 'adplan': this.adplan.search(1); break;
      case 'statistics': this.statistics.init(); break;
      case 'baseInfo': this.admin.getBaseInfo(); break;
    }
  }

  /**
   * 刷新列表类数据
   * @param  {String} aim  目标
   * @param  {String} id   查询的唯一属性值
   */
  refreshListByAction(aim, page) {
    switch(aim) {
      case 'app': this.app.search(page); break;
      case 'order': this.order.init(page); break;
      case 'store': this.store.search(page); break;
      // case 'adplan': this.adplan.search(page); break;
      case 'operate': this.operate.init(page); break;
      case 'machine': this.machine.search(page); break;
      case 'product': this.product.search(page); break;
      case 'subject': this.subject.search(page); break;
      case 'activity': this.activity.search(page); break;
      case 'adhistory': this.adhistory.search(page); break;
      case 'adresource': this.adresource.search(page); break;
    }
  }

  /**
   * 刷新子项的列表类数据
   * @param  {String} aim  目标
   * @param  {String} id   查询的唯一属性值
   * @param  {Number} page 可选页码
   */
  refreshChildListByAction(aim, id) {
    switch(aim) {
      case 'log': this.log.init(id); break;
      case 'stats': this.stats.init(id); break;
      case 'aisle': this.aisle.getAll(id); break;
    }
  }
}

// export class GlobalService {
//   constructor($state, userService, projectService, investService, bannerService) {
//     'ngInject';
//     this.$state = $state;
//     this.userService = userService;
//     this.bannerService = bannerService;
//     this.investService = investService;
//     this.projectService = projectService;
//   }

  
//     变更路由状态参数
//     @param  {String} state  状态名
//     @param  {Object} params 参数对象
   
//   changeRouteState(state, params) {
//      {notifyfalse, reloadfalse}
//     this.$state.go(state, params);
//   }

  
//     根据业务名刷新列表
//     @param  {String} action 请求名
//     @param  {Number} page   页码
   
//   refreshListByAction(action, page) {
//     switch(action) {
//       case 'user' this.userService.getList(page); break;
//       case 'invest' this.investService.getList(page); break;
//       case 'project' this.projectService.getList(page); break;
//     }
//   }

  
//     特殊模块单页初始化数据
//     @return {[type]}        [description]
   
//   initPageDataByAction(action) {
//     switch(action) {
//       case 'banner' this.bannerService.getAll(); break;
//     }
//   }
// }