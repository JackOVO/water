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
    }
    return combobox;
  }
}