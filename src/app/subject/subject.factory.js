/**
 * 公司实体工厂
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class Subject {
  constructor() {}
}
Subject.mapping = {};
Subject.futility = [];
Subject.create = createObjectFn(Subject);

export class SubjectFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('subject', Subject, 'id', dataService);
  }

  // 封装一下映射关系
  getCombobox() {
    return super.getCombobox('code', 'name');
  }
}