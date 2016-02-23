// 入口模块定义

import { config } from './index.config';
import { runBlock } from './index.run';
import { routerConfig } from './index.route';

import { DataService } from './main/data.service';
import { ErrorService } from './main/error.service';
import { GlobalService } from './main/global.service';
import { MainController } from './main/main.controller';

import { PassWordFilter } from './main/filters';

import './status/status.module'; // 状态类数据模块

import './machinegroup/machinegroup.module'; // 机器组模块
import './adresource/adresource.module';     // 广告资源模块
import './competence/competence.module';     // 权限模块
import './statistics/statistics.module';     // 统计模块
import './adhistory/adhistory.module';       // 广告历史模块
import './directive/directive.module';       // 指令模块
import './resource/resource.module';         // 权限(资源)模块
import './activity/activity.module';         // 活动模块
import './sidebar/sidebar.module';           // 侧边栏模块
import './operate/operate.module';           // 运营模块
import './subject/subject.module';           // 公司模块
import './machine/machine.module';           // 机器模块
import './product/product.module';           // 商品模块
import './adstats/adstats.module';           // 广告统计模块
import './adplan/adplan.module';             // 广告排期模块
import './admin/admin.module';               // 管理员模块
import './order/order.module';               // 订单模块
import './aisle/aisle.module';               // 货道模块
import './store/store.module';               // 点位模块
import './stats/stats.module';               // 统计模块
import './user/user.module';                 // 用户模块
import './role/role.module';                 // 角色模块
import './log/log.module';                   // 日志模块
import './app/app.module';                   // app推广模块


import './index.locale'; // 本地化

let rely = [
  'ngSanitize',
  'ui.router',
  'ngCookies',
  'ui.select',
  'ngDialog',
  'toastr',

  'water.statistics',
  'water.adresource',
  'water.adhistory',
  'water.directive',
  'water.activity',
  'water.resource',
  'water.sidebar',
  'water.operate',
  'water.adstats',
  'water.adplan',
  'water.status',
  'water.store',
  'water.admin',
  'water.order',
  'water.user',
  'water.app',
  'ngLocale'
];

angular
  .module('water', rely)
  .config(routerConfig)
  .config(config)
  .run(runBlock)
  .filter('pwd', () => PassWordFilter)
  .service('dataService', DataService)
  .service('errorService', ErrorService)
  .service('globalService', GlobalService)
  .controller('MainController', MainController);



// /* global malarkey:false, moment:false */

// 
// import { routerConfig } from './index.route';
// 
// import { MainController } from './main/main.controller';
// import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
// import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
// import { NavbarDirective } from '../app/components/navbar/navbar.directive';
// import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

// angular.module('water', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'mm.foundation', 'toastr'])
//   .constant('malarkey', malarkey)
//   .constant('moment', moment)
//   
//   .config(routerConfig)
//   .run(runBlock)
//   .service('githubContributor', GithubContributorService)
//   .service('webDevTec', WebDevTecService)
//   .controller('MainController', MainController)
//   .directive('acmeNavbar', NavbarDirective)
//   .directive('acmeMalarkey', MalarkeyDirective);
