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
      case 'andrews':
        combobox.push(new Options('安卓2.0及以上', '安卓2.0及以上'));
        combobox.push(new Options('安卓2.2及以上', '安卓2.2及以上'));
        combobox.push(new Options('安卓4.0及以上', '安卓4.0及以上'));
        combobox.push(new Options('安卓4.4及以上', '安卓4.4及以上'));
        combobox.push(new Options('安卓5.0及以上', '安卓5.0及以上'));
        break;
      case 'media':
        combobox.push(new Options('PICTURE', '图片'));
        combobox.push(new Options('VIDEO', '视频'));
        break;
      case 'planStatus':
        combobox.push(new Options('0', '未审核'));
        combobox.push(new Options('1', '已通过'));
        combobox.push(new Options('2', '投放中'));
        combobox.push(new Options('3', '投放结束'));
        break;
      case 'mType':
        combobox.push(new Options('1', '智能售货机'));
        combobox.push(new Options('2', '热点'));
        break;
    }
    return combobox;
  }
}