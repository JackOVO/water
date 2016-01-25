/**
 * 全局控制服务
 */

export class GlobalService {
  constructor(userService, roleService, orderService, operateService) {
    'ngInject';

    this.us = userService;
    this.ro = roleService;
    this.order = orderService;
    this.operate = operateService;
  }

  /**
   * 特殊模块单页初始化数据
   * @param  {String} aim 目标
   * @return {[type]}     [description]
   */
  initPageDataByAction(aim) {
    switch(aim) {
      case 'user': this.us.init(); break;
      case 'role': this.ro.init(); break;
    }
  }

  refreshListByAction(aim, page) {
    switch(aim) {
      case 'order': this.order.search(page); break;
      case 'operate': this.operate.search(page); break;
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