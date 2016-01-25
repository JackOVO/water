/**
 * 货道服务
 */

import { BusinessFactory } from '../main/business.factory';

export class AisleService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, aisleFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, aisleFactory);
    this.machineSn = null;
    this.aisleFactory = aisleFactory;
  }

  // 获取机器的货道列表
  getAll(sn = this.machineSn) {
    let _this = this;

    return this.aisleFactory.getAllByMachineSn(sn).then((array) => {
      return _this.globalNotice('all', array);
    });
  }
}