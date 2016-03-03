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
      case 'aisleFlag':
        combobox.push(new Options('0', '禁用'));
        combobox.push(new Options('1', '启用'));
        combobox.push(new Options('2', '停售'));
        break;
      case 'machineFlag':
        combobox.push(new Options('Enable', '启用'));
        combobox.push(new Options('NotEnable', '禁用'));
        combobox.push(new Options('MACHINE_MAINTAIN', '机器维护状态'));
        combobox.push(new Options('PLATFORM_MAINTAIN', '云平台维护状态'));
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
        combobox.push(new Options('2', '乐点'));
        break;
      case 'adPlayType':
        combobox.push(new Options('-1', '不限播放程度'));
        combobox.push(new Options('1', '完整播放'));
        combobox.push(new Options('0', '未完整播放'));
        break;
      case 'adType':
        combobox.push(new Options('-1', '不限格式类型'));
        combobox.push(new Options('0', '视频'));
        combobox.push(new Options('1', '图片'));
        break;
      case 'adTimeType':
        combobox.push(new Options('-1', '不限时间类型'));
        combobox.push(new Options('TODAY', '今天'));
        combobox.push(new Options('THE_YEAR', '本年'));
        combobox.push(new Options('THE_WEEK', '本周'));
        combobox.push(new Options('THE_MONTH', '本月'));
        combobox.push(new Options('SELF_DEF', '自定义'));
        break;
      case 'allTimeType':
        combobox.push(new Options('-1', '不限时间类型'));
        combobox.push(new Options('TRELVE_MONTH', '12个月'));
        combobox.push(new Options('SIX_MONTH', '6个月'));
        combobox.push(new Options('THREE_MONTH', '3个月'));
        combobox.push(new Options('TODAY', '今天'));
        combobox.push(new Options('THE_WEEK', '本周'));
        combobox.push(new Options('THE_MONTH', '本月'));
        combobox.push(new Options('THE_YEAR', '本年'));
        combobox.push(new Options('SELF_DEF', '自定义'));
        break;
    }
    return combobox;
  }
}