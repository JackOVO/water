/**
 * 实体工厂基类
 */

let _aim = Symbol();
let _object = Symbol();
let _primaryKey = Symbol();
let _dataService = Symbol();

export class EntityFactory {
  constructor(aim, object, primaryKey, dataService) {

    this[_aim] = aim;
    this[_object] = object;
    this[_primaryKey] = primaryKey;
    this[_dataService] = dataService;
  }

  // pack(source) {
  //   for (let mkey in this[_object].mapping) {
  //     let mval = this[_object].mapping[mkey];

  //     if (typeof(source[mval]) !== 'undefined') {
  //       source[mkey] = source[mval]; // 换名
  //       delete source[mval]; // 删除原属性
  //     }
  //   }
  // }
  

  undo(entity) {
    return entity;
  }


  create() {
// console.log(this[_object].create)
//     var admin = new this[_object](args[0], args[1]);
// console.info(this[_object].create);
//     return admin;
  }

  /**
   * 根据主键获取数据
   * @param  {String} id  主键值
   * @return {Promise}    根据配置打包为对象的承诺
   */
  getById(id) {
    let params = {},
        aim = this[_aim],
        pkey = this[_primaryKey];

    params[pkey] = id;

    return this[_dataService].get(aim, 'get', params).then((source) => {
      return source;
    });
  }

  /**
   * 根据对象属性查询
   * @param  {Object} entity 类对象
   * @param  {String} action 可选其他动作
   * @return {Promise}       后台数据响应承诺
   */
  query(entity, action = 'query') {
    let aim = this[_aim],
        params = this.undo(entity);

    return this[_dataService].get(aim, action, params).then((source) => {
      return source;
    });
  }

  /**
   * 分页查询
   * @param  {Number} page    页码
   * @param  {Number} size    每页显示数
   * @param  {Object} options 搜索选项
   * @return {Promise}        分页列表响应承诺
   */
  search(page, size, options) {
    let aim = this[_aim];

    return this[_dataService].get(aim, 'list', options).then((source) => {
      return source;
    });
  }

  /**
   * 添加实体, 会通过undo方法处理
   * @param  {Object} entity 添加的对象
   * @return {Promise}       消息承诺
   */
  add(entity) {
    let aim = this[_aim],
        params = this.undo(entity);

    return this[_dataService].get(aim, 'add', params).then((res) => {
      return res;
    });
  }


  /**
   * 修改实体属性, 会通过undo方法处理
   * @param  {Object} entity  修改的实体
   * @return {Promise}        消息的承诺
   */
  update(entity) {
    let aim = this[_aim],
        params = this.undo(entity);

    return this[_dataService].get(aim, 'upd', params).then((res) => {
      return res;
    });
  }


  /**
   * 删除指定主键的实体, 根据参数数量判断多个删除
   * @param  {...[type]} ids id数组 | id | key, [id1, id2]
   * @return {Promise}       消息的承诺
   */
  delete(...ids) {
    let aim = this[_aim],
        params = {[this[_primaryKey]]: ids[0]};

    // 当参数个数为2时, 以第1个参数为后台参数名, 第二个参数为id的值
    if (ids.length === 2) {
      params = {[ids[0]]: ids[1]};
    }

    return this.dataService.get(aim, 'del', params).then((res) => {
      return res;
    });
  }
}