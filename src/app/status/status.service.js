/**
 * 状态服务
 */

import { Options } from '../main/model';

export class StatusService {
  constructor() {
  }

  getCombobox(type) {
    let combobox = [];

    switch(type) {
      case 'flag':
        combobox.push(new Options('Enable', '启用'));
        combobox.push(new Options('NotEnable', '禁用'));
        break;
      case 'menu':
        combobox.push(new Options('Menu', '菜单类型'));
        combobox.push(new Options('Button', '按钮类型'));
        break;
      case 'activity':
        combobox.push(new Options(0, '免费喝'));
        combobox.push(new Options(1, '一分钱喝'));
        combobox.push(new Options(2, 'app推广'));
        break;
    }
    return combobox;
  }
}