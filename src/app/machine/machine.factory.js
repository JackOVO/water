/**
 * 机器实体工行
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';


class Machine {
  constructor() {
    this.type = '1';
    this.enableFlag = 'Enable';
  }
}
Machine.mapping = {};
Machine.futility = [];
Machine.create =  createObjectFn(Machine);

export class MachineFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('machine', Machine, 'machineCode', dataService);
  }

  // 置平台状态
  togglePlatformStatus(pwd, on) {
    let entity = {password: pwd};
    if (on === true) { entity.type = 1; }
     else { entity.type = 2; }

    return super.query(entity, 'platformMaintain');
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

  // 售货机列表根据广告计划
  getCheckByAd(adPlanCode) {
    let params = {adUserPlanCode: adPlanCode};

    return super.query(params, 'byAdPlanCode');
  }
}