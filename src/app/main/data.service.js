/**
 * 数据交互服务
 * 1. 注入的私有属性都采用Symbol实现
 * 2. 非注入的私有属性加下滑线在最外层定义
 */

let _$http = Symbol(); // 1
let _$window = Symbol();

let _errorService = null;
let _baseUrl = 'http://localhost:5324/admin'; // 2
let _requestMapping = {
  _default: {
    prefix: 'user',
    suffix: '.do',
    add: 'add',
    get: 'find',
    upd: 'update',
    del: 'delete',
    list: 'findPage'
  }
};

export class DataService {
  constructor($http, $window, errorService) {
    'ngInject';

    this[_$http] = $http;
    this[_$window] = $window;
    _errorService = errorService;
  }

  // 提供外部配置接口
  setBaseUrl(baseUrl) { _baseUrl = baseUrl; }
  setRequestMapping(requestMapping) {
    var reqMap = angular.extend({}, _requestMapping, requestMapping);
    _requestMapping = reqMap;
  }

  /**
   * get方式请求服务器
   * @param  {String} aim     创建请求地址中的目标
   * @param  {String} action  创建请求地址中的动作
   * @param  {Object} params  请求的参数
   * @return {Promise}        返回响应的承诺
   */
  get(aim, action, params) {
    let url = _createRequestUrl(aim, action);
    let config = { params: params };

    return this[_$http].get(url, config)
      .then(_completeCallBack)
      .catch(_failedCallBack);
  }

  /**
   * post方式请求服务器
   * @param  {String} aim     创建请求地址中的目标
   * @param  {String} action  创建请求地址中的动作
   * @param  {Object} data    请求的参数
   * @return {Promise}        返回响应的承诺
   */
  post(aim, action, data) {
    let url = _createRequestUrl(aim, action);
    let config = {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      transformRequest: (obj) => {
        // 以下处理数组变为 array=1&array=2&array=3
        // return $.param(obj);

        // 以下处理数组变为 array: 1,2,3
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      }
    };

    return this[_$http].post(url, data, config)
      .then(_completeCallBack)
      .catch(_failedCallBack);
  }

  /**
   * 对jquery-upload上传的封装, 需要指令配合
   * @param  {String} aim         操作目标
   * @param  {String} action      操作动作
   * @param  {[type]} data        form参数
   * @param  {Function} uploadFn  上传方法
   * @return {Promise}            响应承诺
   */
  upload(aim, action, data, uploadFn) {
    let url = _createRequestUrl(aim, action);
    return uploadFn(url, data);
  }

  /**
   * 从服务器下载文件, 创建a的方式
   * @param  {String} aim    创建请求地址中的目标
   * @param  {String} action 创建请求地址中的动作
   * @param  {Object} params 请求的参数
   * @return {[type]}        [description]
   */
  download(aim, action, params) {
    let z = $.param(params);
    let url = _createRequestUrl(aim, action);
    url = url + (z ? '?' + z : z);

    this[_$window].open(url);
  }
}

/**
 * 根据请求映射创建请求地址
 * @param  {String} aim    目标key, 当值为'default'时,将放回action为地址
 * @param  {[type]} action 请求动作通常为get, add, upd, del, download
 * @return {[type]}        返回请求的地址
 */
function _createRequestUrl(aim, action) {
  let url = '',
      baseUrl = _baseUrl,
      aimConfig = _requestMapping[aim],
      defConfig = _requestMapping['_default'];

  if (aim === 'default') {
    url = action;
  } else if (typeof(aimConfig) !== 'undefined') {

    // 临时转向
    if (angular.isObject(aimConfig[action])) {
      let actionConfig = angular.copy(aimConfig[action]);
      aim = actionConfig['aim'];
      action = actionConfig['action'];
      aimConfig = _requestMapping[aim];
    }

    baseUrl = aimConfig.base || baseUrl;
    let path = aimConfig[action] || defConfig[action];
    let prefix = typeof(aimConfig.prefix) == 'undefined' ? aim : aimConfig.prefix;
    let suffix = aimConfig.suffix || defConfig.suffix;

    

    url = baseUrl + '/' + (prefix?prefix+'/':'') + path + suffix;
  } else {
    throw new Error('data.service 未定义的目标配置-' + aim);
  }

  return url;
}

/**
 * 请求成功回调, 即200数据第一层处理
 * @return {[type]} [description]
 */
function _completeCallBack(response) {
  _errorService.interception(response);
  let data = response.data;
  // Intercept service
  return data;
}

/**
 * 请求服务器, 失败后处理(注意是失败, 不是失败响应$q)
 * @return {[type]} [description]
 */
function _failedCallBack(error) {

  // 非状态码200的处理
  switch (error.status) {
    case 600: break;
    case 650: break;
    default:
      throw new Error('data.service, 服务器状态码:' + error.status);
  }
}

// 下载js生成内容
// function downloadFile(fileName, content){
//   var aLink = document.createElement('a');
//   var blob = new Blob([content]);
//   var evt = document.createEvent("HTMLEvents");
//   //initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
//   evt.initEvent("click", false, false);
//   aLink.download = fileName;
//   aLink.href = URL.createObjectURL(blob);
//   aLink.dispatchEvent(evt);
// }