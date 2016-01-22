/**
 * 用户实体工厂
 */

import { EntityFactory } from '../main/entity.factory';

class User {
  constructor() {}
}
User.mapping = {};
User.futility = [];
User.create = function(...args) {

  if (angular.isObject(args[0])) {
    var user = new User();
    for (let key in args[0]) {
      if (User.futility.indexOf(key) === -1) {
        user[key] = args[0][key];
      }
    }
    return user;
  } else {
    return new User();
  }
};

export class UserFactory extends EntityFactory {
  constructor(dataService) {
    'ngInject';

    super('user', User, 'id', dataService);
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