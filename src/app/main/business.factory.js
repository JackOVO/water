/**
 * 列表管理类业务工厂基类
 */

let _toastr = Symbol();
let _$rootScope = Symbol();
let _entityFactory = Symbol();
let _dialogService = Symbol();

export class BusinessFactory {
  constructor(toastr, $rootScope, dialogService, entityFactory, size = 9) {
    this.size = size;

    this[_toastr] = toastr;
    this[_$rootScope] = $rootScope;
    this[_dialogService] = dialogService;
    this[_entityFactory] = entityFactory;
    this.registrationRecord = {}; // 记录
  }

  clearOrder() { this.order = undefined; }
  setOrder(order) { this.order = order; }
  dialog(conf, content) {
    return this[_dialogService].open(conf, content);
  }
  confirm(title, content) {
    return this[_dialogService].confirm(title, content);
  }
  
  /**
   * 编辑类对话框封装, 主要是外层数据绑定的配置
   * @param  {String} title   标题
   * @param  {Array} inputs   输入元素配置
   * @param  {Object} binding 绑定依赖数据描述
   * @param  {Scope} scope    可选的依赖作用域, 用于指令生成
   * @return {Promise}        对话框确定取消承诺
   */
  editDialog(title = '编辑框框', inputs, binding, scope) {

    // 创建独立作用域
    scope = scope || this[_$rootScope].$new(true);
    let conf = { title: title },
        content = { scope: scope, inputs: inputs };
    for (let key in binding) {
      // 绑定一个承诺数据
      if (binding[key].then) {
        binding[key].then((data) => { scope[key] = data; });
      } else {
        scope[key] = binding[key];
      }
    }

    return this[_dialogService].open(conf, content);
  }

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

  /**
   * 刷新列表
   * @param  {Object} msg  应该是消息对象
   * @param  {[type]} page 刷新的页码
   */
  refreshList(msg, page = 1) {
    let oper = msg.success?'success':'error';
    this.search(page);
    this.showToastr(msg.msg, oper);
  }
}