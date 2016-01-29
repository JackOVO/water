/**
 * app推广模块
 */

import { AppFactory } from './app.factory';
import { AppService } from './app.service';
import { AppController } from './app.controller';

angular
  .module('water.app', [])
  .service('appFactory', AppFactory)
  .service('appService', AppService)
  .controller('AppController', AppController);