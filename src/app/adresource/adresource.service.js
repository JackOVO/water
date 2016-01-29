/**
 * 广告资源服务
 */

import { BusinessFactory } from '../main/business.factory';

export class AdresourceService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, adresourceFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, adresourceFactory);
  }
}