/**
 * 菜单实体工厂
 */

import { EntityFactory } from '../main/entity.factory';

class Menu {
  constructor(id, text, childs) {
    this.id = id;
    this.text = text;
    this.childs = childs;
  }
}

Menu.mapping = {
  key: 'permission',
  childs: 'children'
};
Menu.futility = ['sortBy', 'checked', 'url', 'parentId'];
Menu.create = function(...args) {

  if (angular.isObject(args[0])) {
    var menu = new Menu();
    for (let key in args[0]) {
      if (Menu.futility.indexOf(key) === -1) {
        menu[key] = args[0][key];
      }
    }
    return menu;
  }
};

export class MenuFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

     super('menu', Menu, 'id', dataService);
  }

  /**
   * 二次处理, 基类方法只会处理第一层
   * 不理会树结构
   * @return {Array} 数组承诺
   */
  all() {
    let _this = this,
        childKey = 'childs';

    // 迭代处理
    function iteration(childrens) {
      let array = [];
      for (let index in childrens) {
        let menu = _this.pack(childrens[index]);
        array.push(menu);

        if (menu[childKey] && menu[childKey].length) {
          iteration(menu[childKey]);
        }
      }
      return array;
    }

    // 基类请求一层处理
    return super.all().then(function(array) {
      for (let index in array) {
        let menu = array[index];
        menu[childKey] = iteration(menu[childKey]);
      }
      return array;
    });
  }
}