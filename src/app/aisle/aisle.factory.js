/**
 * 货到实体工厂
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class Aisle {
  constructor() {}
}
Aisle.mapping = {};
Aisle.futility = [];
Aisle.create = createObjectFn(Aisle);

export class AisleFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('aisle', Aisle, 'id', dataService);
  }

  /**
   * 获取机器的货道
   * @param  {String} code 机器的code
   * @param  {Number} page 页码
   * @param  {Number} size 每页显示数
   * @return {Promise}     列表承诺
   */
  getAllByMachineCode(code) {
    let params = {'machineCode': code};

    return this.query(params, 'all');
  }

  /**
   * 获取货到列表combobox
   * @param  {String} code 机器的code
   * @return {Promise}     列表承诺
   */
  getCombobox(code) {
    let params = {'machineCode': code};

    return super.getCombobox('aisleCode', 'aisleCode', params);
  }
}