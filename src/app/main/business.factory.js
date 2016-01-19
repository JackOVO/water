/**
 * 列表管理类业务工厂基类
 */

let _toastr = Symbol();
let _$rootScope = Symbol();
let _entityFactory = Symbol();

export class BusinessFactory {
  constructor(toastr, $rootScope, entityFactory, size = 9) {
    this.size = size;
    this[_toastr] = toastr;
    this[_$rootScope] = $rootScope;
    this[_entityFactory] = entityFactory;
    this.registrationRecord = {}; // 记录
  }

  clearOrder() { this.order = undefined; }
  setOrder(order) { this.order = order; }

  /**
   * 全局通知
   * @param  {String} name 中间名
   * @param  {String} type 通知类型
   * @param  {Object} data 通知数据
   */
  globalNotice(name, data) {
    let nary = [...name]
    nary[0] = nary[0].charAt(0).toUpperCase();

    let aim = this[_entityFactory].aim,
        broadcastName = aim + nary.join('');

    // 类型处理
    this[_$rootScope].$broadcast(broadcastName, data);

    return data;
  }

  /**
   * 全部数据, 不同类型的处理?
   * @return {Array} 数组承诺
   */
  all() {
    let _this = this;

    return this[_entityFactory].all().then((array) => {
      return array;
    }).then((array) => {
      return _this.globalNotice('all', array);
    });
  }

  /**
   * 分页查询列表
   * @param  {Number} page    页码
   * @param  {Object} options 搜索选项
   * @param  {Number} size    大小
   * @return {Array}          列表承诺
   */
  search(page, size = this.size, options = {}) {
    let _this = this;

    if (typeof(this.order) !== 'undefined') {
      options.order = this.order;
    }

    return this[_entityFactory].search(page, size, options).then((paging) => {
      return paging;
    }).then((paging) => {
      return _this.globalNotice('search', paging);
    });
  }

  /**
   * 消息提示框
   * @param  {String} msg       显示的内容
   * @param  {String} operation 显示的类型
   * @param  {String} title     标题
   * @return {[type]}           暂无
   */
  showToastr(msg, operation, title) {
    if (operation === 'success') { title = title || '成功'; }
      else if (operation === 'info') { title = title || '信息'; }
      else if (operation === 'warning') { title = title || '警告'; }
      else if (operation === 'error') { title = title || '错误'; }
      else { operation = 'info'; }

    this[_toastr][operation](`<p>${msg}</p>`, title);
  }
}

// /**
//  * 注册请求方法的成功回调
//  * @param  {Stirng}   fname    方法名
//  * @param  {Function} callback 回调
//  * @return {Number}            已注册数
//  */
// register(fname, callback) {
//   let fnArray = this.registrationRecord[fname] || [];
//   fnArray.push(callback);
//   this.registrationRecord[fname] = fnArray;
//   return fnArray.length;
// }

// /**
//  * 执行绑定的注册回调
//  * @param  {Stirng} fname 方法名
//  * @return {[type]}       [description]
//  */
// execute(fname, result) {
//   let fnArray = this.registrationRecord[fname] || [];
//   for (let index in fnArray) {
//     fnArray[index](result);
//   }
//   return result;
// }