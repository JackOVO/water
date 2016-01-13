/**
 * 列表管理类业务工厂基类
 */

let _toastr = Symbol();
let _entityFactor = Symbol();

export class BusinessFactory {
  constructor(toastr, entityFactor, size) {
    this.size = size;
    this[_toastr] = toastr;
    this[_entityFactor] = entityFactor;
  }

  search(page, options, size = this.size) {
    return this[_entityFactor].search(page, size, options).then(() => {
      
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