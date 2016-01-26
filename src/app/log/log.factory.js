/**
 * 公司实体工厂
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class Log {
  constructor() {}
}
Log.mapping = {};
Log.futility = [];
Log.create = createObjectFn(Log);

export class LogFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('log', Log, 'id', dataService);
  }

  /**
   * 日志分页查询
   * @param  {String} code 机器code
   * @param  {Number} page 页码
   * @param  {Number} size 每页显示数
   * @param  {Object} size 搜索选项
   * @return {Promise}     分页对象承诺
   */
  searchByMachineCode(code, page, size, options) {
    let params = angular.extend({'machine_code': code}, options);

    return super.search(page, size, params);
  }
}