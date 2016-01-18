/**
 * 菜单服务
 */

import { BusinessFactory } from '../main/business.factory';

export class MenuService extends BusinessFactory {
  constructor(toastr, $rootScope, menuFactory) {
    'ngInject';

    super(toastr, $rootScope, menuFactory, 10);
    this.keyMapping = {}; // 前后数据key映射
    this.menuFactory = menuFactory;
  }

  // 配置接口
  setMenuKeyMapping(mapping) {
    this.keyMapping = mapping;
  }

  /**
   * 全部数据, 不同类型的处理?
   * @return {Array} 数组承诺
   */
  all() {
    let _this = this;
    return this.menuFactory.all().then((array) => {
      _this.iteration(array, function(node) {
        if (_this.keyMapping[node.key]) {
          node.key = _this.keyMapping[node.key];
        }
      });
      return array;
    }).then((array) => {
      return _this.globalNotice('all', array);
    });
  }

  /**
   * 遍历树结构
   * @param  {Array}   array     节点数组
   * @param  {Function} callback 处理回调
   */
  iteration(array, callback) {
    let _this = this;
    for (let index in array) {
      let item = array[index];
      callback(item);
      if (item.childs.length) {
        _this.iteration(item.childs, callback);
      }
    }
  }
}