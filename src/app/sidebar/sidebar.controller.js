/**
 * 侧边栏控制器定义
 */

export class SidebarController {
  constructor() {
    this.menuData = [
      {type: 'header', text: 'HEADER'},
      {id: 1, key: 'user', text: '用户管理', icon: 'user'},
      {id: 3, key: 'project', text: '项目管理', icon: 'coffee'},
      {id: 4, key: 'invest', text: '投资管理', icon: 'line-chart'},
      {id: 2, key: 'banner', text: '轮播管理', icon: 'file-picture-o'}
    ];
  }

  menuClick(pary, isc, isv) {
    let node = this;
    console.log(node, pary, isc, isv);
  }
}