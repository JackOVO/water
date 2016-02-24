/**
 * 广告统计工厂
 */

import { createObjectFn, Paging } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class AdStats {
  constructor() {}
}
AdStats.mapping = {};
AdStats.futility = [];
AdStats.create =  createObjectFn(AdStats);

export class AdStatsFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('adstats', AdStats, 'id', dataService);
  }

  // 下载
  download(params) {
    return super.download(params);
  }

  // 详情下载
  detailDownload(params) {
    return super.download(params, 'detailDownload');
  }

  // 获取汇总列表, 需要将数据拼装一下
  getSummaryList(entity = {}) {
    return super.query(entity, 'summary').then((summary) => {

      let paging = new Paging(summary.adResourceStats, 1, 9999, 9999);
      paging.data.push({
        adresourceCode: '合计',
        complete: summary.adCountDto.complete,
        totalTime: summary.adCountDto.totalTime,
        suspension: summary.adCountDto.suspension,
        playFrequency: summary.adCountDto.playFrequency
      });
      return paging;
    });
  }
}