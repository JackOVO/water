/**
 * 菜单服务
 */

import { Tree } from '../main/model';
import { BusinessFactory } from '../main/business.factory';

export class MenuService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, menuFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, menuFactory);
    this.keyMapping = {}; // 前后数据key映射
    this.menuFactory = menuFactory;
  }

  // 配置接口
  setMenuKeyMapping(mapping) {
    this.keyMapping = mapping;
  }

  // 获取侧边栏菜单数据
  getSideMenuData() {
    let _this = this;
    return this.menuFactory.getTree().then((children) => {
      Tree.traversal(children, (node) => {
        if (_this.keyMapping[node.key]) {
          node.key = _this.keyMapping[node.key];
        }
node.icon = iconMaping[node.key] || '';
      });
      return children;
    }).then((children) => {
      return _this.globalNotice('getSideMenuData', children);
    });
  }
}

let iconMaping = {
  'admin:user': 'user',
  'admin:shopMgr': 'shopping-cart',
  'admin:staticAds': 'thumb-tack',
  'admin:interactionAdsMgr': 'thumbs-up',
  'admin:subjectMgr': 'sitemap',
  'admin:storeMgr': 'street-view',
  'admin:machineMgr': 'android', //fa-plug
  'admin:systemMgr': 'cog',
  'adplan': 'tasks',
  'adresource': 'upload',
  'activity': 'weixin', // share
  'app': 'share',
  'machine': 'wrench',
  'resource': 'unlock-alt',
  'subject': 'building',
  'store': 'map-signs',
  'statistics': 'area-chart',
  'baseInfo': 'info-circle',
  'role': 'users',
  'user': 'user-plus',
  'order': 'file-text',
  'product': 'archive'
};
// area-chart
// circle-o










