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

import './competence/competence.module'; // 权限模块
import './directive/directive.module'; // 指令模块
import './sidebar/sidebar.module'; // 侧边栏模块
import './operate/operate.module'; // 运营模块
import './subject/subject.module'; // 公司模块
import './machine/machine.module'; // 机器模块
import './product/product.module'; // 商品模块
import './admin/admin.module'; // 管理员模块
import './order/order.module'; // 订单模块
import './aisle/aisle.module'; // 货道模块
import './user/user.module'; // 用户模块
import './role/role.module'; // 角色模块
import './log/log.module'; // 日志模块

let rely = [
  'ngSanitize',
  'ui.router',
  'ui.select',
  'ngDialog',
  'toastr',

  'ui.bootstrap.tpls',
  'ui.bootstrap.tooltip',

  'water.directive',
  'water.sidebar',
  'water.operate',
  'water.status',
  'water.admin',
  'water.order',
  'water.user'
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
