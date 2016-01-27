/**
 * 机器实体工行
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';


class Machine {
  constructor() {}
}
Machine.mapping = {};
Machine.futility = [];
Machine.create =  createObjectFn(Machine);

export class MachineFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('machine', Machine, 'machineCode', dataService);
  }

  // 根据用户code获取tree
  getTreeByUserCode(code) {
    let entity = {userCode: code};
    return super.query(entity, 'treeByUserCode', 'packTree');
  }

  // 封装一下映射关系
  getCombobox() {
    return super.getCombobox('value', 'text');
  }
}