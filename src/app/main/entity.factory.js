/**
 * 实体工厂基类
 */

import {Paging, Message} from './model';

/**
 * 根据响应数据属性创建响应的类型元数据
 * Page, Array, Entity, Message
 * @param  {Object} res 后台响应
 * @return {Object}     自定义类型描述数据
 */
function _createResTypeClass(res) {
  if (typeof(res.message) !== 'undefined') {
    let data = res.data;
    let suc = res.success;
    let content = res.message;

    return new Message(suc, content, data);
  } else {
    return res;
  }
}

let _cla = Symbol();
let _primaryKey = Symbol();
let _dataService = Symbol();

export class EntityFactory {
  constructor(aim, cla, primaryKey, dataService) {

    this.aim = aim;
    this[_cla] = cla;
    this[_primaryKey] = primaryKey;
    this[_dataService] = dataService;
  }

  /**
   * 同undo, 只不过是反向转换, 都需要更改
   * 单层换名
   * @param  {[type]} source [description]
   * @return {[type]}        [description]
   */
  pack(source) {
    let cla = this[_cla];

    for (let key in cla.mapping) {
      let conf = cla.mapping[key];
      let dkey = conf;

      // 换名
      if (typeof(source[dkey]) !== 'undefined') {
        source[key] = source[dkey];
        if (key !== dkey) { delete source[dkey]; }
      }

    }

    return this.create.apply(this, [source]);
  }

  /**
   * 不只是换名, 还应该可以迭代换名, 并可以对值进行过滤处理
   * @param  {[type]} entity [description]
   * @return {[type]}        [description]
   */
  undo(entity) {
    let cla = this[_cla],
        result = angular.extend({}, entity); 
    for (let key in cla.mapping) {
      let conf = cla.mapping[key];
      let dkey = conf;

      // 换名
      if (typeof(result[key]) !== 'undefined') {
        result[dkey] = result[key];
        delete result[key];
      }
    }

    return result;
  }

  /**
   * 提供创建实体的接口
   * 推荐通过类的create方法创建实体
   * 会根据类的属性来判断使用什么方法创建实体
   * 在使用的时候要尽量知道会使用哪个方法创建
   * @param  {...[type]} args 参数列表, 解构也可以
   * @return {cla}         创建的实体
   */
  create(...args) {
    let cla = this[_cla];

    if (angular.isFunction(cla.create)) {
      return cla.create.apply(this, args);
    } else {
      // http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
      return new (Function.prototype.bind.apply(cla, [null, ...args]));
    }
  }

  /**
   * 根据主键获取数据
   * @param  {String} id  主键值
   * @return {Promise}    根据配置打包为对象的承诺
   */
  getById(id) {
    let params = {},
        aim = this.aim,
        pkey = this[_primaryKey];

    params[pkey] = id;

    return this[_dataService].get(aim, 'get', params).then((res) => {
      return res;
    });
  }

  /**
   * 获取全部, 单层过滤处理
   * @return {Promise} 数组承诺
   */
  all(pack) {
    let _this = this,
        aim = this.aim;
    pack = pack || this.pack;

    return this[_dataService].get(aim, 'all').then((res) => {
      let array = [];
      for (let index in res) {
        let item = pack.call(_this, res[index]);
        array.push(item);
      }
      return array;
    });
  }

  /**
   * 根据对象属性查询
   * @param  {cla} entity 类对象
   * @param  {String} action 可选其他动作
   * @return {Promise}       后台数据响应承诺
   */
  query(entity, action = 'query') {
    let _this = this,
        aim = this.aim,
        params = this.undo(entity);

    return this[_dataService].get(aim, action, params).then((res) => {
      let obj = _createResTypeClass(res);

      if (obj instanceof Message) {
        obj.data = _this.pack(obj.data);
      } else {
        obj = _this.pack(obj);
      }

      return obj;
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
    let _this = this,
        aim = this.aim;
    options = angular.extend({pageSize: size, pageNumber: page}, options);

    if (typeof(options.order) !== 'undefined') {
      options.orderProperty = options.order.pro;
      options.orderDirection = options.order.dir;
      delete options.order;
    }

    return this[_dataService].get(aim, 'list', options).then((res) => {
      let paging = new Paging([], page, size, res.total);

      for (let index in res.rows) {
        let source = _this.pack(res.rows[index]);
        paging.data.push(source);
      }
      return paging;
    });
  }

  /**
   * 添加实体, 会通过undo方法处理
   * @param  {cla} entity 添加的对象
   * @return {Promise}       消息承诺
   */
  add(entity) {
    let aim = this.aim,
        params = this.undo(entity);

    return this[_dataService].post(aim, 'add', params).
      then(({success, message}) => {
        return new Message(success, message);
    });
  }


  /**
   * 修改实体属性, 会通过undo方法处理
   * @param  {cla} entity  修改的实体
   * @return {Promise}        消息的承诺
   */
  update(entity) {
    let aim = this.aim,
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
    let aim = this.aim,
        params = {[this[_primaryKey]]: ids[0]};

    // 当参数个数为2时, 以第1个参数为后台参数名, 第二个参数为id的值
    if (ids.length === 2) {
      params = {[ids[0]]: ids[1]};
    }

    return this.dataService.post(aim, 'del', params).
      then(({success, message}) => {
        return new Message(success, message);
    });
  }
}