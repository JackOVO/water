/**
 * 统计实体工厂
 */
import { Paging } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class Statistics {
  constructor() {}
}
Statistics.mapping = {};
Statistics.futility = [];
Statistics.create = (...args) => {
  let statistics = new Statistics();

  //XXX
  statistics.serNum = args[0].serNum;
  statistics.machineName = args[0].machineName;
  for(let key in args[0].statsEntity) {
    statistics[key] = args[0].statsEntity[key];
  }

  return statistics;
};

export class StatisticsFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('statistics', Statistics, 'id', dataService);
    this.dataService = dataService;
  }

  // 封装总计列表
  search(page, size, params) {
    let _this = this;

    return this.dataService.get(this.aim, 'list', params).then((res) => {
      let paging = new Paging([], page, size, res.total);
      paging.data = _this.packArray(res.saleStatsItems);

      // 添加总计值
      res.saleStatsSummary.serNum = '总计';
      paging.data.push(res.saleStatsSummary);
      return paging;
    });
  }

  /**
   * 根据不同的请求分页, 额
   * @param  {[type]} page   [description]
   * @param  {[type]} size   [description]
   * @param  {[type]} type   根据商品或者售货机
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  // search(page, size, type, params) {
  //   let _this = this,
  //       aim = this.aim,
  //       action = 'byProduct';
  //   params = angular.extend({pageSize: size, pageNumber: page}, params);
  //   if (type === 'byMachine') { action = 'byMachine'; }

  //   return this.dataService.get(aim, action, params).then((res) => {
  //     let paging = new Paging([], page, size, res.total);
  //     paging.data = _this.packArray(res.rows);
  //     return paging;
  //   });
  // }

  /**
   * 下载方法
   * @param  {[type]} type   [description]
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  // download(type, params) {
  //   let aim = this.aim,
  //       action = 'byPDdownload';
  //   if (type === 'byMachine') { action = 'byMDownload'; }

  //   for (let key in params) {
  //     if (!params[key]) { delete params[key]; }
  //   }

  //   return this.dataService.download(aim, action, params);
  // }
}