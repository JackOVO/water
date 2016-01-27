/**
 * 点位模块
 */

import { StoreFactory } from './store.factory';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';

angular
  .module('water.store', ['water.subject'])
  .service('storeFactory', StoreFactory)
  .service('storeService', StoreService)
  .controller('StoreController', StoreController);