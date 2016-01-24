/**
 * 菜单实体工厂
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class Menu {
  constructor(id, text, children) {
    this.id = id;
    this.text = text;
    this.children = children;
  }
}

Menu.mapping = {
  key: 'permission'
};
Menu.futility = ['sortBy', 'checked', 'url', 'parentId'];
Menu.create = createObjectFn(Menu);

export class MenuFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

     super('menu', Menu, 'id', dataService);
  }

  // 包装基类解析换个参数
  treeResolve(data) {
    return super.packTree(data, this.pack, 'children');
  }

  // 获取树菜单
  getTree() {
    return super.query(null, 'tree', this.treeResolve).then((tree) => tree);
  }
}