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
        this[_$log].error('errorService, 不识别的错误状态' + status);
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

// (function() {
//   'use strict';
//   // 业务错误数据拦截, 以及错误码定义和触发

//   angular
//     .module('wito.core')
//     .factory('errorService', errorService);

//   errorService.$inject = ['$q'];
//   function errorService($q) {
//     var service = {
//       'swallow': swallow,
//       'interception': interception,
//       'NotLoggedIn': 100,
//       'NoPermission': 101
//     };
//     return service;

//     /**
//      * 简易数据拦截, 负责拦截服务器错误信息
//      * @param  {Object} source 数据源
//      * @return {Object} 拒绝或数据
//      */
//     function interception(source) {
//       if (source && (source.success === false)) {
//   console.error(source);
//         if (source.message === '用户未登录') { swallow(service.NotLoggedIn); }
//         // return $q.reject('服务器错误消息处理!!');
//       }
//       return source;
//     }

//     /**
//      * 根据错误码做出相应的处理
//      * @param  {Number} status 内部封装的错误码
//      */
//     function swallow(status) {
//       switch(status) {
//         case 100: // 未登录
//   console.warn('未登录!');
//           window.location.href = './login.html';
//           break;
//         case 101: // 无权限
//   console.warn('无权限!');
//           break;
//         default:
//           console.error('errorService', '不识别的错误状态' + status);
//         break;
//       }
//     }
//   }

// })();
