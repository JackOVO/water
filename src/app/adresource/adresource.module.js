/**
 * 广告资源模块
 */

import { AdresourceFactory } from './adresource.factory';
import { AdresourceService } from './adresource.service';
import { AdresourceController } from './adresource.controller';

angular
  .module('water.adresource', [])
  .service('adresourceFactory', AdresourceFactory)
  .service('adresourceService', AdresourceService)
  .controller('AdresourceController', AdresourceController);