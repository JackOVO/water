// 入口模块定义

import { config } from './index.config';
import { runBlock } from './index.run';
import { routerConfig } from './index.route';

import { DataService } from './main/data.service';
import { ErrorService } from './main/error.service';
import { GlobalService } from './main/global.service';
import { MainController } from './main/main.controller';

import './directive/directive.module'; // 指令模块
import './sidebar/sidebar.module'; // 侧边栏模块
import './admin/admin.module'; // 管理员模块
import './user/user.module'; // 用户模块

let rely = [
  'ui.router',
  'toastr',

  'water.directive',
  'water.sidebar',
  'water.admin',
  'water.user'
];

angular
  .module('water', rely)
  .config(routerConfig)
  .config(config)
  .run(runBlock)
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
