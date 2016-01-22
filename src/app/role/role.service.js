/**
 * 角色服务
 */

import { Options } from '../main/model';
import { BusinessFactory } from '../main/business.factory';

export class RoleService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, roleFactory) {
    'ngInject'

    super(toastr, $rootScope, dialogService, roleFactory);
    this.roleFactory = roleFactory;
  }

  //封装, 需要subjectCode
  getCombobox(code) {
    return this.roleFactory.query({subjectCode: code}, 'findBy').then((array) => {
      let result = [];
      for (let index in array) {
        let item = array[index];
        let options = new Options(item['code'], item['name']);
        result.push(options);
      }
      return result;
    });
  }
}