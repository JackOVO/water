/**
 * 实体工厂基类
 */

import {Options, Paging, Message} from './model';

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
   * 打包树结构的数据
   * @param  {Array}    data      元树结构数组
   * @param  {Function} packFn    解析方法
   * @param  {String}   childKey  子节点的key
   * @return {Array}              树结构数组
   */
  packTree(data, packFn = this.pack, childKey = 'children') {
    let result = [];
    for (let index in data) {
      let item = packFn.call(this, data[index]);
      if (item[childKey].length) {
        item[childKey] = this.packTree(item[childKey], packFn, childKey);
      }
      result.push(item);
    }
    return result;
  }

  /**
   * 打包数组结构的数据
   * mapfn提供二次转换的功能, 为不同形式的指令提供数据
   * 比方说combobox[{k, v}]
   * @param  {Array}  data  元数据数组
   * @param  {Object} mapfn 提供在打包对象后的二次封装({k, v}) => {'k': k, 'v': v}
   * @return {Array}        打包后的数据组
   */
  packArray(array, mapfn) {
    let result = [];
    for (let index in array) {
      let item = this.pack(array[index]);
      if (angular.isFunction(mapfn)) { item = mapfn(item); }
      result.push(item);
    }
    return result;
  }

  /**
   * 二次封装对象, 作为不同形式下数据模型
   * 比方说combobox数据
   * @param  {Array}  array 打包完对象的映射关系
   * @param  {Object} mapfn 以下是combobox指令的打包方法
   * @return {Array}        二次打包后的数据组
   */
  packObject(array,
    mapfn = ({value, name}) => {
      return {'v': value, 'n': name};
    }) {

    let result = this.packArray(array, mapfn);
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
   * 根据对象属性查询
   * @param  {cla}    entity 类对象
   * @param  {String} action 可选其他动作
   * @return {Promise}       后台数据响应承诺
   */
  query(entity, action = 'query', resolve) {
    let _this = this,
        aim = this.aim,
        params = this.undo(entity);

    return this[_dataService].get(aim, action, params).then((res) => {
      let obj = _createResTypeClass(res);

      if (obj instanceof Message) {
        obj.data = _this.pack(obj.data);
      } else if(obj instanceof Array) { // 数组是通过resolve判断解析方式

        if (!angular.isFunction(resolve)) {
          switch(resolve) {
            case 'packTree': return _this.packTree(obj);
            case 'packObject': return _this.packObject(obj);
            default: return _this.packArray(obj);
          }
        } else { return resolve.call(_this, obj); }

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
      paging.data = _this.packArray(res.rows);

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

    return this[_dataService].post(aim, 'upd', params).
      then(({success, message}) => {
        return new Message(success, message);
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

    return this[_dataService].post(aim, 'del', params).
      then(({success, message}) => {
        return new Message(success, message);
    });
  }

  /**
   * 获取组合框下拉数据, 基类封装, 子类实现一下
   * @param  {String} vKey   值对应的key
   * @param  {String} tKey   文本对应的key
   * @param  {Object} params 文本对应的key
   * @return {Array}         Opionts的数据
   */
  getCombobox(vKey, tKey, params = null) {
    return this.query(params, 'combobox', (data) => {
      return this.packObject(data, (item) => {
        return new Options(item[vKey], item[tKey]);
      });
    });
  }
}