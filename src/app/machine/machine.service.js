/**
 * 机器服务
 */

import { BusinessFactory } from '../main/business.factory';

export class MachineService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, machineFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, machineFactory);
    this.machineFactory = machineFactory;
  }

  // 切换树
  toggleTree(userCode) {
    let _this = this;
    return this.machineFactory.getTreeByUserCode(userCode).then((children) => {
      return _this.globalNotice('toggleTree', children);
    });
  }
}