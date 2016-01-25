/**
 * 权限服务
 */

import { BusinessFactory } from '../main/business.factory';

export class CompetenceService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, competenceFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, competenceFactory);
    this.competenceFactory = competenceFactory;
  }

  // 切换树数据
  toggleTree(roleCode) {
    let _this = this;
    return this.competenceFactory.getTreeByRoleCode(roleCode)
      .then((children) => {
      return _this.globalNotice('toggleTree', children);
    });
  }
}