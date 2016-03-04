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
      if (res.saleStatsSummary) {
        res.saleStatsSummary.serNum = '总计';
        paging.data.push(res.saleStatsSummary);
      }
      return paging;
    });
  }

  // 根据商品
  byProduct(params) {
    return this.dataService.get(this.aim, 'byProduct', params).then((res) => {
      return res;
    });
  }

  // 根据售货机
  byMachine(params) {
    return this.dataService.get(this.aim, 'byMachine', params).then((res) => {
      return res;
    });
  }

  // 下载表格
  download(params) {
    return this.dataService.download(this.aim, 'download', params);
  }
}