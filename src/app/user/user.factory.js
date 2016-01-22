/**
 * 用户实体工厂
 */

import { createObjectFn } from '../main/model';
import { EntityFactory } from '../main/entity.factory';

class User {
  constructor() {
    this.userType = 'B_USER'; // 固定用户类型
    this.enableFlag = 'Enable';
  }
}
User.mapping = {};
User.futility = [];
User.create =  createObjectFn(User);

export class UserFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('user', User, 'userCode', dataService);
    this.dataService = dataService;
  }

  /**
   * 解绑微信
   * @param  {String} userCode 用户code
   * @return {Promise}         消息承诺
   */
  unbindWechat(userCode) {
    let aim = this.aim;
    let params = {userCode: userCode}

    return this.dataService.post(aim, 'unWechatQR', params).then((msg) => {
      return msg;
    });
  }

  /**
   * 获取二维码地址
   * @param  {String} userCode 用户code
   * @return {String} 二维码地址承诺
   */
  getWechatQRUrl(userCode) {
    let aim = this.aim;
    let params = {userCode: userCode}

    return this.dataService.get(aim, 'wechatQR', params).then((url) => {
      return url;
    });
  }
}