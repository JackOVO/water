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
  'admin:interactionAdsMgr': 'thumbs-up',
  'admin:shopMgr': 'shopping-cart',
  'admin:storeMgr': 'street-view',
  'admin:staticAds': 'thumb-tack',
  'admin:machineMgr': 'android', //fa-plug
  'admin:subjectMgr': 'sitemap',
  'adplan': 'calendar-plus-o',
  'statistics': 'area-chart',
  'baseInfo': 'info-circle',
  'admin:systemMgr': 'cog',
  'resource': 'unlock-alt',
  'machinegroup': 'cubes',
  'adhistory': 'clock-o',
  'adresource': 'upload',
  'adstats': 'bar-chart',
  'subject': 'building',
  'store': 'map-signs',
  'activity': 'weixin', // share
  'admin:user': 'user',
  'order': 'file-text',
  'product': 'archive',
  'user': 'user-plus',
  'machine': 'wrench',
  'operate': 'child',
  'app': 'share',
  'role': 'users'
};
// area-chart
// circle-o










