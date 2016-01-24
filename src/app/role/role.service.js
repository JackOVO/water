/**
 * 角色服务
 */

import { BusinessFactory } from '../main/business.factory';

export class RoleService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, roleFactory) {
    'ngInject'

    super(toastr, $rootScope, dialogService, roleFactory);
    this.roleFactory = roleFactory;
  }

  //封装, 需要subjectCode
  getCombobox(code) {
    return this.roleFactory.getCombobox(code);
  }
}