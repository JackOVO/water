// 入口模块定义

import { routerConfig } from './index.route';

import { DataService } from './main/data.service';
import { MainController } from './main/main.controller';

let rely = [
  'ui.router'
];

angular
  .module('water', rely)
  .config(routerConfig)
  .controller('MainController', MainController)
  .service('dataService', DataService);


// /* global malarkey:false, moment:false */

// import { config } from './index.config';
// import { routerConfig } from './index.route';
// import { runBlock } from './index.run';
// import { MainController } from './main/main.controller';
// import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
// import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
// import { NavbarDirective } from '../app/components/navbar/navbar.directive';
// import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

// angular.module('water', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'mm.foundation', 'toastr'])
//   .constant('malarkey', malarkey)
//   .constant('moment', moment)
//   .config(config)
//   .config(routerConfig)
//   .run(runBlock)
//   .service('githubContributor', GithubContributorService)
//   .service('webDevTec', WebDevTecService)
//   .controller('MainController', MainController)
//   .directive('acmeNavbar', NavbarDirective)
//   .directive('acmeMalarkey', MalarkeyDirective);
