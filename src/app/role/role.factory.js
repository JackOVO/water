/**
 * 角色实体工厂
 */

import { createObjectFn, Message } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class Role {
  constructor() {}
}
Role.mapping = {};
Role.futility = [];
Role.create = createObjectFn(Role);

export class RoleFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('role', Role, 'roleCode', dataService);
    this.dataService = dataService;
  }

  //封装, 需要subjectCode
  getCombobox(code) {
    return super.getCombobox('code', 'name', {subjectCode: code});
  }

  /**
   * 更新角色权限
   * @param  {String} roleCode 角色code
   * @param  {Array}  checkeds 选中的权限id数组
   * @return {Promise}         消息承诺
   */
  updCompetence(roleCode, checkeds) {
    let aim = this.aim;
    let params = {roleCode: roleCode, resourceCodes: checkeds};

    return this.dataService.post(aim, 'updCompetence', params).
      then(({success, message}) => {
      return new Message(success, message);
    });
  }
}