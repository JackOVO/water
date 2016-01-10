/**
 * 数据交互服务
 * 1. 注入的私有属性都采用Symbol实现
 * 2. 非注入的私有属性加下滑线在最外层定义
 */

let _$http = Symbol(); // 1
let _baseUrl = 'http://localhost:5323/admin'; // 2
let _requestMapping = {
  _default: {
    prefix: 'user',
    suffix: '.do',
    add: 'add',
    upd: 'update',
    del: 'delete',
    get: 'findCode',
    list: 'list'
  },
  user: {
    list: 'listPage'
  }
};

export class DataService {
  constructor($http) {
    'ngInject';

    this[_$http] = $http;
  }

  /**
   * get方式请求服务器
   * @param  {String} aim     创建请求地址中的目标
   * @param  {String} action  创建请求地址中的动作
   * @param  {Object} params  请求的参数
   * @return {Promise}        返回响应的承诺
   */
  get(aim, action, params) {
    let url = createRequestUrl(aim, action);
    let config = { params: params };

    return this[_$http].get(url, config)
      .then(completeCallBack)
      .catch(failedCallBack);
  }

  /**
   * post方式请求服务器
   * @param  {String} aim     创建请求地址中的目标
   * @param  {String} action  创建请求地址中的动作
   * @param  {Object} data    请求的参数
   * @return {Promise}        返回响应的承诺
   */
  post(aim, action, data) {
    let url = createRequestUrl(aim, action);
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8;'
      },
      transformRequest: function(obj) {
        // 以下处理数组变为 array=1&array=2&array=3
        return $.param(obj);

        // 以下处理数组变为 array: 1,2,3
        // var str = [];
        // for(var p in obj)
        // str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        // return str.join("&");
      }
    };

    return this[_$http].post(url, data, config)
      .then(completeCallBack)
      .catch(failedCallBack);
  }

  /**
   * 从服务器下载文件
   * @param  {[type]} aim    [description]
   * @param  {[type]} action [description]
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  download(aim, action, params) {
    let url = createRequestUrl(aim, action);
    url = url + '?' + $.param(params);

    window.open(url);
  }
}

/**
 * 根据请求映射创建请求地址
 * @param  {String} aim    目标key, 当值为'default'时,将放回action为地址
 * @param  {[type]} action 请求动作通常为get, add, upd, del, download
 * @return {[type]}        返回请求的地址
 */
function createRequestUrl(aim, action) {
  let url = '',
      baseUrl = _baseUrl,
      aimConfig = _requestMapping[aim],
      defConfig = _requestMapping['_default'];

  if (aim === 'default') {
    url = action;
  } else if (typeof(aimConfig) !== 'undefined') {
    let prefix = aimConfig.prefix || aim;
    let path = aimConfig[action] || defConfig[action];
    let suffix = aimConfig.suffix || defConfig.suffix;

    url = baseUrl + '/' + prefix + '/' + path + suffix;
  } else {
    return new Error('data.service', '未定义的目标配置!');
  }

  return url;
}

function completeCallBack(response) {
  console.info(response);
}

function failedCallBack(error) {
  console.info(error);
}

// 下载js生成内容
// function downloadFile(fileName, content){
//     var aLink = document.createElement('a');
//     var blob = new Blob([content]);
//     var evt = document.createEvent("HTMLEvents");
//     evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
//     aLink.download = fileName;
//     aLink.href = URL.createObjectURL(blob);
//     aLink.dispatchEvent(evt);
// }