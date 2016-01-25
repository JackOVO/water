/**
 * 权限实体工厂
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class Competence {
  constructor(){}
}
Competence.mapping = {};
Competence.futility = ['sortBy', 'url', 'parentId'];
Competence.create =  createObjectFn(Competence);

export class CompetenceFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('competence', Competence, 'id', dataService);
  }

  // 根据角色code获取tree
  getTreeByRoleCode(code) {
    let entity = {roleCode: code};
    return super.query(entity, 'treeByRoleCode', 'packTree');
  }
}