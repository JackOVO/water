/**
 * 针对错误的封装和处理
 */

let _$log = Symbol();
let _$state = Symbol();

const NotLogged = 100; // 没有登录
const NoPermission = 101; // 没有权限

export class ErrorService {
  constructor($log, $state) {
    'ngInject';

    this[_$log] = $log;
    this[_$state] = $state;

    // 内部错误定义
    this.NotLogged = NotLogged;
    this.NoPermission = NoPermission;
  }

  /**
   * 根据错误码做出相应的处理
   * @param  {Number} status 内部封装的错误码
   */
  swallow(status) {
    switch(status) {
      case 100: // 未登录
        this[_$state].go('login');
        break;
      case 101: // 无权限
        break;
      default:
        this[_$log].error('errorService, 不识别的错误状态-' + status);
        break;
    }
  }

  /**
   * 负责拦截dataService成功响应的数据
   * @param  {Object} response 响应对象
   * @return {Object}          处理后的对象
   */
  interception(response) {
    let data = response.data;
    if (data && (data.success === false)) {

      // 呵呵
      if (data.message === '用户未登录') {
        this.swallow(this.NotLogged);
      }
    }
    return data;
  }
}