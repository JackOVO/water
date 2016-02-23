/**
 * 数据表格指令服务
 */

export class DataTableService {
  constructor() {}

  // 时间渲染
  dataRender(time) {
    if (time) {
      return new Date(time).format('yyyy-MM-dd');
    } else {
      return '';
    }
  }

  // 时间渲染 格式
  timeRender(time) {
    if (time) {
      return new Date(time).format('yyyy-MM-dd hh:mm:ss');
    } else {
      return '';
    }
  }

  // 图片渲染
  imgRender(src) {
    return '<img src="'+src+'" style="width:30px;height:30px;">';
  }

  // 图片链接
  imgLinkRender(src) {
    return '<a href="'+src+'" target="view">查看</a>';
  }

  // 下载a
  downLoadRender(href) {
    return '<a href="'+ href +'">下载</a>';
  }

  // 活动类型
  activityRender(key) {
    return {'0': '免费喝', '1': '一分钱喝', '2': 'APP推广'}[key];
  }

  // 启用状态渲染(用户)
  enableflagRender(data) {
    return (data === 'Enable' ? '启用' : '禁用');
  }

  // 删除状态渲染(商品)
  delFlagRender(data) {
    return (data == 1 ? '已删除' : '未删除');
  }

  // 媒体类型
  mediaTypesRender(media) {
    return {PICTURE: '图片', VIDEO: '视频', '0': '视频', '1': '图片'}[media];
  }

  // 广告状态
  adTypeRender(type) {
    return {0: '未审核', 1: '已通过', 2: '投放中', 3: '投放结束'}[type];
  }

  // 机器类型
  machineType(type) {
    return {'1': '智能售货机', '2': '乐点'}[type];
  }

  // 毫秒转秒
  MsturnSecRender(ms) {
    if (ms) {
      return ms / 1000;
    } else {
      return 0;
    }
  }

  // 播放类型
  playTypeRender(type) {
    return {'1': '完整播放', '0': '未完整播放'}[type];
  }
}